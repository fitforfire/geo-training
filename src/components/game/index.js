import { h, Component } from 'preact';
import style from './style';
import GameLogic from '../game';
import {getStateNumber} from '../../data/geocoder';
import Instructions from '../instructions/index';
import {getQueryParam} from '../utils';

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
    constructor({stateName, townName}) {
        super();
        this.state.finished = false;
        const stateNumber = getStateNumber(stateName);
        this.game = new GameLogic({cityName: townName, stateNumber, onTimer: (points) => this.timer(points), onFinish: () => this.finish(), onTimeout: (challange) => this.timeout(challange)});
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

        this.game.createRandomChallanges().then(() => {
            const centerOfAll = getCenterOfAllMarker(this.game.getAllMarker());
            if (this.lat && this.lng) {
                this.map.setView([this.lat, this.lng], this.z);
            } else {
                this.map.setView(centerOfAll, this.z);
            }
            this.setState({challange: this.game.startAndGetChallange()});
        });

        this.map.on('click', (e) => {
            if (this.state.state !== undefined) {
                return;
            }
            const location= e.latlng;
            const selected = this.game.findNearest(location)[0];
            const success = this.game.resolveChallange(location);
            this.setState({state: success, selected: selected, captionSelected: 'Ausgewählt:'});
            const marker = this.game.getMarkerOfChallange(selected);
            this.showChallangeMarker({latLng: location, caption: selected, marker, success, timeout: 3000}).then(() => {
                this.setState({captionSelected: undefined, selected: undefined, state: undefined});
                if (success) {
                    this.setState({challange: this.game.startAndGetChallange()});
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
        this.showChallangeMarker({caption: challange, marker, success, timeout: 5000, zoomTo: true}).then(() => {
            this.setState({challange: this.game.startAndGetChallange()});
        });
    }
    finish() {
        if (this.game.isFinished()) {
            this.setState({finished: true, points: this.game.getTotalPoints()});
        }
    }
    restart() {
        window.location.reload();
    }
	showChallangeMarker({latLng, caption, marker, success, timeout, zoomTo}) {
        return new Promise(resolve => {
            const pointLayer = new L.FeatureGroup().addTo(this.map);
            const captionLayer = new L.FeatureGroup().addTo(this.map);
            Object.keys(marker).map(key => {
                const pointIcon = L.divIcon({className: (success ? style.successMarker : style.failMarker), html: "<div></div>"});
                L.marker([marker[key][1], marker[key][0]], {icon: pointIcon}).addTo(pointLayer);
            });
            if (!latLng) {
                latLng = pointLayer.getBounds().getCenter();
            }
            const captionMarker = L.divIcon({className: style.captionMarker, html: "<div>" + caption + "</div>"})
            L.marker(latLng, {icon: captionMarker, zIndexOffset: 1000}).addTo(captionLayer);
            if (zoomTo) {
                //this.map.fitBounds(pointLayer.getBounds());
                this.map.panTo(latLng, {duration: 1});
            }
            window.setTimeout(() => {
                pointLayer.clearLayers();
                captionLayer.clearLayers();
                resolve();
            }, timeout);
        });
    }
	componentWillUnmount() {
	    this.map.remove();
    }
	render(_, {countdown, captionSelected, selected, challange, state, finished, points}) {
        let output;
        if(finished) {
            output = (<div class={style.finished}>
                <h1>Spiel beendet!</h1>
                <h3>Sie haben {points} Punkte</h3>
                <a onClick={this.restart}>Neues Spiel starten</a>
            </div>);
        } else {
		output = (
		    <div class={style.game}>
                <div class={style.map} id="map"></div>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ==" crossorigin=""/>
                <div class={style.instructions}>
                    <Instructions captionChallange="Finde" countdown={countdown} state={state} captionSelected={captionSelected} selected={selected} challange={challange} />
                </div>
            </div>
                );
        }
        return output;
	}
}
