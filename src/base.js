import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBhOd5U2jh3k7PMl5uXp_VCuPOIsZl_DM0",
    authDomain: "catch-of-the-day-zakariaelk.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-zakariaelk.firebaseio.com"
})



// Firebase makes persisting your data easy to implement. re-base, inspired by Relay, combines the benefits of React and Firebase by allowing each component to specify its own data dependency. Forget about your data persistence and focus on what really matters, your application's state.

const base = Rebase.createClass(firebaseApp.database());


// our fireBaseApp is a named export as it serves us to find our base.
export { firebaseApp };

// our main thing that we're exporting from this file is our base
export default base;