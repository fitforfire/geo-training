import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import {urlencode} from '../../components/utils';
import style from './style';

export default class Breadcrumb extends Component {
	render({entries}) {
		const items = entries.map(entry => (<li><a href={entry.link}>{entry.caption}</a></li>));
		return (
			<div class={style.breadcrumb}>
				<ul>
					{items}
				</ul>
			</div>
		);
	}
}
