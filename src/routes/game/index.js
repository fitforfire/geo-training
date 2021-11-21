import { h, Component } from 'preact';
import {urldecode} from '../../components/utils';
import Game from '../../components/game/index';
import Highscore from '../../components/highscore/index';
import Sharing from '../../components/sharing/index';
import {loadHighscore, getHighscoreIdentifiert} from '../../components/firebase-auth';
import {getStateNumber} from '../../data/geocoder';
import style from './style';
import common from '../../components/common';
import Breadcrumb from '../../components/breadcrumb/index';

const games = {
	street: 'Straßen und Orte',
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
        const breadcrumb = [{
            link: '/',
            caption: 'Home'
        }, {
            link: '/game/' + stateName,
            caption: stateName
        }, {
            link: '/game/' + stateName + '/' + townName,
            caption: urldecode(townName)
        }, {
            link: '/game/' + stateName + '/' + townName + "/" + gameName,
            caption: games[gameName]
        }];
        const sharingUrl = '/game/' + stateName + '/' + townName;
        townName = urldecode(townName);
		let content;
		if (start) {
			content = (<Game stateName={stateName} townName={townName} gameName={gameName}></Game>);
        } else {
			content = (
				<div class={style.introduction}>
					<Breadcrumb entries={breadcrumb} />
					<h1>{games[gameName]}</h1>
					<h2>{townName}</h2>
					<img src="/assets/header.png" style="max-width: 100%; height: auto;"/>
					<p>
						Wie gut kennst sie sich in {townName} aus?<br/>
						Testen sie ihr Wissen mit dem {games[gameName]} Suchspiel.
					</p>
					<button class={common.button} onClick={this.start}>Spiel starten</button>
					<Highscore entries={highscore} />
					<Sharing url={sharingUrl} name={townName} />
				</div>
			);
		}
		return content;
	}
}
