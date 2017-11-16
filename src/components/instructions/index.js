import { h, Component } from 'preact';
import style from './style';

export default class Header extends Component {
    render({state, countdown, captionSelected, selected, captionChallange, challange}) {
        let stateClass;
        switch (state) {
            case undefined:
            default:
                stateClass = "";
                break;
            case true:
                stateClass = style.success;
                break;
            case false:
                stateClass = style.fail;
                break;
        }
        return (
            <div class={style.instructions + " " + stateClass}>
                <div class={style.countdown}>{countdown && "Punkte: " + countdown}</div>
                <div class={style.caption}>{captionChallange}</div>
                <div class={style.challange}>{challange}</div>
            </div>
        );
    }
}
