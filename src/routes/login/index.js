const firebase = require('firebase/app');
const firebaseui = require('firebaseui');
import {uiConfig} from '../../components/firebase-auth';
import { h, Component } from 'preact';
import style from './style';
require('firebaseui/dist/firebaseui.css');

export default class TownsPage extends Component {

	componentDidMount() {
        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
		// The start method will wait until the DOM is loaded.
        ui.start('#login-container', uiConfig);
	}

	render() {
		return (
			<div class={style.login}>
				<div id="login-container"></div>
			</div>
		);
	}
}
