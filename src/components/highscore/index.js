import { h, Component } from 'preact';
import style from './style';


export default class Highscore extends Component {
	render({entries}) {
		if (entries === undefined) {
            return (
			<div>
				<h1>Bestenliste <i class="fa fa-spinner fa-spin" aria-hidden="true"></i></h1>
			</div>
            	);
		}
		if (entries.length > 0) {
            const items = entries.map((entry, i) => (
				<tr>
					<td class={style.position}>{i+1}</td>
					<td class={style.name}>{entry.name}</td>
					<td class={style.points}>{entry.points}</td>
				</tr>
			));


            return (
				<div>
					<h1>Bestenliste</h1>
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
				</div>
			)
		}
	}
}
