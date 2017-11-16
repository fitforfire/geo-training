import { h, Component } from 'preact';
import style from './style';
import Game from '../../components/game/index';
import States from '../../components/states/index';
import firebase from 'firebase';
import auth from '../../components/firebase-auth';

export default class Home extends Component {
	render() {
        return (
            <div class={style.home}>
                <States />
            </div>
            );
	}
}
