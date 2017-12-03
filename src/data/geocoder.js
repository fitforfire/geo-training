const states = require('./states.json')

const gameUrl = {
    street: 'https://geocode.at/dictionary',
    manor: 'https://geocode.at/hofname/dictionary'
};

const getGeoData = function(city, stateNumber, gameName) {
    return new Promise((resolve, reject) => {
        fetch(gameUrl[gameName] + '?city=' + city + "&state=" + stateNumber).then(function(response) {
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

const getStateName = function(stateNumber) {
    const state = states.filter(state => state.stateNumber === stateNumber)[0];
    if (state) {
        return state.stateNumber;
    }
};



module.exports = {
    getTowns,
    getGeoData,
    getStateNumber
};