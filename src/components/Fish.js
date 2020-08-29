import React from 'react';
import { formatPrice } from "../helpers";
import PropTypes from "prop-types";


class Fish extends React.Component {

    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        addToOrder: PropTypes.func
    }

    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }

    render() {

        // let's destructure the details array, and have a variable for each item inside.
        // It's better than creating a single variable for each item
        const { desc, image, name, price, status } = this.props.details;

        // let's make a variable that check if our state value has available or not and returns a boolean 
        const isAvailable = status === 'available';

        return (
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">{name}
                    <span className="price">
                        {formatPrice(price)}
                    </span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>
                    {!isAvailable ? `Sold Out` : 'Add To Cart'}
                </button>
            </li>
        )
    }
}

export default Fish;