import {EncounterCard, Story, Choice, Result, Script} from "./cards.jsx";
import {Agenda, Loot, Text, Wasteland} from "./inline.jsx";
import {h} from "preact";

export class Card {
    /**
     * @param {string} type
     * @param {string }number
     * @param {function} render
     */
    constructor(type, number, render) {
        /** @type {string} */
        this.type = type;
        /** @type {string} */
        this.number = number;
        /** @type {function} */
        this.render = render;
    }
}

export class CardsRepository {

    /**
     * @param {string} type
     * @param {string} number
     * @returns {Card}
     */
    find(type, number) {
        return this.cards.find(card => card.type === type && card.number === number);
    }

    cards = [
        new Card("Wasteland", "001", () => (
            <EncounterCard type="Wasteland" number="001">
                <Story>
                    Кто-то нашёл пометки, оставленные некоей организацией. Следуя им, вы находите большой, хорошо
                    спрятанный тайник.
                </Story>
                <Choice number="1">
                    <Text>Это явно чужое. Не трогать, найти себе свою добычу</Text>
                    <Result>
                        <Text>
                            Вы кое-что находите поблизости. Вы надеетесь, что хозяева оценят ваше решение не
                            грабить их.
                        </Text>
                        <Script>Станьте <em>кумиром</em></Script>
                        <Script><Loot/> ✕ <Wasteland/></Script>
                    </Result>
                </Choice>
                <Choice number="2">
                    <Text>Взять всё себе!</Text>
                    <Result>
                        <Text>Что нашёл, то моё, верно?</Text>
                        <Script><Wasteland/> крышек</Script>
                        <Script><Loot/> ✕ <Wasteland/></Script>
                        <Script>В мусорку</Script>
                    </Result>
                </Choice>
                <Choice number="3">
                    <Text>Если отдать всё на благотворительность, можно заработать влияние</Text>
                    <Result>
                        <Text>
                            Собрав всё, что можете унести, вы дарите эти вещи тому, кто и правда в них
                            нуждается.
                        </Text>
                        <Script><Agenda/></Script>
                        <Script>В мусорку</Script>
                    </Result>
                </Choice>
            </EncounterCard>
        )),
    ];
}
