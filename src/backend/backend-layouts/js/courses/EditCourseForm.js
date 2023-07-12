import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class EditCourseForm extends Form {
    name;
    description;
    price;
    type;
    start_date;
    id;
    list;

    constructor(container, buttonText, name, description, price, type, start_date, ctx, id, list) {
        super(container, buttonText);
        this.name = name;
        this.description = description;
        this.price = price;
        this.type = type;
        this.start_date = start_date;
        this.ctx = ctx;
        this.id = id;
        this.list = list;
    }

    send() {
        let toSend = {};
        for(const input of this.inputs) {
            switch(input.name) {
                case "name":
                    if(input.value !== this.name) {
                        toSend.name = input.value;
                    }
                    break;
                case "description":
                    if(input.value !== this.description) {
                        toSend.description = input.value;
                    }
                    break;
                case "price":
                    if(input.value !== this.price) {
                        toSend.price = input.value;
                    }
                    break;
                case "type":
                    if(input.value !== this.type) {
                        toSend.type = input.value;
                    }
                    break;
                case "start_date":
                    if(input.value !== this.start_date) {
                        toSend.start_date = input.value;
                    }
                    break;                
            }
        }
        if(Object.keys(toSend).length > 0) {
            API.updateCourses(this.id, toSend).then(() => {
                this.ctx.destroy();
                if(toSend.name) {
                    this.name = toSend.name;
                    this.list.updateListElem('name', toSend.name, this.id);
                }
                if(toSend.description) {
                    this.description = toSend.description;
                    this.list.updateListElem('description', toSend.description, this.id);
                }
                if(toSend.price) {
                    this.price = toSend.price;
                    this.list.updateListElem('price', toSend.price, this.id);
                }
                if(toSend.type) {
                    this.type = toSend.type;
                    this.list.updateListElem('type', toSend.type, this.id);
                }
                if(toSend.start_date) {
                    this.start_date = toSend.start_date;
                    this.list.updateListElem('start_date', toSend.start_date, this.id);
                }
                
            }).catch(error => {
                console.log(error);
            })
        }
    }

}