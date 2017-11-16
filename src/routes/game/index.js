import { h, Component } from 'preact';
import Game from '../../components/game/index';
import style from './style';

export default class GamePage extends Component {
	render({ stateName, townName }) {
		return (
			<Game stateName={stateName} townName={townName}></Game>
		);
	}
}
