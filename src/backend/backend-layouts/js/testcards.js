import {UserCards} from './UserCards.js';

window.onload = () => {
    const container = document.getElementsByTagName("main")[0];
    const usrCards = new UserCards(container);
}