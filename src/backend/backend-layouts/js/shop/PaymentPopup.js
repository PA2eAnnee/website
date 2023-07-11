import {Popup} from "../global/Popup.js";

export class PaymentPopup extends Popup{
    generate() {
        const content = document.createElement("iframe");
        content.src = "../../../../pages/payment/pay.html";
        super.generate(content);
    }
}