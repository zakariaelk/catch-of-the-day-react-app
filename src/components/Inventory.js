import React from 'react';
import PropTypes from "prop-types";
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }

    // Let's add our inventory state with our owner and uid set to null on pageload.

    state = {
        uid: null,
        owner: null
    }


    componentDidMount() {
        // Everytime we try to load the page, firebase will see if we're actually logged in and authenticated and if it's true, it will pass us a user, which itself will be passed to our authHandler which in turn will do all the checks so see if the user is the owner or not and do the rest of its job (inside the function)
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user}) // Here we're using the brackets {user} as our authHandler takes an object parameter which is 'authData'
            }
        })
    }


    // This function will allow us to have a payload of information about the user who signed in.
    // Using that information we need to see if that person owns the store.        

    authHandler = async authData => {
        console.log(authData);

        // We need to pass our storeId from App.js to our Inventory storeId={this.props.match.params.storeid}. You can look up the react component tree and track where the store id comes from.

        // we'll also give it an object {content: this}, that will give it some info on how to fetch it.

        // 1. look up the current store in the firebase DB

        const store = await base.fetch(this.props.storeId, { context: this });

        // 2. Claim it if there's no owner and save that Data to our DB

        if (!store.owner) {
            
            // save it as our own, and here we'll do the opposite of fetching data. We will post data to our Firebase DB

            // Remeber, we always use our base variable as it is the one that connects us to our Firebase DB. 

            // the authData.user.uid object path can be found inside our authData

            // So what happens here is that once we login in, we fetch our storeId data on firebase, and check if there is an owner object, if not we add one using authData.user.uid which is in our authData

            // the post() method first locate the store using the ${ this.props.storeId } and than adds an owner object `/owner` which in turn takes the uid we got from the firebase authData, under the object data: authData.user.uid

            await base.post(`${ this.props.storeId }/owner`, {
                data: authData.user.uid
            });
        }

        // 3. Set the state of the inventory component to reflect the current user

        // Notice that we are setting state outside the App component. This is totally fine, It's actually better to setState inside a component when we know that we will only need that data inside that component (Inventory). So we need to set the state as we did in ou App


        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })


        console.log(store);
    }

    authenticate = (provider) => {
        // const authProvider = new firebase.auth.GithubAuthProvider();
        // const authProvider = new firebase.auth.FacebookAuthProvider();
        // const authProvider = new firebase.auth.TwitterAuthProvider();

        // Instead of having an authprovider variable for each provider, let's do it dynamically with one provider variable changing according what login button the user click on. Let's not forget to add () to call the auth function

        const authProvider = new firebase.auth[`${ provider }AuthProvider`]();

        //let's use our firebaseApp main object (previously used in our base.js), we run the auth() method against it, and attach a handler inside a then(), to define what we're going to do after a use click on sign in with a method.
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }

    logout = async () => {
        console.log("logging out");

        await firebase.auth().signOut();
        this.setState({
            uid: null
        });
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>

        // 1. check if they are logged in (remember here we're check the info that's been set to state, so we're using this.state)

        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />
        }

        // 2. check if they are not the owner of the store

        if (this.state.uid !== this.state.owner) {
            console.log(this.state.uid);
            console.log(this.state.owner);
            return (
                <div>
                    <p>Sorry, Only for Owners</p>
                    {logout}
                </div>
            )


        }
        // 3. They must be the owner, just render the inventory.
        return (
            <div className="inventory">

                <h2>Inventory</h2>

                {logout}

                {Object.keys(this.props.fishes).map(key =>
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />)}

                <AddFishForm addFish={this.props.addFish} />

                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>

            </div>)
    }
}

export default Inventory;