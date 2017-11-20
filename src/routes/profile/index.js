import { h, Component } from 'preact';
import style from './style';
import common from '../../components/common';
import {firebase} from '../../components/firebase-auth';

export default class Profile extends Component {
    constructor() {
        super();
        this.state.user = {displayName: ''};
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({user});
        });
    }
    logout() {
        firebase.auth().signOut().then(function() {
            window.location = "/";
        });
    }
	render({}, {user}) {
		return (
			<div class={style.profile}>
				<h1>Benutzer: {user.displayName}</h1>
				<p>Sie sind angemeldet, damit werden Ihre Punkte in der Bestenliste hinterlegt.</p>
				<a class={common.button} onClick={this.logout}>Benutzer abmelden</a>
			</div>
		);
	}
}
