import { h, Component } from 'preact';
import SearchableList from '../../components/searchableList/index';
import states from '../../data/states.json';
import style from './style';

export default class StatesPage extends Component {
	render() {
		const statesConfig = states.map(state => ({caption: state.name, link: "/game/" + state.name}));
		return (
			<div class={style.states}>
				<SearchableList data={statesConfig} headline="Bundesland auswählen"></SearchableList>
			</div>
		);
	}
}
