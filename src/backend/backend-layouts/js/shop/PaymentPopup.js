import {Popup} from "../global/Popup.js";
import {API} from "../global/API.js";

export class PaymentPopup extends Popup{
    price;

    constructor() {
        super();
        this.price = API.getTotalBasket();
        console.log(this.price);
    }

    generate() {
        const content = document.createElement("iframe");
        content.src = "../../../../pages/payment/pay.html";
        super.generate(content);
    }
}