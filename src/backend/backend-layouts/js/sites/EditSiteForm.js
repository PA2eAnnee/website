import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class EditSiteForm extends Form {
    address;
    postcode;
    id;
    list;

    constructor(container, buttonText, address, postcode, ctx, id, list) {
        super(container, buttonText);
        this.address = address;
        this.postcode = postcode;
        this.ctx = ctx;
        this.id = id;
        this.list = list;
    }

    send() {
        let toSend = {};
        for(const input of this.inputs) {
            switch(input.name) {
                case "address":
                    if(input.value !== this.address) {
                        toSend.address = input.value;
                    }
                    break;
                case "postcode":
                    if(input.value !== this.postcode) {
                        toSend.postcode = input.value;
                    }
                    break;  
            }
        }
        if(Object.keys(toSend).length > 0) {
            API.updateSites(this.id, toSend).then(() => {
                this.ctx.destroy();
                if(toSend.address) {
                    this.address = toSend.address;
                    this.list.updateListElem('address', toSend.address, this.id);
                }
                if(toSend.postcode) {
                    this.postcode = toSend.postcode;
                    this.list.updateListElem('postcode', toSend.postcode, this.id);
                }
                
            }).catch(error => {
                console.log(error);
            })
        }
    }

}