import {EncounterCard, Story, Choice, Result, Script} from "./cards.jsx";
import {Agenda, Asset, Attr, Critter, Difficult, Human, Loot, Radiation, Text, Wasteland} from "./inline.jsx";
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
                        <Script do="Trash">В мусорку</Script>
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
                        <Script do="Trash">В мусорку</Script>
                    </Result>
                </Choice>
            </EncounterCard>
        )),

        new Card("Wasteland", "★1", () => (
            <EncounterCard type="Wasteland" number="★">
                <Story>
                    В здании что-то движется. Вы готовитесь к бою, но фигура, вышедшая из развалин, дружелюбно вам
                    машет.
                </Story>
                <Choice number="1">
                    <Text>Обшарить здание вместе с ней • <Attr>P</Attr><Attr>C</Attr><Difficult>4</Difficult></Text>
                    <Result name="Успех">
                        <Text>
                            <strong>Успех:</strong> работая вместе, вы находите припасы.
                        </Text>
                        <Script><Loot/> ✕ <Wasteland/></Script>
                    </Result>
                    <Result name="Провал">
                        <Text>
                            <strong>Провал:</strong> «Смотри, что нашла!» — кричит она. Вы подходите и видите, что эта
                            дура держит светящуюся колбу.
                        </Text>
                        <Script>Получите 1 <Radiation/></Script>
                    </Result>
                </Choice>
                <Choice number="2">
                    <Text>Небось, уже собрала знатную добычу! Убить её</Text>
                    <Result>
                        <Text>Улыбаясь, вы приветствуете незнакомку. Но как только та поворачивается спиной, наносите
                            удар!</Text>
                        <Script><Loot/> ✕ <Wasteland/></Script>
                        <Script do="Add" args={["002"]}>Добавьте 002</Script>
                        <Script>Станьте <em>презренным</em></Script>
                        <Script>Возьмите <Human/> и вступите с ним в бой</Script>
                        <Script do="Trash">В мусорку</Script>
                    </Result>
                </Choice>
                <Choice number="3">
                    <Text>Предложить пойти с вами</Text>
                    <Result>
                        <Script>
                            Раскрывайте карты <Asset/>, пока не найдёте спутника; если вы отвечаете его требованиям,
                            возьмите
                            эту карту. Остальные сбросьте.
                        </Script>
                        <Script do="Add" args={["003"]}>Добавьте 003</Script>
                        <Script>Станьте <em>кумиром</em></Script>
                        <Script do="Trash">В мусорку</Script>
                    </Result>
                </Choice>
            </EncounterCard>
        )),

        new Card("Wasteland", "★2", () => (
            <EncounterCard type="Wasteland" number="★">
                <Story>
                    Обшаривая развалины, вы замечаете на земле фигуру. Подойдя, вы видите, что это труп мужчины —
                    ни оружия, ни снаряжения. Что он тут делал?
                </Story>
                <Choice number="1">
                    <Text>Обыскать труп</Text>
                    <Result>
                        <Text>
                            На трупе вы находите грязное, мятое фото этого мужчины в боевом снаряжении рядом с мальчиком
                            и девочкой. Под рисунком птички вы различаете слова: «Ухожу на восток... всегда буду
                            жалеть... ...бя и Маргарет». Может, эта Маргарет ещё жива?
                        </Text>
                        <Script><Loot/></Script>
                        <Script>3 опыта</Script>
                        <Script do="Add" args={["005"]}>Добавьте 005</Script>
                        <Script do="Trash">В мусорку</Script>
                    </Result>
                </Choice>
                <Choice number="2">
                    <Text>Не трогать труп, обшарить здание • <Attr>P</Attr><Attr>E</Attr><Difficult>4</Difficult></Text>
                    <Result name="Успех">
                        <Text>
                            <strong>Успех:</strong> Пустошь полна покойников. Надо собирать добычу, чтобы не стать
                            одним из них.
                        </Text>
                        <Script><Loot/> ✕ <Wasteland/></Script>
                    </Result>
                    <Result name="Провал">
                        <Text>
                            <strong>Провал:</strong> пока вы копались, послышались шаги. Труп привлёк внимание других
                            падальщиков.
                        </Text>
                        <Script>Возьмите <Critter/> и вступите с ним в бой</Script>
                    </Result>
                </Choice>
            </EncounterCard>
        )),

        new Card("Wasteland", "★3", () => (
            <EncounterCard type="Wasteland" number="★">
                <Story>
                    Вы забрались в ту часть здания, где мародёры ещё не оставили следов. «Интересно, почему они сюда
                    не заходят», — думаете вы и вдруг слышите шуршание.
                </Story>
                <Choice number="1">
                    <Text>Вломиться и убить тварей</Text>
                    <Result>
                        <Text>Вы входите в берлогу, готовясь истребить этих! созданий ради общего блага.</Text>
                        <Script>Возьмите <Critter/> и вступите с ним в бой</Script>
                        <Script><Loot/> ✕ <Wasteland/></Script>
                        <Script do="Add" args={["004"]}>Добавьте 004</Script>
                        <Script>Станьте <em>кумиром</em></Script>
                        <Script do="Trash">В мусорку</Script>
                    </Result>
                </Choice>
                <Choice number="2">
                    <Text>Натравить их на другого • Выживший в соседнем секторе</Text>
                    <Result>
                        <Text>Вы шумите, чтобы выманить тварей и натравить их на соседа.</Text>
                        <Script>Этот выживший берёт <Critter/> и вступет с ним в бой</Script>
                        <Script do="Add" args={["004"]}>Станьте <em>презренным</em></Script>
                        <Script do="Trash">В мусорку</Script>
                    </Result>
                </Choice>
                <Choice number="3">
                    <Text>Схватить что-нибудь и удрать</Text>
                    <Result>
                        <Text>
                            Быстро выскочив из-за угла, вы наугад хватаете первую же подвернувшуюся во мраке вещь.
                            Затем убегаете что есть духу.
                        </Text>
                        <Script><Loot/></Script>
                        <Script>Передвиньтесь на 1 сектор</Script>
                    </Result>
                </Choice>
            </EncounterCard>
        )),

        new Card("Wasteland", "★4", () => (
            <EncounterCard type="Wasteland" number="★">
                <Story>
                    Входя в развалины, вы слышите только собственные шаги. Тут тихо и спокоино.
                </Story>
                <Choice number="1">
                    <Text>Взломать старую кассу • <Attr>I</Attr><Difficult>3</Difficult></Text>
                    <Result name="Успех">
                        <Text>
                            <strong>Успех:</strong> касса открывается.
                        </Text>
                        <Script><Wasteland/> крышек</Script>
                    </Result>
                    <Result name="Провал">
                        <Text>
                            <strong>Провал:</strong> компьютер издаёт сигнал тревоги.
                            На звук приходит кто-то снаружи. Похоже, вы не одни. Хватаете одинокую крышку,
                            лежащую под кассой.
                        </Text>
                        <Script>1 крышка</Script>
                        <Script>Возьмите <Critter/> и вступите с ним в бой</Script>
                    </Result>
                </Choice>
                <Choice number="2">
                    <Text>Поискать полезное снаряжение • <Attr>P</Attr><Attr>L</Attr><Difficult>4</Difficult></Text>
                    <Result name="Успех">
                        <Text>
                            <strong>Успех:</strong> вы нашли странные пометки в углу здания. Они подсказывают,
                            где найти тайник.
                        </Text>
                        <Script>2 опыта</Script>
                        <Script do="Add" args={["001"]}>Добавьте 001</Script>
                        <Script do="Trash">В мусорку</Script>
                    </Result>
                    <Result name="Провал">
                        <Text>
                            <strong>Провал:</strong> только вы начали разгадывать пометки на стене, как кто-то
                            выпрыгнул из мрака!
                        </Text>
                        <Script>Возьмите <Critter/> и вступите с ним в бой</Script>
                    </Result>
                </Choice>
            </EncounterCard>
        )),

    ];
}
