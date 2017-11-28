import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import {getUser} from '../firebase-auth';


export default class Highscore extends Component {
    constructor() {
        super();
        getUser((user) => {
            this.setState({user});
        });
    }
	render({entries}, {user}) {
		if (entries === undefined) {
            return (
			<div>
				<h1>Bestenliste <i class="fa fa-cog fa-spin" aria-hidden="true"></i></h1>
			</div>
            	);
		}
		let needLogin;
		if (user === null) {
            needLogin = (
				<h3>Um in der Bestenliste gelistet zu werden<br/>
					müssen Sie sich <Link activeClassName={style.active} href="/login">anmelden</Link>.
				</h3>);
        }
		if (entries.length > 0) {
            const items = entries.map((entry, i) => (
				<tr class={(user && entry.name === user.displayName) ? style.selected : ""}>
					<td class={style.position}>{i+1}</td>
					<td class={style.name}>{entry.name}</td>
					<td class={style.points}>{entry.points}</td>
				</tr>
			));


            return (
				<div>
					<h1>Bestenliste</h1>
					{needLogin}
					<div>
						<table style={style.table}>
							<tr>
								<th>Rang</th>
								<th>Name</th>
								<th>Punkte</th>
							</tr>
                            {items}
						</table>
					</div>
				</div>
            );
        } else {
			return (
				<div>
					<h1>Keine Bestenliste</h1>
                    {needLogin}
				</div>
			)
		}
	}
}
