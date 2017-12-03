import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import {urlencode} from '../../components/utils';
import style from './style';

export default class SearchableList extends Component {
	render({headline, data, searchable = true}, {filter}) {
        filter = filter || '';
        const items = (data && data.filter(s => s.caption.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
			.map(entry => (<li><Link href={urlencode(entry.link)}>{entry.caption}</Link></li>))) || [];

		return (
			<div>
				<h2>
					<span>{headline}</span>
                    {data === undefined ? <i class="fa fa-cog fa-spin" aria-hidden="true"></i> : ""}
				</h2>
				<ul class={style.list}>
					{searchable ? <li><input class={style.search} placeholder="Suchen..." autofocus onKeyUp={e => this.setState({filter: e.target.value})} /></li> : ""}
					{items}
				</ul>
			</div>
		);
	}
}
