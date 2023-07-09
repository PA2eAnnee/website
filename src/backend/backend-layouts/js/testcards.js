import {UserCards} from './users/UserCards.js';

window.onload = () => {
    const container = document.getElementsByTagName("main")[0];
    const usrCards = new UserCards(container);
}