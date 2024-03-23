import {Component, toChildArray} from "preact";

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
    const children = toChildArray(props.children);

    return (
        <div>
            <div class="Choice">
                {props.number &&
                    <div class="Bookmark">
                        {props.number}
                    </div>
                }
                {children.shift()}
            </div>

            {children}
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
