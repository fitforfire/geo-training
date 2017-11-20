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
	render({stateName}, {towns, filter}) {
        filter = filter || '';
        const items = towns.filter(s => s.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
			.map(town => (<li><Link href={"/game/" + stateName + "/" + town}>{town}</Link></li>));

		return (
			<div>
				<h1>
					<span>Gemeinde auswählen</span>
                    {items === undefined ? <i class="fa fa-spinner fa-spin" aria-hidden="true"></i> : ""}
				</h1>
				<ul class={style.list}>
					<li><input class={style.search} placeholder="Suchen..." autofocus onKeyUp={e => this.setState({filter: e.target.value})} /></li>
					{items}
				</ul>
			</div>
		);
	}
}
