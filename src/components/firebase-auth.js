const api = {};

if (typeof window !== "undefined") {
    const firebase = require('firebase/app');
    const firebaseui = require('firebaseui');
    require('firebase/auth');
    require("firebase/firestore");

    const highscoreLength = 25;

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

    api.persistHighscore = (uid, identifier, name, points) => {
        return new Promise((resolve) => {
            const ref = db.collection("games").doc(identifier).collection("users").doc(uid);
            ref.get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    if (data.points < points) {
                        ref.set({name, points, tries: data.tries + 1}).then(() => resolve());
                    } else {
                        resolve();
                    }
                } else {
                    ref.set({name, points, tries: 1}).then(() => resolve());
                }
            });
        });
    };

    api.persistAnonymousHighscore = (identifier, points) => {
        return new Promise((resolve) => {
            const timestamp = Date.now();
            const ref = db.collection("games").doc(identifier).collection("anonymous").doc(timestamp.toString());
            ref.set({points, timestamp}).then(() => resolve());
        });
    };

    api.getHighscoreIdentifiert = (stateNumber, townName, gameName) => {
        let postfix = "";
        if (gameName !== 'street') {
            postfix = "-" + gameName;
        }
        return stateNumber + "-" + townName + postfix;
    };

    api.loadHighscore = (identifier) => {
        return new Promise((resolve) => {
            const userRef = db.collection("games").doc(identifier).collection("users");
            const userQuery = userRef.where("points", ">", 0).orderBy("points", "desc").limit(highscoreLength);
            const anonymousRef = db.collection("games").doc(identifier).collection("anonymous");
            const anonymousQuery = anonymousRef.where("points", ">", 0).orderBy("points", "desc").limit(highscoreLength);
            Promise.all([userQuery.get(), anonymousQuery.get()]).then(function ([userSnapshot, anonymousSnapshot]) {
                const highscore = [];
                userSnapshot.forEach((doc) => highscore.push(doc.data()));
                anonymousSnapshot.forEach((doc) => {
                    if (highscore.length < highscoreLength) {
                        const data = doc.data();
                        data.name = "Nicht angemeldet";
                        highscore.push(data)
                    }
                });

                highscore.sort(function (a, b) {
                    return b.points - a.points;
                });
                resolve(highscore);
            });
        });
    };

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

    api.startAuthUi = (selector) => {
        authUi.start(selector, uiConfig);
    };

    api.getUser = (callback) => {
        return firebase.auth().onAuthStateChanged(callback);
    };

    api.signOut = () => {
        return firebase.auth().signOut();
    };

    api.updateUser = ({displayName}) => {
        var user = firebase.auth().currentUser;

        return user.updateProfile({
            displayName
        });
    };
} else {
    api.getUser = (callback) => {
        callback("user");
    };
    api.updateUser = () => {};
    api.signOut = () => {};
    api.getHighscoreIdentifiert = () => {};
    api.persistHighscore = () => {};
    api.persistAnonymousHighscore = () => {};
    api.loadHighscore = () => {};
    api.startAuthUi = () => {};
}

module.exports = api;