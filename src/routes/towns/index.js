import { h, Component } from 'preact';
import SearchableList from '../../components/searchableList/index';
import {getTowns} from '../../data/geocoder';
import Breadcrumb from '../../components/breadcrumb/index';
import style from './style';

export default class TownsPage extends Component {
    constructor( {stateName} ) {
    	super();
    	this.state.towns = [];
        getTowns({stateName}).then((towns) => {
        	this.setState({towns: towns.map((town) => ({caption: town, link: '/game/' + stateName + '/' + town}))})
        });
	}
    render({stateName}, { towns }) {
        const breadcrumb = [{
            link: '/',
            caption: 'Home'
        }, {
            link: '/game/' + stateName,
            caption: stateName
        }];
        return (
			<div class={style.towns}>
                <Breadcrumb entries={breadcrumb} />
				<SearchableList data={towns} headline="Ort auswählen"></SearchableList>
			</div>
        );
    }
}