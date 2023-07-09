import { Form } from "./global/Form.js";
import { API } from "./global/API.js";

window.onload = () => {
    const form = new Form(document.getElementsByTagName("form") [0], "Je m'inscris", API.login);

    const inputs = [];

    inputs.push({
        name: "first_name",
        placeholder:"Prénom",
        type: "name",
        required: true
    });
    inputs.push({
        name: "name",
        placeholder: "Nom",
        type: "name",
        required: true
    });
    inputs.push({
        name: "username",
        placeholder: "Pseudo",
        type: "name",
        required: true
    });
    inputs.push({
        name: "email",
        placeholder: "Adresse mail",
        type: "email",
        required: true
    });
    
    inputs.push({name: "password", placeholder: "Mot de passe", type: "password", required: true});
    inputs.push({name: "password_confirm", placeholder: "Confirmation du mot de passe", type: "password", required: true});

    form.setInputs(inputs);
    form.display();
}