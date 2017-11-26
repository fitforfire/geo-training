const {shuffle, urldecode} = require('./utils');
const {getGeoData} = require('../data/geocoder');
const {persistHighscore, persistAnonymousHighscore, getHighscoreIdentifiert} = require('./firebase-auth');

export default class Game {
    constructor({cityName, stateNumber, gameName, onTimeout, onFinish, onTimer}) {
        cityName = urldecode(cityName);
        this.onTimeout = onTimeout || function(){};
        this.onTimer = onTimer || function(){};
        this.onFinish = onFinish || function(){};
        this.cityName = cityName;
        this.points = [];
        this.actualChallangeIndex = -1;
        this.identifier = getHighscoreIdentifiert(stateNumber, cityName, gameName);
        this.dataLoaded = new Promise((resolve) => {
            getGeoData(cityName, stateNumber, gameName).then(data => {
                this.city = data[cityName];
                resolve();
            });
        });
    }

    getIdentifier() {
        return this.identifier;
    }

    createRandomChallanges() {
        return this.dataLoaded.then(() => {
            this.challanges = shuffle(Object.keys(this.city)).slice(0,5);
        });
    }

    getMarkerOfChallange(challange) {
        return this.city[challange];
    }

    getAllMarker() {
        return this.city;
    }

    getChallanges() {
        return this.challanges;
    }

    __getChallange() {
        return this.challanges[this.actualChallangeIndex];
    }

    startAndGetChallange() {
        this.actualChallangeIndex++;
        if (this.isFinished()) {
            this.onFinish();
        } else {
            this.points[this.actualChallangeIndex] = 100;
            this.startTimer();
            return this.__getChallange();
        }
    }

    abortChallange() {
        this.stopTimer();
        this.points[this.actualChallangeIndex] = 0;
        this.onTimer(0);
        this.onTimeout(this.__getChallange());
        if (this.isFinished()) {
            this.onFinish();
        }
    }

    getRemainingPoints() {
        return this.points[this.actualChallangeIndex];
    }

    isFinished() {
        return this.challanges.length <= this.actualChallangeIndex;
    }

    getTotalPoints() {
        let total = 0;
        for (let i = 0; i < this.points.length; i++) {
            total += this.points[i];
        }
        return total;
    }


    resolveChallange(latLng) {
        const nearest = this.findNearest(latLng)[0];
        const challange =  this.__getChallange();
        if (nearest === challange) {
            this.stopTimer();
            return true;
        } else {
            this.points[this.actualChallangeIndex] -= 25;
            return false;
        }
    }

    startTimer() {
        this.stopTimer();
        this.timer = setInterval(() => {
            this.points[this.actualChallangeIndex]--;
            if (this.points[this.actualChallangeIndex] <= 0) {
                this.abortChallange();
            }
            this.onTimer(this.points[this.actualChallangeIndex]);
        }, 1000);
        this.onTimer(this.points[this.actualChallangeIndex]);
    }

    stopTimer() {
        if(this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
    }

    findNearest({lat, lng}) {
        const distances = {};
        Object.keys(this.city).map(name => {
            Object.keys(this.city[name]).map(nr => {
                const point = this.city[name][nr];
                const x = point[1] - lat;
                const y = point[0] - lng;
                const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
                if (distances[name] === undefined || distances[name] > distance) {
                    distances[name] = distance;
                }
            });
        });
        const sorted = Object.keys(distances).sort(function(a,b){return distances[a]-distances[b]});
        return sorted;
    }

    persistHighscore(uid, name) {
        return persistHighscore(uid, this.identifier, name, this.getTotalPoints());
    }

    persistAnonymousHighscore() {
        return persistAnonymousHighscore(this.identifier, this.getTotalPoints());
    }


}
