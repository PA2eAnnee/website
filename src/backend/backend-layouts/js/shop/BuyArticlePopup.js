import {Popup} from "../global/Popup.js";
import {API} from "../global/API.js";
import { QuantityPicker } from "./QuantityPicker.js";

export class BuyArticlePopup extends Popup {
    name;
    stock;
    price;
    quantity;

    constructor(name, stock, price, id) {
        super();
        this.name = name;
        this.stock = stock;
        this.price = price;
        this.id = id;
    }

    generate() {
        const content = document.createElement("div");
        content.style.padding = "5%";

        const popupTitle = document.createElement("h2");
        popupTitle.innerText = this.name;
        content.appendChild(popupTitle);
        const centering = document.createElement("div");
        centering.style.width = "100%";
        centering.style.height = "50%";
        centering.style.display = "flex";
        centering.style.justifyContent = "space-around";
        centering.style.alignItems = "center";

        const quantityPicker = new QuantityPicker(1, this.stock, 1);

        centering.appendChild(quantityPicker.getPicker());

        content.appendChild(centering);

        const buyButton = document.createElement("button");
        buyButton.innerText = "Add to basket";
        buyButton.onclick = () => {
            this.addtoBasket(parseInt(nb.innerText));
        }
        content.appendChild(buyButton);
        super.generate(content);
    }

    addtoBasket(nb) {
        const basket = API.getBasket();
        const parsedBasket = JSON.parse(basket);
        if(parsedBasket[this.id]) {
            parsedBasket[this.id] += nb;
        } else {
            parsedBasket[this.id] = nb;
        }

        document.cookie = `basket=${JSON.stringify(parsedBasket)};path=/`;
    }
}