import {uiConfig, authUi} from '../../components/firebase-auth';
import { h, Component } from 'preact';
import style from './style';
require('firebaseui/dist/firebaseui.css');

export default class TownsPage extends Component {

	componentDidMount() {
		// The start method will wait until the DOM is loaded.
        authUi.start('#login-container', uiConfig);
	}

	render() {
		return (
			<div class={style.login}>
				<div id="login-container"></div>
			</div>
		);
	}
}
