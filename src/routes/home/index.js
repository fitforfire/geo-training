import { h, Component } from 'preact';
import style from './style';
import Home from '../../components/home/index';

export default class HomePage extends Component {
	render() {
        return (
            <div class={style.home}>
                <Home />
            </div>
            );
	}
}
