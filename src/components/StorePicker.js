import React from 'react';
import { getFunName } from '../helpers';
import PropTypes from "prop-types";

/*

- Every class has a method which we call render().
- render() determines what html and dom element will be put on the page
- Let's set our render() method, and have it return some HTML
- Now we need to Mount our Application.
- When using react, we don't interact with DOM elements directly, like when using plain JavaScript.The only exception is when we mount our Application.
- Finally we need to render our app by calling the render method, which takes 2 arguments (component, mounting point).
*/


// Without JSX

/* 
class StorePicker extends React.Component {
    render() {
        // return React.createElement('p', { className: 'hey' }, 'Hey Magic!');
    }
} */


// With JSX

class StorePicker extends React.Component {

    static propTypes = {
        history: PropTypes.object
    }

    // Let's create a react reference for our input field
    myInput = React.createRef();


    /* BINDING METHODS TO CURRENT COMPONENT */


    /* 
        Method 1 -> Binding methods with constructors - A bit of a long way.... 
    */

    // let's create a constructor to bind the StorePicker component 'this' to our custom methods (ex: goToStore)


    /*     constructor() {
            // we need to run this super method first to make sure our React component is loaded first.
            super();
    
            // Let's bind our instance component StorePicker 'this' to the goToStore method.
            this.goToStore = this.goToStoreOld.bind(this);
    
            // The above binding solution is okay to work with, however it is not optimal when dealing with several methods  
    
        }
    
        goToStoreOld(e) {
            e.preventDefault();
            console.log(this);
        }
     */



    /* 
    
        Method 2 -> Binding methods using properties, or methods declared as function expressions - The short form

        👉 ..And we don't need to create a constructor
        
    */

    goToStore = (e) => {
        e.preventDefault();
        const storeName = this.myInput.current.value;
        this.props.history.push(`/store/${ storeName }`);
    }


    render() {
        return (
            <>
                <form action="" className="store-selector" onSubmit={this.goToStore}>
                    {/* This is a comment */}
                    <h2 className="title">Please Enter a Store</h2>
                    <input
                        type="text"
                        name="storeName"
                        ref={this.myInput}
                        required
                        placeholder="Store Name"
                        defaultValue={getFunName()}
                    />
                    <button type="submit"> Visit Store → </button>
                </form>
            </>
        )
    }
}

export default StorePicker;



// 03 HTML with JSX