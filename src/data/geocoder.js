const states = require('./states.json')
const districtsVienna = require('./districts_vienna.json');

const gameUrl = {
    street: 'https://geocode.at/dictionary',
    manor: 'https://geocode.at/hofname/dictionary'
};

const isVienna = function(stateNumber) {
    return stateNumber === 9;
}

const getGeoData = function(city, stateNumber, gameName) {
    let url = gameUrl[gameName] + "?state=" + stateNumber;
    if (isVienna(stateNumber)) {
        const zip = districtsVienna.find(d => d.name === city).zip;
        url += "&zip=" + zip;
        url += "&city=" + "Wien";
    } else {
        url += "&city=" + city;
    }
    return new Promise((resolve, reject) => {
        fetch(url).then(function(response) {
            return response.json();
        }).then(function(json) {
            if(isVienna(stateNumber)) {
                resolve({[city]: json['Wien']});
            } else {
                resolve(json);
            }
        }).catch(function(ex) {
            reject(json);
        });
    });
};

const getTowns = function({stateName, stateNumber}) {
    stateNumber = parseInt(stateNumber || getStateNumber(stateName));
    if (isVienna(stateNumber)) {
        return Promise.resolve(districtsVienna.map(d => d.name));
    }
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
