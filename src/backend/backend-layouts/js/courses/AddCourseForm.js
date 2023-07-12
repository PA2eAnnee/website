import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class AddCourseForm extends Form {

    constructor() {
        const container = document.getElementsByTagName("form")[0];
        const buttonText = "Create course";
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
            name: "price",
            placeholder: "Price",
            type: "number",
            required: true
        });

        inputs.push({
            name: "type",
            placeholder: "Type",
            type: "text",
            required: true
        });

        inputs.push({
            name: "course_date",
            placeholder: "Course Date",
            type: "date",
            required: true
        });
        this.setInputs(inputs);
        this.display();
    }

    send() {
        let toSend = {};
        let date;
        for(const input of this.inputs) {
            switch(input.name) {
                case "name":
                    toSend.name = input.value;
                    break;
                case "description":
                    toSend.description = input.value;
                    break;
                case "price":
                    toSend.price = input.value;
                    break;
                case "type":
                    toSend.type = input.value;
                    break;
                case "course_date":
                    date = new Date(input.value);
                    break;
            }
        }
        
        API.addCourse(toSend).then(() => {
            console.log("ok");
        }).catch((e) => {
            console.log(e);
        })
        console.log("ok");
        }


}