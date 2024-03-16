import {Component} from "preact";

export class EncounterCard extends Component {
    render(props, state, context) {
        return (
            <div className="EncounterCard">
                <div className="Header">
                    <div className="Number">{props.number}</div>
                </div>
                {props.children}
            </div>
        );
    }
}

export function Story(props) {
    return (
        <div class="Story">
            {props.children}
        </div>
    );
}

export function Choice(props) {
    return (
        <div>
            <div class="Choice">
                {props.number &&
                    <div class="Bookmark">
                        {props.number}
                    </div>
                }
                {props.children.filter(child => child.type.name === 'Text')}
            </div>

            {props.children.filter(child => child.type.name !== 'Text')}
        </div>
    );
}

export function Result(props) {
    return (
        <div class="Result">
            {props.children}
        </div>
    );
}

export function Script(props) {
    return (
        <div class="Script">
            {props.children}
        </div>
    );
}
