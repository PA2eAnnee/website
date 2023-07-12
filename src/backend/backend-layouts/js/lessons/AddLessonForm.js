import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class AddLessonForm extends Form {

    constructor() {
        const container = document.getElementsByTagName("form")[0];
        const buttonText = "Create lesson";
        super(container, buttonText);
        this.inPopup = false;
        const inputs = [];
        inputs.push({
            name: "name",
            placeholder: "name",
            type: "text",
            required: true
        });

        inputs.push({
            name: "description",
            placeholder: "description",
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
                case "name":
                    toSend.name = input.value;
                    break;
                case "description":
                    toSend.description = input.value;
                    break;
            }
        }
        
        API.addLesson(toSend).then(() => {
            console.log("ok");
        }).catch((e) => {
            console.log(e);
        })
        console.log("ok");
        }


}