import { h, Component } from 'preact';
import States from '../../components/states/index';
import style from './style';

export default class StatesPage extends Component {
	render({ state }) {
		return (
			<div class={style.states}>
				<States></States>
			</div>
		);
	}
}
