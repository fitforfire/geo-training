import { h, Component } from 'preact';
import style from './style';
require('font-awesome/css/font-awesome.min.css');

export default class Instructions extends Component {
    render({state, countdown, captionChallange, challange, onSkip, onNext, onHelp}) {
        onSkip = onSkip || (() => {});
        onNext = onNext || (() => {});
        onHelp = onHelp || (() => {});
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
                {countdown !== undefined ? (<div class={style.countdown}><i class="fa fa-clock-o" aria-hidden="true"></i> {countdown}</div>) : <i class="fa fa-cog fa-spin" aria-hidden="true"></i>}
                {challange ? (<div class={style.challange}><i class="fa fa-search" aria-hidden="true"></i> {challange}</div>) : "" }
                {(countdown > 0 && !state) ? <span class={style.helpAndSkip}><div class={style.help} onClick={onHelp}><i class="fa fa-question" aria-hidden="true"></i> Overlay</div><div class={style.skip} onClick={onSkip}><i class="fa fa-ban" aria-hidden="true"></i> Überspringen</div></span> : "" }
                {(countdown <= 0 || state) ? <div class={style.next} onClick={onNext}><i class="fa fa-forward" aria-hidden="true"></i> Weiter</div> : ""}
            </div>
        );
    }
}
