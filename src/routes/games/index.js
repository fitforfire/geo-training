import { h, Component } from 'preact';
import {urldecode} from '../../components/utils';
import Games from '../../components/games/index';
import style from './style';

export default class GamesPage extends Component {
    render({ stateName, townName }) {
        townName = urldecode(townName);
        return (
			<div class={style.games}>
				<Games stateName={stateName} townName={townName}></Games>
			</div>
        );
    }
}

