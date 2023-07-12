import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class EditTicketForm extends Form {
    title;
    description;
    creationDate;
    id;
    list;

    constructor(container, buttonText, title, description, creationDate, ctx, id, list) {
        super(container, buttonText);
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.ctx = ctx;
        this.id = id;
        this.list = list;
    }

    send() {
        let toSend = {};
        for(const input of this.inputs) {
            switch(input.name) {
                case "title":
                    if(input.value !== this.title) {
                        toSend.title = input.value;
                    }
                    break;
                case "description":
                    if(input.value !== this.description) {
                        toSend.description = input.value;
                    }
                    break;  
                case "creationDate":
                    if(input.value !== this.creationDate) {
                        toSend.creationDate = input.value;
                    }
                    break; 
            }
        }
        if(Object.keys(toSend).length > 0) {
            API.updateTickets(this.id, toSend).then(() => {
                this.ctx.destroy();
                if(toSend.title) {
                    this.title = toSend.title;
                    this.list.updateListElem('title', toSend.title, this.id);
                }
                if(toSend.description) {
                    this.description = toSend.description;
                    this.list.updateListElem('description', toSend.description, this.id);
                }
                if(toSend.creationDate) {
                    this.creationDate = toSend.creationDate;
                    this.list.updateListElem('creationDate', toSend.creationDate, this.id);
                }
                
            }).catch(error => {
                console.log(error);
            })
        }
    }

}