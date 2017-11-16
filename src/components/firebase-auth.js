const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


const config = {
    apiKey: "AIzaSyBPDPqc5sdeCsQAeY6UsRSkiy2s5QDZkOQ",
    authDomain: "geo-training-608f8.firebaseapp.com",
    databaseURL: "https://geo-training-608f8.firebaseio.com",
    projectId: "geo-training-608f8",
    storageBucket: "geo-training-608f8.appspot.com",
    messagingSenderId: "4678400504"
};

const app = firebase.initializeApp(config);

// FirebaseUI config.
const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
};

module.exports = {
    app,
    firebase,
    uiConfig
};