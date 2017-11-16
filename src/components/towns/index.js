import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import {getTowns} from '../../data/geocoder';
import style from './style';



export default class Towns extends Component {
	constructor({stateName}) {
		super();
		this.state.towns = [];
        getTowns({stateName}).then(towns => this.setState({towns}));
	}
	render({stateName}, {towns}) {

		const items = towns.map(town => (<li><Link href={"/game/" + stateName + "/" + town}>{town}</Link></li>));

		return (
			<div>
				<h1>Gemeinde wählen</h1>
				<ul class={style.list}>
					{items}
				</ul>
			</div>
		);
	}
}
