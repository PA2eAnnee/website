import { LoginPopup } from "./backend/backend-layouts/js/users/LoginPopup.js";
const login = () => {
    const popup = new LoginPopup;
    popup.generate();
}
window.login = login;