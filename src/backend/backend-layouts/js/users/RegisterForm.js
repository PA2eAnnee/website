import {Form} from "../global/Form.js";
import {API} from "../global/API.js";

export class RegisterForm extends Form {
    constructor() {
        const container = document.getElementsByTagName("form") [0];
        super(container, "Je m'inscris");

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
    
        this.setInputs(inputs);
        this.display();
    }

    send() {
        const toSend = {};
        for(const input of this.inputs) {
            switch (input.name) {
              case "first_name":
                toSend.first_name = input.value;
                break;
              case "name":
                toSend.name = input.value;
                break;
              case "username":
                toSend.username = input.value;
                break;
              case "email":
                toSend.email = input.value;
                break;
              case "password":
                toSend.password = input.value;
                break;
              default:
                // Cas par défaut si le nom de l'input ne correspond à aucun des cas précédents
                break;
            }
          }
          API.register(toSend);
    }
}