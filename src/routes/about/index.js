import { h, Component } from 'preact';
import style from './style';
import About from '../../components/about/index';

export default class AboutPage extends Component {
	render() {
        return (
            <div class={style.about}>
                <About />
            </div>
            );
	}
}
