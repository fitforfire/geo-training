import { h, Component } from 'preact';
import states from '../../data/states.json';
import { Link } from 'preact-router/match';
import style from './style';

export default class States extends Component {
	render() {
		const items = states.map(state => (<li><Link href={"/game/" + state.name}>{state.name}</Link></li>));

		return (
			<div>
				<h1>Bundesland auswählen</h1>
				<ul class={style.list}>
					{items}
				</ul>
			</div>
		);
	}
}
