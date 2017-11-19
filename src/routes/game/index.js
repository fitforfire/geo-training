import { h, Component } from 'preact';
import Game from '../../components/game/index';
import Highscore from '../../components/highscore/index';
import {loadHighscore} from '../../components/firebase-auth';
import {getStateNumber} from '../../data/geocoder';
import style from './style';

export default class GamePage extends Component {
	constructor({stateName, townName}) {
		super();
        const stateNumber = getStateNumber(stateName);
        loadHighscore(stateNumber + "-" + townName).then(highscore => this.setState({highscore}));
	}
	start() {
		this.setState({start: true});
	}
	render({ stateName, townName}, {start, highscore}) {

		let content;
		if (start) {
			content = (<Game stateName={stateName} townName={townName}></Game>);
        } else {
			content = (
				<div class={style.introduction}>
					<h1>Straßen/Orte</h1>
					<h2>{townName}</h2>
					<button onClick={this.start}>Spiel starten</button>
					<Highscore entries={highscore} />
				</div>
			);
		}
		return content;
	}
}
