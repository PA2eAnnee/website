import {Cards} from "../global/Cards.js";
import {API} from "../global/API.js";
import {ShopCard} from "./ShopCard.js";

export class ShopCards extends Cards {
    constructor(container) {
        super(container);
        this.getArticles();
    }

    async getArticles() {
        const articles = await API.getArticles();
        articles.forEach(article => {
            this.addElem(new ShopCard(article.name, article.description, article.stock, article.price, article.id));
        });
        this.display();
    }
}