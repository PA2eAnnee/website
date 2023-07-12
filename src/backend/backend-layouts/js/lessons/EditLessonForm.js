import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class EditLessonForm extends Form {
    name;
    description;
    id;
    ctx;
    list;

    constructor(container, buttonText, name, description, ctx, id, list) {
        super(container, buttonText);
        this.name = name;
        this.description = description;
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
            }
        }
        if(Object.keys(toSend).length > 0) {
            API.updateLessons(this.id, toSend).then(() => {
                this.ctx.destroy();
                if(toSend.name) {
                    this.name = toSend.name;
                    this.list.updateListElem('name', toSend.name, this.id);
                }
                if(toSend.description) {
                    this.description = toSend.description;
                    this.list.updateListElem('description', toSend.description, this.id);
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

}