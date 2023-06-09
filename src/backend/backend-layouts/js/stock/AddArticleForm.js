import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class AddArticleForm extends Form {

    constructor() {
        const container = document.getElementsByTagName("form")[0];
        const buttonText = "Create article";
        super(container, buttonText);
        this.inPopup = false;
        const inputs = [];
        inputs.push({
            name: "description",
            placeholder: "Description",
            type: "text",
            required: true
        });

        inputs.push({
            name: "stock",
            placeholder: "Stock",
            type: "number",
            required: true
        });

        inputs.push({
            name: "price",
            placeholder: "Price",
            type: "number",
            required: true
        });

        inputs.push({
            name: "picture",
            placeholder: "Picture",
            type: "text",
            required: true
        });
        this.setInputs(inputs);
        this.display();
    }

    send() {
        let toSend = {};
        for(const input of this.inputs) {
            switch(input.name) {
                case "description":
                    toSend.description = input.value;
                    break;
                case "stock":
                    toSend.stock = input.value;
                    break;
                case "price":
                    toSend.price = input.value;
                    break;
                case "picture":
                    toSend.picture = input.value;
                    break;
            }
        }
        
        API.addArticle(toSend).then(() => {
            console.log("ok");
        }).catch((e) => {
            console.log(e);
        })
        console.log("ok");
        }


}