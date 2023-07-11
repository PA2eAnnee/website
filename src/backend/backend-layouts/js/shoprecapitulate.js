import { PaymentUserForm } from "./shop/PaymentUserForm.js";
import { Recapitulation } from "./shop/Recapitulation.js";

window.onload = () => {
    new PaymentUserForm(document.getElementById("userInfosForm"), "Commander");
    const recap = new Recapitulation(true);
    recap.generate();
}   