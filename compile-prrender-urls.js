require('isomorphic-fetch');
const fs = require('fs');
//const utils = require('./src/components/utils.js');

const states = [
    { "name": "Burgenland", "stateNumber": 1 },
    { "name": "Kärnten", "stateNumber": 2 },
    { "name": "Niederösterreich", "stateNumber": 3 },
    { "name": "Oberösterreich", "stateNumber": 4 },
    { "name": "Salzburg", "stateNumber": 5 },
    { "name": "Steiermark", "stateNumber": 6 },
    { "name": "Tirol", "stateNumber": 7 },
    { "name": "Vorarlberg", "stateNumber": 8 },
    { "name": "Wien", "stateNumber": 9 }
];

const getStateName = function(stateNumber) {
    const state = states.filter(state => state.stateNumber === stateNumber)[0];
    if (state) {
        return state.name;
    }
};

function urlencode(url) {
    return url.replace(/ /g, "_");
}

const fetches = [];
for(let i = 1; i <= 9; i++) {
    fetches[i-1] = fetch('https://geocode.at/autocomplete?state=' + i).then(function(response) {
        return response.json();
    });
}
Promise.all(fetches).then(function(jsons) {
    jsons.map((j) => console.log(j));


    jsons = jsons.map((j, i) => j.map((a) => ({
        "url": "/game/" + getStateName(i+1)+ "/" + urlencode(a),
        "title": "Wie gut kennst Du Dich in " + a + " aus? - GeoTraining.at"
    })));
    let json = [];
    jsons.map((j) => json = json.concat(j));

    fs.writeFile("out.json", JSON.stringify(json), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

});


