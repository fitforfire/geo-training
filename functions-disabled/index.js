const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const app = require('express')();

app.get('/express', (req, res) => {
    res.set('Cache-Control', 'public, max-age=60, s-maxage=180');
    res.send("works!");
});

exports.app = functions.https.onRequest(app);