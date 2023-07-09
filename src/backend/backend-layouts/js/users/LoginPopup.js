import {Popup} from '../global/Popup.js';
import {LoginForm} from './LoginForm.js';

export class LoginPopup extends Popup {
    generate() {
        
        const formContainer = document.createElement("form");
        const popupTitle = document.createElement("h2");
        popupTitle.innerText="Connection";
        formContainer.appendChild(popupTitle);
        const loginForm = new LoginForm(formContainer,"Connection");

        const inputs = [];

        inputs.push({
            name: "email",
            placeholder: "Adresse mail",
            type: "email",
            required: true
        });
        inputs.push({
            name: "password",
            placeholder: "Mot de passe",
            type: "password",
            required: true
        });

        loginForm.setInputs(inputs);
        loginForm.display();

        const registerLink = document.createElement("a");
        registerLink.href = '../../../pages/register/register.html';
        registerLink.innerText = "Don't have an account already ?";

        formContainer.insertBefore(registerLink, formContainer.getElementsByTagName("button")[0]);
        super.generate(formContainer);

    }
}