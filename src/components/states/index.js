import { h, Component } from 'preact';
import states from '../../data/states.json';
import { Link } from 'preact-router/match';
import style from './style';

export default class States extends Component {
	render(_, {filter}) {
		filter = filter || '';
		const items = states.filter(s => s.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
			.map(state => (<li><Link href={"/game/" + state.name}>{state.name}</Link></li>));

		return (
			<div>
				<h1>
					<span>Bundesland auswählen</span>
					{items === undefined ? <i class="fa fa-cog fa-spin" aria-hidden="true"></i> : ""}
				</h1>
				<ul class={style.list}>
					<li><input class={style.search} placeholder="Suchen..." autofocus onKeyUp={e => this.setState({filter: e.target.value})} /></li>
					{items}
				</ul>
			</div>
		);
	}
}
