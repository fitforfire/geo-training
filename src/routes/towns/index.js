import { h, Component } from 'preact';
import SearchableList from '../../components/searchableList/index';
import {getTowns} from '../../data/geocoder';
import style from './style';

export default class TownsPage extends Component {
    constructor( {stateName} ) {
    	super();
    	this.state.towns = [];
        getTowns({stateName}).then((towns) => {
        	this.setState({towns: towns.map((town) => ({caption: town, link: '/game/' + stateName + '/' + town}))})
        });
	}
    render(_, { towns }) {
        return (
			<div class={style.towns}>
				<SearchableList data={towns} headline="Ort auswählen"></SearchableList>
			</div>
        );
    }
}