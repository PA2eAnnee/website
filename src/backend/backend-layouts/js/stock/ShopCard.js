import {Card} from "../global/Card.js";

export class ShopCard extends Card {
    description;
    stock;
    price;
    id;
    constructor(description, stock, price, id) { 
        super();
        this.price = price;
        this.id = id;
        this.attributes.push({tag: "h3", value: description, CssClass: ""});
        this.attributes.push({tag: "h5", value: `${price}€`, CssClass: ""});
        this.generate("card-shop", "shop-profile");
    }
}