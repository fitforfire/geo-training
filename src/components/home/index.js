import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import {firebase} from '../../components/firebase-auth';
import style from './style';

export default class Home extends Component {
    constructor() {
        super();
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({user});
        });
    }
	render(_, {user}) {
    	let login;
    	if(user) {
            login = (<p>{"Sie sind als " + user.displayName + " angemeldet"}</p>);
		} else {
            login = (<p><Link href="/login">Zum Login</Link></p>);
		}
		return (
			<div class={style.wrapper}>
				<h1>Geo-Training</h1>
				<h3>Teilprojekt von feuerwehreinsatz.info</h3>

				{login}
				<p><Link href="/game">Zur Spielauswahl &gt; &gt;</Link></p>

				<p class={style.motivation}>
					<h3>
						Motivation
					</h3>
					<p>
						Elektronische Helfer wie Feuerwehreinsatz.info oder Google Maps unterstützen uns immer mehr in unserem täglichen Tagesablauf.
					</p>
					<p>
						Dabei ist es aber trotzdem wichtig, dass gewisse Grundkenntisste nicht verloren gehen.
						Z.B. soll jedes Mitglied einer Einsatzorganisation wie Feuerwehr, Polizeit oder Rettung
						in der Lage sein Straßen oder Orte ohne Zuhilfename elektronischer Hilfsmittel zu finden.
					</p>
					<p>
						Geo-Training.at soll dabei helfen dieses Wissen spielerisch aufzubauen und dabei die Ortskunde wieder attraktiver machen.
					</p>
				</p>
			</div>
		);
	}
}