import {Card} from "../global/Card.js";
import { BuyArticlePopup } from "./BuyArticlePopup.js";
import { ViewArticlePopup } from "./ViewArticlePopup.js";

export class ShopCard extends Card {
    description;
    stock;
    price;
    id;
    constructor(name, description, stock, price, id) { 
        super();
        this.price = price;
        this.id = id;
        this.attributes.push({tag: "h3", value: name, CssClass: ""});
        this.attributes.push({tag: "h5", value: `${price}€`, CssClass: ""});
        this.attributes.push({tag: "div", value: "", CssClass: ["btns"]});
        this.generate("card-shop", "shop-profile");
        const buttonContainer = this.card.getElementsByClassName("btns")[0];
        console.log(this.card);
        const viewButton = document.createElement("button");
        viewButton.innerText = "View";
        viewButton.onclick = () => {
            const viewPopup = new ViewArticlePopup(name, description, stock, price, id);
            viewPopup.generate();
        }
        const buyButton = document.createElement("button");
        buyButton.innerText = "Buy";
        buyButton.onclick = () => {
            const buyPopup = new BuyArticlePopup(name, stock, price, id);
            buyPopup.generate();
        }
        buttonContainer.appendChild(viewButton);
        buttonContainer.appendChild(buyButton);
    }
}