import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class EditArticleForm extends Form {
    description;
    stock;
    price;
    id;
    ctx;
    list;

    constructor(container, buttonText, description, stock, price, id, ctx, list) {
        super(container, buttonText);
        this.description = description;
        this.stock = stock;
        this.price = price;
        this.id = id;
        this.ctx = ctx;
        this.list = list;
    }

    send() {
        let toSend = {};
        for(const input of this.inputs) {
            switch(input.name) {
                case "description":
                    if(input.value !== this.description) {
                        toSend.description = input.value;
                    }
                    break;
                case "stock":
                    if(input.value !== this.stock) {
                        toSend.stock = input.value;
                    }
                    break;
                case "price":
                    if(input.value !== this.price) {
                        toSend.price = input.value;
                    }
                    break;
            }
        }
        if(Object.keys(toSend).length > 0) {
            API.updateArticles(this.id, toSend).then(() => {
                this.ctx.destroy();
                if(toSend.description) {
                    this.description = toSend.description;
                    this.list.updateListElem('description', toSend.description, this.id);
                }
                if(toSend.stock) {
                    this.stock=toSend.stock;
                    this.list.updateListElem('stock', toSend.stock, this.id);
                }
                if(toSend.price) {
                    this.price=toSend.price;
                    this.list.updateListElem('price', toSend.price, this.id);
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

}