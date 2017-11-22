import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import {getTowns} from '../../data/geocoder';
import {urlencode} from '../../components/utils';
import style from './style';

export default class Games extends Component {
	render({stateName, townName}) {
		return (
			<div>
				<h1>
					<span>Spiel auswählen</span>
				</h1>
				<ul class={style.list}>
					<li><Link href={"/game/" + stateName + "/" + urlencode(townName) + "/street"}>Orte und Straßen</Link></li>
					<li><Link href={"/game/" + stateName + "/" + urlencode(townName) + "/manor"}>Hofnamen</Link></li>
				</ul>
			</div>
		);
	}
}
