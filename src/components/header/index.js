import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import firebase from 'firebase';
import auth from '../../components/firebase-auth';


export default class Header extends Component {
    constructor() {
        super();
        firebase.auth().onAuthStateChanged((user) => {
        	console.log(user);
            this.setState({user});
        });
    }
    logout() {

        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }, function(error) {
            // An error happened.
        });
	}
	render(_, {user}) {

    	let auth;
    	if (!user) {
    		auth = (<Link activeClassName={style.active} href="/login">Login</Link>);
		} else {
    		auth = (<a activeClassName={style.active} onClick={this.logout}>{"Logout " + user.displayName}</a>);
		}

		return (
			<header class={style.header}>
				<h1>Geo-Training</h1>
				<nav>
					<Link activeClassName={style.active} href="/">Home</Link>
					{auth}
				</nav>
			</header>
		);
	}
}
