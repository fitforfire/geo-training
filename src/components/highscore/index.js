import { h, Component } from 'preact';
import style from './style';

export default class Highscore extends Component {
	render({entries}) {
		const items = entries.map(entry => (<li><span class={style.name}>{entry.name}</span><span class={style.points}>{entry.points}</span></li>));

		return (
			<div>
				<h1>Bestenliste</h1>
				<ul class={style.list}>
					{items}
				</ul>
			</div>
		);
	}
}
