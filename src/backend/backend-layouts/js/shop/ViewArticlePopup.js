import {Popup} from "../global/Popup.js";

export class ViewArticlePopup extends Popup {
    
    name;
    description;
    stock;
    price;
    id;

    constructor(name, description, stock, price, id) {
        super();
        this.name = name;
        this.description = description;
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

        const popupDescription = document.createElement("h5");
        popupDescription.innerText = this.description;
        content.appendChild(popupDescription);

        const popupBottom = document.createElement("div");
        popupBottom.style.width = "100%";
        popupBottom.style.display = "flex";
        popupBottom.style.justifyContent = "space-around";

        const popupPrice = document.createElement("p");
        popupPrice.innerText = `${this.price}€`;
        popupPrice.style.fontWeight = "bold";
        popupBottom.appendChild(popupPrice);

        const popupStock = document.createElement("p");
        popupStock.innerText = `${this.stock} in stock`;
        popupStock.style.fontWeight = "bold";
        popupBottom.appendChild(popupStock);

        content.appendChild(popupBottom);
        super.generate(content);
    }
}