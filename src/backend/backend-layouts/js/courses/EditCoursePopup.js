import { Popup } from "../global/Popup.js";
import { EditCourseForm } from "./EditCourseForm.js";

export class EditCoursePopup extends Popup {
    name;
    description;
    price;
    type;
    start_date;
    id;
    list;

    constructor(name, description, price, type, start_date, id, list) {
        super();
        this.name = name;
        this.description = description;
        this.price = price;
        this.type = type;
        this.start_date = start_date;
        this.id = id;
        this.list = list;
    }
    generate() {
        const formContainer = document.createElement("form");
        const popupTitle = document.createElement("h2");
        popupTitle.innerText=`Edit ${this.description}`;
        formContainer.appendChild(popupTitle);
        const loginForm = new EditCourseForm(formContainer,"Update", this.name, this.description, this.price, this.type, this.start_date , this, this.id, this.list);

        const inputs = [];

        inputs.push({
            name: "name",
            placeholder: "name",
            type: "text",
            value: this.name,
            required: true,

        });
        inputs.push({
            name: "description",
            placeholder: "description",
            type: "text",
            value: this.description,
            required: true
        });
        inputs.push({
            name: "price",
            placeholder: "price",
            type: "number",
            value: this.price,
            required: true
        });
        inputs.push({
            name: "type",
            placeholder: "type",
            type: "text",
            value: this.type,
            required: true
        });
        inputs.push({
            name: "start_date",
            placeholder: "start_date",
            type: "date",
            value: this.start_date,
            required: true
        });

        loginForm.setInputs(inputs);
        loginForm.display();

        super.generate(formContainer);
    }
}