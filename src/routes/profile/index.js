import { h, Component } from 'preact';
import style from './style';
import common from '../../components/common';
import {getUser, signOut, updateUser} from '../../components/firebase-auth';

export default class Profile extends Component {
    constructor() {
        super();
        this.state.user = {displayName: ''};
        getUser((user) => {
            this.setState({user});
        });
    }
    logout() {
        signOut().then(function() {
            window.location = "/";
        });
    }
    updateUser() {
        updateUser({displayName: this.dispayNameInput.value})
            .then(() => window.location.reload());
    }
	render({}, {user}) {
		return (
			<div class={style.profile}>
				<h1>Benutzer: {user.email}</h1>
                <p>
                    Anzeigename: <input ref={(input) => { this.dispayNameInput = input }}value={user.displayName} />
                </p>
                <p>
                    <button onClick={()=> this.updateUser()}>Ändern</button>
                </p>
				<p>Sie sind angemeldet, damit werden Ihre Punkte in der Bestenliste hinterlegt.</p>
				<a class={common.button} onClick={this.logout}>Benutzer abmelden</a>
			</div>
		);
	}
}
