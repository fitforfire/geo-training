import { h, Component } from 'preact';
import {urldecode} from '../../components/utils';
import Game from '../../components/game/index';
import Highscore from '../../components/highscore/index';
import {loadHighscore, getHighscoreIdentifiert} from '../../components/firebase-auth';
import {getStateNumber} from '../../data/geocoder';
import style from './style';
import common from '../../components/common';

const games = {
	street: 'Straßen/Orte',
	manor: 'Hofnamen'
};

export default class GamePage extends Component {
	constructor({stateName, townName, gameName}) {
        townName = urldecode(townName);
		super();
        const stateNumber = getStateNumber(stateName);
        loadHighscore(getHighscoreIdentifiert(stateNumber, townName, gameName)).then(highscore => this.setState({highscore}));
	}
	start = () => {
		this.setState({start: true});
	}
	render({ stateName, townName, gameName}, {start, highscore}) {
        townName = urldecode(townName);
		let content;
		if (start) {
			content = (<Game stateName={stateName} townName={townName} gameName={gameName}></Game>);
        } else {
			content = (
				<div class={style.introduction}>
					<h1>{games[gameName]}</h1>
					<h2>{townName}</h2>
					<button class={common.button} onClick={this.start}>Spiel starten</button>
					<Highscore entries={highscore} />
				</div>
			);
		}
		return content;
	}
}
