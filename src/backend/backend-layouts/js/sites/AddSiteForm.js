import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class AddSiteForm extends Form {

    constructor() {
        const container = document.getElementsByTagName("form")[0];
        const buttonText = "Create site";
        super(container, buttonText);
        this.inPopup = false;
        const inputs = [];
        inputs.push({
            name: "address",
            placeholder: "Address",
            type: "text",
            required: true
        });

        inputs.push({
            name: "postcode",
            placeholder: "Post Code",
            type: "number",
            required: true
        });
        this.setInputs(inputs);
        this.display();
    }

    send() {
        let toSend = {};
        for(const input of this.inputs) {
            switch(input.name) {
                case "address":
                    toSend.address = input.value;
                    break;
                case "postcode":
                    toSend.postcode = input.value;
                    break;
            }
        }
        
        API.addSite(toSend).then(() => {
            console.log("ok");
        }).catch((e) => {
            console.log(e);
        })
        console.log("ok");
        }


}