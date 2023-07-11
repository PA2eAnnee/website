import {ShopCards} from '../../backend/backend-layouts/js/shop/ShopCards.js';

window.onload = () => {
    const shopCards = new ShopCards(document.getElementsByTagName("main")[0]);
}