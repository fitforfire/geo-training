import 'whatwg-fetch'
import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Footer from './footer';
import Home from '../routes/home';
import About from '../routes/about';
import States from '../routes/states';
import Towns from '../routes/towns';
import Games from '../routes/games';
import Game from '../routes/game';
import Login from '../routes/login';
import Profile from '../routes/profile';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-109713396-1');

function logPageView() {
    if (typeof window !== "undefined") {
        ReactGA.set({page: window.location.pathname + window.location.search});
    	ReactGA.pageview(window.location.pathname + window.location.search);
	}
}

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
        logPageView();
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<States path="/game/" />
					<Towns path="/game/:stateName" />
					<Games path="/game/:stateName/:townName" />
					<Game path="/game/:stateName/:townName/:gameName" />
					<Login path="/login" />
					<About path="/about" />
					<Profile path="/profile" />
				</Router>
				<Footer />
			</div>
		);
	}
}
