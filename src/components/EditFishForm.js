import React from 'react';
import PropTypes from "prop-types";


class EditFishForm extends React.Component {

    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        updateFish: PropTypes.func,
        index: PropTypes.string
    }

    handleChange = event => {
        console.log(event.currentTarget.value);
        // Now if we try to type in something in the input field, we won't be able to see all our updates.

        // To be able to save our updated fish we first need to take a copy of the current fish, update it with the typed in value and send it to state.

        // 1. Take a copy of the current fish
        // remember here our prop in Inventory is fish (not fishes) 

        // We spread our fish prop, and to dynamically update all the fish properties values (name, price, status etc.), and for that We use the 'ES6 Computed property names' to do it all at once. 

        // Notice in our 'EditFishForm' form we have added a name tag to each input field. That is to allow us to figure out the name of each input field that is being updated. You can try by simply logging (event.currentTarget.name)

        // Now that we know what our input field name tag is used for let's use its dynamic current value inside [] as a 'Computed Property Name'.

        const formUpdatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value,
            // name: event.currentTarget.value // This is would be too repetitive.        
        }

        // Everytime we update our form fields, the above will give us a new value without saving the previous one. For that we need to update our State. To do so we need to create a function that handles that. 

        // ===> let's look at our App component 👀 => specifically our updateFish method


        // Now after having checked our new updateFish() method, let's call it with required params. 

        // This will update our State, and render the new values on any component connected to our State.

        this.props.updateFish(this.props.index, formUpdatedFish);

        // console.log(updatedFish);



        // 3. Submit it to our state

    }

    render() {
        const { name, price, status, desc, image } = this.props.fish;

        return <div className="fish-edit">
            <input type="text" name="name" onChange={this.handleChange} value={name} />
            <input type="text" name="price" onChange={this.handleChange} value={price} />
            <select type="text" name="status" onChange={this.handleChange} value={status}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold Out!</option>
            </select>
            <textarea name="desc" onChange={this.handleChange} value={desc}>{desc}</textarea>
            <input type="text" name="image" onChange={this.handleChange} value={image} />

            <button type="button" name="delete" onClick={() => this.props.deleteFish(this.props.index)}>Delete</button>
        </div>
    }
}

export default EditFishForm;