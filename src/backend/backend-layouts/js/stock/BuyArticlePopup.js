import {Popup} from "../global/Popup.js";
import {API} from "../global/API.js";

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

        const nb = document.createElement("p");
        nb.innerText = "1";
        nb.id = "nb";

        const plus = document.createElement("img");
        plus.src = "../../img/plus.svg";
        plus.style.width = "30px";
        plus.style.height = "30px";
        plus.style.filter = "invert(0%) sepia(2%) saturate(7493%) hue-rotate(1deg) brightness(110%) contrast(94%)";
        plus.style.border = "solid black 2px";
        plus.style.borderRadius = "50px";
        plus.onclick = () => {
            if(nb.innerText < this.stock) {
                nb.innerText = parseInt(nb.innerText) + 1;
            }
        }

        const minus = document.createElement("img");
        minus.src = "../../img/minus.svg";
        minus.style.width = "30px";
        minus.style.height = "30px";
        minus.style.filter = "invert(0%) sepia(2%) saturate(7493%) hue-rotate(1deg) brightness(110%) contrast(94%)";
        minus.style.border = "solid black 2px";
        minus.style.borderRadius = "50px";
        minus.onclick = () => {
            if(nb.innerText > 1) {
                nb.innerText = parseInt(nb.innerText) - 1;
            }
        }

        centering.appendChild(minus);
        centering.appendChild(nb);
        centering.appendChild(plus);

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
        if(!API.getBasket()) {
            document.cookie = "basket={}"
        }

        const basket = API.getBasket();
        const parsedBasket = JSON.parse(basket);
        if(parsedBasket[this.id]) {
            parsedBasket[this.id] += nb;
        } else {
            parsedBasket[this.id] = nb;
        }

        document.cookie = `basket=${JSON.stringify(parsedBasket)}`;
    }
}