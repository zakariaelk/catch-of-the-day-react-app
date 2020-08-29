import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    }

    handleRemove = (event) => {
        const removedFish = event.currentTarget.dataset.key;
        this.props.removeFromOrder(removedFish);
    }

    renderOrder = (key) => {

        // here we need variables to get fish and order information from our state         
        // we need to get the fishes and order
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // let's check if our fish is available
        const isAvailable = fish && fish.status === 'available';

        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 }
        };


        // stop execution if NO fish - To prevent displaying 'Sorry fish is no longer available' before loading Firebase fish data and localStorage order data.

        if (!fish) return null;

        if (!isAvailable) {

            return (
                // react requires each child in an array or iterator to have a unique "key" prop. let's add it to our <li>

                // <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 25 }}>

                // After setting the attributes in a variable 

                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry {fish ? fish.name : 'fish'} is no longer available
    </li>
                </CSSTransition>
            )

        }

        // REMEMBER!! to wrap your return in parentheses and finish with a         
        return (

            // react requires each child in an array or iterator to have a unique "key" prop. let's add it to our <li>

            //CSSTransition takes classNames, a key and a timeout that sets the speed of how fast these items will come in and go out. 
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>

            lbs {fish.name}
                    </span>
    &nbsp;
        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                    {formatPrice(count * fish.price)}
                </li>
            </CSSTransition>
        );
    };


    render() {

        // We first get our orderIds
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            // we need to get the fishes
            const fish = this.props.fishes[key]; // using the key to dynamically call each fish
            // we need to get the order count for same fish
            const count = this.props.order[key];

            // we need to check if the fish is available or has been removed
            const isAvailable = fish && fish.status === 'available';

            // if available, we need to add up the prevtotal + (count * fish.price)
            // Remeber that we're doing all this inside a reduce() so we need to return something.
            if (isAvailable) {
                return prevTotal + (count * fish.price);
            } else {
                return prevTotal // if not simply return prevtotal
            }

            // the reduce method has to have a starting value, for us that is 0.            
        }, 0)


        // since we have a lot of code going on in this component, and it it is not the reusable type (meaning that we don't need to separate it components). The solution is to create custom render functions that will make our callbacks for map() filter() etc. look cleaner. Let's create a custom render function to display the looped over order.

        return (
            <div className="order-wrap">
                <h2 className="order">Order</h2>
                <TransitionGroup component="ul" className="order">
                    {/* {orderIds.map(key => <li>{key}</li> )} */}
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>

                <div className="total">
                    <strong>
                        Total:
                        {formatPrice(total)}
                    </strong>
                </div>
            </div>
        )
    }
}

export default Order;