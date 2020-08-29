import React from 'react';
import PropTypes from "prop-types";

const Header = ({ tagline, age }) => (
    <header className="top">
        <h1>
            Catch
            <span className="ofThe">
                <span className="of">of</span>
                <span className="the">The</span>
            </span>
                    Day
                </h1>
        <h3 className="tagline">
            <span>{tagline} {age}</span>
        </h3>
    </header>
)


Header.propTypes = {
    tagline: PropTypes.string.isRequired
}

export default Header;



/* class Header extends React.Component {
    render() {
        return (
            <header className="top">
                <h1>
                    Catch
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">The</span>
                    </span>
                    Day
                </h1>
                <h3 className="tagline">
                    <span>{this.props.tagline}</span>
                </h3>
            </header>
        )
    }
}
 */

/* Since this is a component that has one method - render(), we can make it a Stateless functional component */

// Since this is a function we cannot have the "this" keyword to call the prop. Instead we set a 'props' as a parameter to the function.

/* function Header(props) {
    return (
        <header className="top">
            <h1>
                Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">The</span>
                </span>
                    Day
                </h1>
            <h3 className="tagline">
                <span>{props.tagline}</span>
            </h3>
        </header>
    )
} */


// Now the ES6 way, with an arrow function and an implicit return

/* const Header = (props) => (
    <header className="top">
        <h1>
            Catch
            <span className="ofThe">
                <span className="of">of</span>
                <span className="the">The</span>
            </span>
                    Day
                </h1>
        <h3 className="tagline">
            <span>{props.tagline}</span>
        </h3>
    </header>
)
 */

// Even further, since 'props' is an object containing all our props we can destructure it according to the number of props we have inside.