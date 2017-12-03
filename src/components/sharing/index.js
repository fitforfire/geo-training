import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import {urlencode} from '../../components/utils';
import style from './style';

export default class Breadcrumb extends Component {
	render({name, url}) {
        let sharing = (<div/>)
        if (typeof window !== "undefined") {
            sharing = (<iframe src={"https://www.facebook.com/plugins/share_button.php?href=" + document.location.origin + url + "&layout=button&size=large&mobile_iframe=true&width=73&height=28&appId"} width="73" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>);
        }
		return (
			<div class={style.sharing}>
				<p>
					<h3>Wie gut schneiden ihre Freunde ab? - Fordere sie heraus!</h3>
				</p>
				<p>
                    {sharing}
				</p>
			</div>
		);
	}
}
