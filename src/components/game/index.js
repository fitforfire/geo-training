import { h, Component } from 'preact';

import style from './style';
import common from '../common';
import GameLogic from '../game';
import {getStateNumber} from '../../data/geocoder';
import Sharing from '../../components/sharing/index';
import Instructions from '../instructions/index';
import Highscore from '../../components/highscore/index';
import {getQueryParam, urldecode} from '../utils';
require('leaflet/dist/leaflet.css');
import {getUser, loadHighscore} from '../firebase-auth';

const tileLayers = {
    standard: 'https://feuerwehreinsatz.info/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png',
    satelite: 'https://feuerwehreinsatz.info/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg'
};

function getCenterOfAllMarker(allMarker) {
    const pointLayer = new L.FeatureGroup();
    Object.keys(allMarker).map(name => {
        Object.keys(allMarker[name]).map(nr => {
            const latLng = allMarker[name][nr];
            L.marker([latLng[1], latLng[0]]).addTo(pointLayer);
        });
    });
    return pointLayer.getBounds().getCenter();
};


export default class Game extends Component {
    constructor({stateName, townName, gameName}) {
        super();
        townName = urldecode(townName);
        this.state.finished = false;
        const stateNumber = getStateNumber(stateName);
        this.game = new GameLogic({cityName: townName, stateNumber, gameName, onTimer: (points) => this.timer(points), onFinish: () => this.finish(), onTimeout: (challange) => this.timeout(challange)});
        this.lat = getQueryParam('lat');
        this.lng = getQueryParam('lng');
        this.z = getQueryParam('z') || 14;
    }
	componentDidMount() {
        const Map = require('leaflet').Map;
        const L = require('leaflet');
        const TileLayer = require('leaflet').TileLayer;

        this.map = new Map('map');

        const tiles = new TileLayer(tileLayers.satelite, {
        	HTTPS: true,
            attribution: 'Datenquelle: <a href="//www.basemap.at">basemap.at</a>',
            subdomains: ['', '1', '2', '3', '4'],
            bounds: [[46.358770, 8.782379], [49.037872, 17.189532]]
        }).addTo(this.map);

        this.tilesLoaded = new Promise((resolve) => {
            tiles.on("load", () => resolve());
        });

        this.game.createRandomChallanges().then(() => {
            const centerOfAll = getCenterOfAllMarker(this.game.getAllMarker());
            if (this.lat && this.lng) {
                this.map.setView([this.lat, this.lng], this.z);
            } else {
                this.map.setView(centerOfAll, this.z);
            }
            this.tilesLoaded.then(() => {
                setTimeout(() => {
                    this.setState({challange: this.game.startAndGetChallange()});
                }, 1000);
            });
        });

        this.map.on('click', (e) => {
            if (this.state.state !== undefined) {
                return;
            }
            const location= e.latlng;
            const selected = this.game.findNearest(location)[0];
            const success = this.game.resolveChallange(location);
            this.setState({state: success});
            const marker = this.game.getMarkerOfChallange(selected);
            this.showChallangeMarker({latLng: location, caption: selected, marker, success, timeout: 3000}).then(() => {
                if (!success) {
                    this.setState({state: undefined});
                }
            });
        });
	}
	timer(points) {
        this.setState({countdown: points});
    }
    timeout(challange) {
        const success = false;
        const marker = this.game.getMarkerOfChallange(challange);
        this.showChallangeMarker({caption: challange, marker, success, zoomTo: true});
    }
    finish() {
        if (this.game.isFinished()) {
            this.setState({finished: true, points: this.game.getTotalPoints()});
            getUser((user) => {
                if (user) {
                    this.game.persistHighscore(user.uid, user.displayName);
                } else {
                    this.game.persistAnonymousHighscore();
                }
                loadHighscore(this.game.getIdentifier()).then(highscore => this.setState({highscore}));
            });
        }
    }
    restart() {
        window.location.reload();
    }
	showChallangeMarker({latLng, caption, marker, success, timeout, zoomTo}) {
        return new Promise(resolve => {
            this.removeChallangeMarker();
            this.pointLayer = new L.FeatureGroup().addTo(this.map);
            this.captionLayer = new L.FeatureGroup().addTo(this.map);
            Object.keys(marker).map(key => {
                const pointIcon = L.divIcon({className: (success ? style.successMarker : style.failMarker), html: "<div></div>"});
                L.marker([marker[key][1], marker[key][0]], {icon: pointIcon}).addTo(this.pointLayer);
            });
            if (!latLng) {
                latLng = this.pointLayer.getBounds().getCenter();
            }
            const captionMarker = L.divIcon({className: style.captionMarker, html: "<div>" + caption + "</div>"})
            L.marker(latLng, {icon: captionMarker, zIndexOffset: 1000}).addTo(this.captionLayer);
            if (zoomTo) {
                //this.map.fitBounds(this.pointLayer.getBounds());
                this.map.panTo(latLng, {duration: 1});
            }
            !success && timeout && window.setTimeout(() => {
                this.removeChallangeMarker();
                resolve();
            }, timeout);
        });
    }
    removeChallangeMarker() {
        this.pointLayer && this.pointLayer.clearLayers();
        this.captionLayer && this.captionLayer.clearLayers();
    }
    skip() {
        this.game.abortChallange();
    }
    next() {
        this.removeChallangeMarker();
        this.setState({state: undefined, challange: this.game.startAndGetChallange()});
    }
	componentWillUnmount() {
	    this.map.remove();
    }
	render({stateName, townName}, {countdown, captionSelected, selected, challange, state, finished, points, highscore}) {
        let output;
        if(finished) {
            output = (<div class={style.finished}>
                <h1>Spiel beendet!</h1>
                <h3>Sie haben {points} Punkte</h3>
                <a class={common.button} onClick={this.restart}>Neues Spiel starten</a>
                {highscore ? <Highscore entries={highscore} /> : ''}
                <Sharing url={'/game/' + stateName + '/' + townName} name={urldecode(townName)} />
            </div>);
        } else {
		output = (
		    <div class={style.game}>
                <div class={style.map} id="map"></div>
                <div class={style.instructions}>
                    <Instructions onSkip={() => this.skip()} onNext={() => this.next()} captionChallange="Finde" countdown={countdown} state={state} captionSelected={captionSelected} selected={selected} challange={challange} />
                </div>
            </div>
                );
        }
        return output;
	}
}
