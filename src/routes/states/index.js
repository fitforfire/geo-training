import { h, Component } from 'preact';
import SearchableList from '../../components/searchableList/index';
import Breadcrumb from '../../components/breadcrumb/index';
import states from '../../data/states.json';
import style from './style';

export default class StatesPage extends Component {
	render() {
		const statesConfig = states.map(state => ({caption: state.name, link: "/game/" + state.name}));
        const breadcrumb = [{
            link: '/',
            caption: 'Home'
        }];
		return (
			<div class={style.states}>
				<Breadcrumb entries={breadcrumb} />
				<SearchableList data={statesConfig} headline="Bundesland auswählen"></SearchableList>
			</div>
		);
	}
}
