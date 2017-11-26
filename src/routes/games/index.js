import { h, Component } from 'preact';
import SearchableList from '../../components/searchableList/index';
import style from './style';

export default class GamesPage extends Component {
    render({ stateName, townName }) {
        const games = [
            {caption: "Orte und Straßen", link: "/game/" + stateName + "/" + townName + "/street"},
            {caption: "Hofnamen", link: "/game/" + stateName + "/" + townName + "/manor"}
        ];
        return (
			<div class={style.games}>
				<SearchableList data={games} headline="Spiel auswählen" searchable={false}></SearchableList>
			</div>
        );
    }
}

