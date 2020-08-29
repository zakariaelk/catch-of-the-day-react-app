//Some people only import the component module
/* import { Component } from 'react';
class StorePicker extends Component {} */

// Let's import the React package. We're not using {}, meaning that we're importing the whole package.
import React from 'react';

// Importing the React Dom package. The render method is part of the react-dom package that contains other methods.
import { render } from 'react-dom';
import Route from './components/Router'
import './css/style.css';

render(<Route />, document.querySelector('#main'));


// Now let's create more components each in its own file.