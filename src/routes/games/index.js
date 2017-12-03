import { h, Component } from 'preact';
import {urldecode} from '../../components/utils';
import Helmet from 'preact-helmet'
import Sharing from '../../components/sharing/index';
import SearchableList from '../../components/searchableList/index';
import Breadcrumb from '../../components/breadcrumb/index';
import style from './style';

export default class GamesPage extends Component {
    render({ stateName, townName }) {
        const games = [
            {caption: "Orte und Straßen", link: "/game/" + stateName + "/" + townName + "/street"},
            {caption: "Hofnamen", link: "/game/" + stateName + "/" + townName + "/manor"}
        ];
        const breadcrumb = [{
                link: '/',
                caption: 'Home'
            }, {
                link: '/game/' + stateName,
                caption: stateName
            }, {
                link: '/game/' + stateName + '/' + townName,
                caption: urldecode(townName)
            }
        ];
        return (
			<div class={style.games}>
                <Helmet
                    meta={[
                        {name: "description", content: urldecode(townName)},
                        {property: "og:type", content: "game"},
                        {property: "og:image", content: "/assets/header.png"}
                    ]}
                />
                <Breadcrumb entries={breadcrumb} />
                <h1>{urldecode(townName)}</h1>
                <img src="/assets/header.png" style="max-width: 100%; height: auto;"/>
                <p>
                    Wie gut kennst sie sich in {name} aus?<br/>
                    Testen sie ihr Wissen mit dem Straßen und Orte bzw. mit dem Hofnamen Suchspiel.
                </p>
				<SearchableList data={games} headline="Spiel auswählen" searchable={false}></SearchableList>
                <Sharing url={'/game/' + stateName + '/' + townName} name={urldecode(townName)} />
			</div>
        );
    }
}

