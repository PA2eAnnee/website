import { LoginPopup } from "./backend/backend-layouts/js/users/LoginPopup.js";

window.testpopup = () => {
    const popup = new LoginPopup;
    popup.generate();
}