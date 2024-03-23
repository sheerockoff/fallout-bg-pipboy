import {render} from 'preact';

import './style.css';
import {CardsRepository} from "./repository.jsx";

export function App() {
    const cards = new CardsRepository();

    const card = cards.find("Wasteland", "★4");

    return (
        <div class="App">
            {card.render()}
        </div>
    );
}

render(<App/>, document.getElementById('app'));
