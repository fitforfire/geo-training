import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import {getUser} from '../../components/firebase-auth';
import style from './style';
import common from '../common';

export default class Home extends Component {
    constructor() {
        super();
        getUser((user) => {
            this.setState({user});
        });
    }
	render(_, {user}) {
    	let login;
    	if(user) {
            login = (<p>{"Sie sind als " + user.displayName + " angemeldet"}</p>);
		} else {
            login = (<p class={style.center}><Link class={common.button} href="/login">Zum Login <i class="fa fa-angle-double-right" aria-hidden="true"></i></Link></p>);
		}
		return (
			<div class={style.wrapper}>



					<h3>
						GeoTraining - Motivation
					</h3>
					<p>
						Elektronische Helfer wie Feuerwehreinsatz.info oder Google Maps unterstützen uns immer mehr in unserem täglichen Tagesablauf.
					</p>
					<p>
						Dabei ist es aber trotzdem wichtig, dass gewisse Grundkenntnisse nicht verloren gehen.
						Z.B. soll jedes Mitglied einer Einsatzorganisation wie Feuerwehr, Polizei oder Rettung
						in der Lage sein Straßen oder Orte ohne Zuhilfenahme elektronischer Hilfsmittel zu finden.
					</p>
					<p>
						Geo-Training.at soll dabei helfen dieses Wissen spielerisch aufzubauen und dabei die Ortskunde wieder attraktiver machen.
					</p>

					<p class={style.center}><Link href="/game" class={common.button}>Zur Spielauswahl <i class="fa fa-angle-double-right" aria-hidden="true"></i></Link></p>

                	{login}

					<h3>
						Datenherkunft
					</h3>
					<p>
						GeoTraning verwendet als Grunddaten für Adressen und Hofnamen die Daten des
						"<a href="http://www.bev.gv.at/portal/page?_pageid=713,2601271&_dad=portal&_schema=PORTAL" target="_blank">
						Österreichisches Adressregister, Stichtagsdaten vom 01.10.2017</a>"
						vom Bundesamt für Eich und Vermessungswesen.
					</p>
					<p>
						Die Hintergrundkarte (Satelitenbild) wird über den Dienst <a href="https://basemap.at" target="_blank">basemap.at</a> bereitgestellt.
					</p>
					<p>
						All diese Daten sind als "Open Government Data" öffentlich und kostenlos verfügbar (<a href="https://www.data.gv.at/" target="_blank">https://www.data.gv.at/</a>)
					</p>
					<p>
						Sollten Daten falsch oder unvollständig sein bitte mit der jeweiligen Gemeinde Kontakt aufnehmen oder den <a href="http://www.geoland.at/geo_webgis/init.aspx?karte=basemap&darstellungsvariante=dv_fb&toolid=8f5e96d9-4884-406a-9801-fe9de4af9290" target="_blank">Datenfehler hier melden</a>
					</p>

				<h3>Teilprojekt von feuerwehreinsatz.info</h3>
			</div>
		);
	}
}
