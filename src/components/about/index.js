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
				<p class="{style.block}">
					<h4>Entwicklung und Programmierung</h4>
					<p>Stefan Hofer (FF Saalfelden)</p>
				</p>

				<p class="{style.block}">
					<h4>Projektunterstützung</h4>
					<p>Andreas Rauchenbacher (FF St. Johann)</p>
				</p>

				<p class="{style.block}">
					<h4>Service und Information</h4>
					<strong>E-Mail:</strong> <a href="mailto:info@122.co.at">info@122.co.at</a><br/>
					<strong>Telefon:</strong> <a href="tel:+436604122122">06604 122 122</a><br/>
				</p>

				<p class="{style.block}">
					<h4>Supportteam</h4>
					Andreas Rauchenbacher (FF St. Johann)<br/>
					Lukas Fritzenwanger (FF Uttendorf)<br/>
					Martin Zorec (FF Abtenau)<br/>
					Stefan Hofer (FF Saalfelden)<br/>
					Stefan Vötter (FF Kuchl)<br/>
				</p>

				<p class="{style.block}">
					<h4>Vision</h4>
					<p>GeoTraining dient als Ergänzung zum System <a href="https://feuerwehreinsatz.info" target="_blank">feuerwehreinsatz.info</a></p>
				</p>

				<p class="{style.block}">
					<h4>Kosten</h4>
					<p>
						<strong>Für die Benützung des Systems entstehen keine Kosten.</strong>
					</p>
				</p>
			</div>
		);
	}
}
