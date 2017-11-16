const states = require('./states.json');

const getGeoData = function(city, stateNumber) {
    return new Promise((resolve, reject) => {
        fetch('https://geocode.at/dictionary?city=' + city + "&state=" + stateNumber).then(function(response) {
            return response.json();
        }).then(function(json) {
            resolve(json);
        }).catch(function(ex) {
            reject(json);
        });
    });
};

const getTowns = function({stateName, stateNumber}) {
    stateNumber = stateNumber || getStateNumber(stateName);
    console.log("statenumber", stateNumber);
    return new Promise((resolve, reject) => {
        fetch('https://geocode.at/autocomplete?state=' + stateNumber).then(function(response) {
            return response.json();
        }).then(function(json) {
            resolve(json);
        }).catch(function(ex) {
            reject(json);
        });
    });
};

const getStateNumber = function(stateName) {
    const state = states.filter(state => state.name === stateName)[0];
    if (state) {
        return state.stateNumber;
    }
};



module.exports = {
    getTowns,
    getGeoData,
    getStateNumber
};