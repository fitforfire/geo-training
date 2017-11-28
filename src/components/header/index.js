import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import {getUser} from '../../components/firebase-auth';
require('font-awesome/css/font-awesome.min.css');

export default class Header extends Component {
    constructor() {
        super();
        getUser((user) => {
            this.setState({user});
        });
    }
	render(_, {user}) {

    	let auth;
    	if (!user) {
    		auth = (<Link activeClassName={style.active} href="/login">Login</Link>);
		} else {
    		auth = (<Link activeClassName={style.active} href="/profile">{user.displayName}</Link>);
		}

		return (
			<header class={style.header}>
				<h1><Link activeClassName={style.active} href="/"><i class="fa fa-globe" aria-hidden="true"></i> GeoTraining</Link></h1>
				<nav>
					{auth}
				</nav>
			</header>
		);
	}
}
