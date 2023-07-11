import {Form} from "../global/Form.js";
import {API} from "../global/API.js";
import { PaymentPopup } from "./PaymentPopup.js";

export class PaymentUserForm extends Form {
        constructor(container, buttonText) {
            super(container, buttonText);
            this.inPopup = false;
            API.getUsers({id: API.getId()}).then((user) => {
                user = user[0];
                const inputs = [];
                inputs.push({
                    name: "name",
                    placeholder: "Nom",
                    type: "name",
                    value: user.name,
                    required: true
                });

                inputs.push({
                    name: "first_name",
                    placeholder: "Prénom",
                    type: "name",
                    value: user.first_name,
                    required: true
                });

                inputs.push({
                    name: "email",
                    placeholder: "Adresse mail",
                    type: "email",
                    value: user.email,
                    required: true
                });
                
                inputs.push({
                    name: "address",
                    placeholder: "Adresse",
                    type: "text",
                    value: user.address,
                    required: true
                });

                inputs.push({
                    name: "address2",
                    placeholder: "Complément d'adresse",
                    type: "text",
                    value: user.address2,
                    required: false
                });

                inputs.push({
                    name: "postal_code",
                    placeholder: "Code postal",
                    type: "text",
                    value: user.code_postal,
                    required: true
                })

                inputs.push({
                    name: "country",
                    placeholder: "Pays",
                    type: "name",
                    value: user.pays,
                    required: true

                })

            this.setInputs(inputs);
            this.display();
            })
        }

        send() {
            const paymentPopup = new PaymentPopup();
            paymentPopup.generate();
        }
}