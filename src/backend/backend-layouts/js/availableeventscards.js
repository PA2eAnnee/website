import {EventCards} from "./events/EventCards.js";

window.onload = () => {
    const container = document.getElementsByTagName("main")[0];
    const eventCards = new EventCards(container, false, true);
}