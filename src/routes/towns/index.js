import { h, Component } from 'preact';
import Towns from '../../components/towns/index';
import style from './style';

export default class TownsPage extends Component {
	render({ stateName }) {
		return (
			<div class={style.towns}>
				<Towns stateName={stateName}></Towns>
			</div>
		);
	}
}
