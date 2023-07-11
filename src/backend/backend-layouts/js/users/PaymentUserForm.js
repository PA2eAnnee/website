import {Form} from "../global/Form.js";
import {API} from "../global/API.js";

export class PaymentUserForm extends Form {
        constructor(container, buttonText) {
            super(container, buttonText);
            this.inPopup = false;
            const inputs = [];

            

            inputs.push({
                name: "name",
                placeholder: "Nom",
                type: "name",
                value: 
                
            })
        }
}