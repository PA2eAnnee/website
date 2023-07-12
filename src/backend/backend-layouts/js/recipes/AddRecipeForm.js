import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class AddRecipeForm extends Form {

    constructor() {
        const container = document.getElementsByTagName("form")[0];
        const buttonText = "Create recipe";
        super(container, buttonText);
        this.inPopup = false;
        const inputs = [];
        inputs.push({
            name: "name",
            placeholder: "Name",
            type: "text",
            required: true
        });

        inputs.push({
            name: "description",
            placeholder: "Description",
            type: "text",
            required: true
        });

        inputs.push({
            name: "duration",
            placeholder: "Duration",
            type: "number",
            required: true
        });

        inputs.push({
            name: "complexitylevel",
            placeholder: "ComplexityLevel",
            type: "text",
            required: true
        });

        inputs.push({
            name: "video",
            placeholder: "video",
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
                case "duration":
                    toSend.duration = input.value;
                    break;
                case "complexitylevel":
                    toSend.complexityLevel = input.value;
                    break;
                case "video":
                    toSend.video = input.value;
                    break;
            }
        }
        
        API.addRecipe(toSend).then(() => {
            console.log("ok");
        }).catch((e) => {
            console.log(e);
        })
        console.log("ok");
        }


}