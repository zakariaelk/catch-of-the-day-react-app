import React from 'react';
import PropTypes from "prop-types";
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

    static propType = {
        match: PropTypes.object // match is an object inside the Router component
    }

    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {

        const { params } = this.props.match;

        // first reinstate our localstorage
        const localStorageRef = localStorage.getItem(params.storeid);

        // check if we actually have a store in there, and reinstate our order inside our state. We're using JSON.parse() to turn our string back to an object.
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        // this.ref is different than the input refs we use to capture data 'React.createRef();'
        // the below ref is the Firebase way to reference to a piece of data in our database.
        // we're syncing the Firebase ref with our storeid variable. We're also adding /fishes as we want to focus on the fishes object for now.

        this.ref = base.syncState(`${ params.storeid }/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    // Now when we mount our component, we listening to updates hapening to our synced state. This is stored in our ref above. When leaving our APP we need to unlisten and remove our ref, to free up the memory.



    // Localstorage allows us to store termporary data inside a pair of key and value. This information is available until client removes browser history, data, cookies etc.

    // Since we are dealing with guest orders, we don't need to save this information on a database. The best solution should be a temporary one, that is available to the user while they're partially still on the web app( after a refresh or closing the app browser tab)

    // First of all we need to listen to changes occuring on our app component, and more specifically our order object. for that we use componentDidUpdate() 

    // Inside we call our localStorage API, with the setItem method that will take 2 params. The store being used available through this.props, and the order object available through this.state

    // We're using JSON.stringify() to turn our object into a string.

    componentDidUpdate() {

        // console.log(this.state.order);

        localStorage.setItem(this.props.match.params.storeid, JSON.stringify(this.state.order));

        // console.log(`it's updated!`);
    }

    // Now localStorage should work, however when refreshing, our componentDidMount() will reinstate the componentDidUpdate() method which will result in loosing the data inside our localstorage. The solution is to get the data inside our localstorage before we do anything inside our componentDidMount() and we can do it using the localStorage.getItem(itemID)

    // So far the code above is good to go, however the App will still look up the inventory before loading fish data from Firebase and order data from localStorage, and for a split second, that will result in displaying "Sorry fish is no longer available" in our order list.

    // To avoid this, we can use a simple if(!fish) return null in our Order component. This will stop the execution until we get our fish data from firebase and load our order data from the localstorage.

    // Now we can try accessing another store and adding item to order, and if we go back to our first store we will still be able to see the order info, as we have them both saved on our localStorage.

    // here's how we do it
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }


    // Add Fish Method

    addFish = fish => {

        // 1. First take a copy of the existing state
        const fishes = { ...this.state.fishes };

        // 2. Add our new fish to those fishes. Using a timestamp we can set a unique ID to fish object, submitted from (in the reverse way) AddFishForm > Inventory > App

        fishes[`fish${ Date.now() }`] = fish;

        //3. Set the new fishes object to the fishes object we have in state.

        this.setState({
            fishes: fishes,  //the first fishes is our state object, and the 2nd is the new fishes object the user just added (which is 1 + 2)

            // As of ES6, this syntaxt can be simplified to
            // fishes,
        })
    }

    // Load Sample Fishes Method

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes,
        })
    }

    // Creating a function to update our fishes in state. 

    // For this function We'll need a key to define the fish in question. This key will need to be added in our Inventory component inside our EditFishForm as a second key attribute. Remember that when dealing with iterators (i.e <EditFishForm />) that already have a key attribute and we needing to use that key inside our <EditFishForm /> we need to create an additional key attribute. Here, we'll call it index={key}

    // We'll also need the updatedFish object wich we'll have ready in our EditFishForm

    updateFish = (key, updatedFish) => {
        // 1. take a copy of State
        const fishes = { ...this.state.fishes };

        // 2. update the fish in question
        fishes[key] = updatedFish;

        // 3. setState with the new fishes value
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        const fishes = { ...this.state.fishes };

        fishes[key] = null;


        this.setState({ fishes: fishes });
    }

    // Add To Order Function
    // To be able to use this method, we need to think where it will live => inside the Fish component. So we need to reference it as a propo down in the render() method.

    addToOrder = (key) => {

        // 1. Take a copy of state (Here we're more concerned about the order object inside our state)
        const order = { ...this.state.order };

        // 2. We need to either add to the order, or update the number in our order. Let's use the key value that we have inside of either fish item

        order[key] = order[key] + 1 || 1;


        // 3. Set state to update our state object.
        this.setState({
            order: order,
        })

    }


    removeFromOrder = (key) => {
        const order = { ...this.state.order };

        if (order[key] > 1) {
            order[key] = order[key] - 1
        } else {
            delete order[key];
        }

        this.setState({
            order
        })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh SeaFood Market" age={999} />

                    <ul className="Fishes">
                        {Object.keys(this.state.fishes)
                            .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
                    </ul>

                </div >
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
                <Inventory addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} storeId={this.props.match.params.storeid} />

            </div >
        )
    }
}

export default App;