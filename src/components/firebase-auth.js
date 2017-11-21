const firebase = require('firebase/app');
const firebaseui = require('firebaseui');
require('firebase/auth');
require("firebase/firestore");

const config = {
    apiKey: "AIzaSyBPDPqc5sdeCsQAeY6UsRSkiy2s5QDZkOQ",
    authDomain: "geo-training-608f8.firebaseapp.com",
    databaseURL: "https://geo-training-608f8.firebaseio.com",
    projectId: "geo-training-608f8",
    storageBucket: "geo-training-608f8.appspot.com",
    messagingSenderId: "4678400504"
};

const app = firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

function persistHighscore(uid, identifier, name, points) {
    return new Promise((resolve) => {
        const ref = db.collection("games").doc(identifier).collection("users").doc(uid);
        ref.get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                if(data.points < points) {
                    ref.set({name, points, tries: data.tries + 1}).then(() => resolve());
                } else {
                    resolve();
                }
            } else {
                ref.set({name, points, tries: 1}).then(() => resolve());
            }
        });
    });
}

function loadHighscore(identifier) {
    return new Promise((resolve) => {
        const ref = db.collection("games").doc(identifier).collection("users")
        const query = ref.where("points", ">", 0).orderBy("points", "desc").limit(50);
        query.get().then(function(querySnapshot) {
            const highscore = [];
            querySnapshot.forEach((doc) => highscore.push(doc.data()));
            resolve(highscore);
        });
    });
}
/*
function loadMostPopularByUser() {
    return new Promise((resolve) => {
        const ref = db.collection("games")
        const query = ref.where("tries", ">=", 0).orderBy("tries").limit(50);
        query.get().then(function(querySnapshot) {
            const highscore = [];
            querySnapshot.forEach((doc) => highscore.push(doc.data()));
            resolve(highscore);
        });
    });
}
*/
// Initialize the FirebaseUI Widget using Firebase.
var authUi = new firebaseui.auth.AuthUI(firebase.auth());


// FirebaseUI config.
const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '/'
};

module.exports = {
    app,
    db,
    firebase,
    uiConfig,
    authUi,
    persistHighscore,
    loadHighscore
};