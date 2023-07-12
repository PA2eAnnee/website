import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class EditEventForm extends Form {
    description;
    type;
    max_members;
    price;
    id;
    start_date;
    end_date;
    list;

    constructor(container, buttonText, description, type, max_members, price, id, start_date, end_date, ctx, list) {
        super(container, buttonText);
        this.description = description;
        this.type = type;
        this.max_members = max_members;
        this.price = price;
        this.id = id;
        this.start_date = start_date;
        this.end_date = end_date;
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
                case "type":
                    if(input.value !== this.type) {
                        toSend.type = input.value;
                    }
                    break;
                case "max_members":
                    if(input.value !== this.max_members) {
                        toSend.max_members = input.value;
                    }
                    break;
                case "price":
                    if(input.value !== this.price) {
                        toSend.price = input.value;
                    }
                    break;
                case "start_date":
                    if(input.value !== this.start_date) {
                        toSend.start_date = input.value;
                    }
                    break;
                case "end_date":
                    if(input.value !== this.end_date) {
                        toSend.end_date = input.value;
                    }
                    break;    
            }
        }
        if(Object.keys(toSend).length > 0) {
            API.updateEvents(this.id, toSend).then(() => {
                this.ctx.destroy();
                if(toSend.description) {
                    this.description = toSend.description;
                    this.list.updateListElem('description', toSend.description, this.id);
                }
                if(toSend.type) {
                    this.type = toSend.type;
                    this.list.updateListElem('type', toSend.type, this.id);
                }
                if(toSend.max_members) {
                    this.max_members = toSend.max_members;
                    this.list.updateListElem('max_members', toSend.max_members, this.id);
                }
                if(toSend.price) {
                    this.price = toSend.price;
                    this.list.updateListElem('price', toSend.price, this.id);
                }
                if(toSend.start_date) {
                    this.start_date = toSend.start_date;
                    this.list.updateListElem('start_date', toSend.start_date, this.id);
                }
                if(toSend.end_date) {
                    this.end_date = toSend.end_date;
                    this.list.updateListElem('end_date', toSend.end_date, this.id);
                }
                
            }).catch(error => {
                console.log(error);
            })
        }
    }

}