import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class AddArticleForm extends Form {
    ctx;
    list;

    constructor(container, buttonText, ctx, list) {
        super(container, buttonText);
        this.ctx = ctx;
        this.list = list;
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
            }
        }

        API.addArticle(toSend);
    }
}