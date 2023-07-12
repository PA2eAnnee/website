import {API} from "../global/API.js";
import { QuantityPicker } from "./QuantityPicker.js";

export class Recapitulation {
    shop;
    container;
    constructor(shop) {
        if(shop) {
            this.shop = shop;
        } else {
            this.shop = false;
        }
        this.container = document.getElementById("toPay");
        }

    generate() {
        if(this.shop) {
            API.getArticles().then((AllArticles) => {
                const basket = JSON.parse(API.getBasket());
                const articles = [];
                let total = 0;
                let i = 0;
                for(const article of Object.keys(basket)) {
                    articles[i] = {}
                    for(const getArticle of AllArticles) {
                        if(getArticle.id == article) {
                            articles[i].article = getArticle;
                            articles[i].amount = basket[article];
                            total += articles[i].article.price * articles[i].amount;
                        }
                    }
                    if(Object.keys(articles[i]).length > 0) {
                        i++;
                    }
                }
                document.cookie = `total_order=${total};path=/`;
                const totalP = document.createElement("p");
                articles.forEach(article => {
                    const div = document.createElement("div");
                    div.classList.add("recap-row");
                    const nameP = document.createElement("p");
                    nameP.innerText = article.article.name;
                    const priceP = document.createElement("p");
                    priceP.innerText = article.article.price;

                    const quantityPicker = new QuantityPicker(1, article.article.stock, article.amount, () => {
                        total += article.article.price;
                        basket[article.article.id]++;
                        totalP.innerText = `total: ${total}`;
                        document.cookie = `basket=${JSON.stringify(basket)};path=/`;
                        document.cookie = `total_order=${total};path=/`;
                    }, () => {
                        total -= article.article.price;
                        totalP.innerText = `total: ${total}`;
                        basket[article.article.id]--;
                        document.cookie = `basket=${JSON.stringify(basket)};path=/`;
                        document.cookie = `total_order=${total};path=/`;
                    });
                    div.appendChild(nameP);
                    div.appendChild(priceP);
                    div.appendChild(quantityPicker.getPicker());

                    this.container.appendChild(div);
                });
                totalP.innerText = `total: ${total}`;
                this.container.appendChild(totalP);
            });
        }    
    }
}