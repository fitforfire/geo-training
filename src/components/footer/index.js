import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import {getUser} from '../../components/firebase-auth';
require('font-awesome/css/font-awesome.min.css');

export default class Footer extends Component {
    constructor() {
        super();
        getUser((user) => {
            this.setState({user});
        });
    }
	render(_, {user}) {
		return (
			<footer class={style.footer}>

				<nav>
					<Link activeClassName={style.active} href="/about"><i class="fa fa-globe" aria-hidden="true"></i> About</Link>
					<a href="https://feuerwehreinsatz.info/#navAbout" target="_blank">Impressum</a>
				</nav>
			</footer>
		);
	}
}
