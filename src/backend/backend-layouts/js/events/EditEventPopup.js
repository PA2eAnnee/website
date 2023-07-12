import { Popup } from "../global/Popup.js";
import { EditEventForm } from "./EditEventForm.js";

export class EditEventPopup extends Popup {
    description;
    type;
    max_members;
    price;
    start_date;
    end_date;
    id;
    list;

    constructor(description, type, max_members, price, start_date, end_date ,id, list) {
        super();
        this.description = description;
        this.type = type;
        this.max_members = max_members;
        this.price = price;
        this.start_date = start_date;
        this.end_date = end_date;
        this.id = id;
        this.list = list;
    }
    generate() {
        const formContainer = document.createElement("form");
        const popupTitle = document.createElement("h2");
        popupTitle.innerText=`Edit ${this.description}`;
        formContainer.appendChild(popupTitle);
        const loginForm = new EditEventForm(formContainer,"Update", this.description, this.type, this.max_members, this.price, this.id, this.start_date, this.end_date, this, this.list);

        const inputs = [];

        inputs.push({
            name: "description",
            placeholder: "description",
            type: "text",
            value: this.description,
            required: true,

        });
        inputs.push({
            name: "type",
            placeholder: "type",
            type: "text",
            value: this.type,
            required: true
        });

        inputs.push({
            name: "max_members",
            placeholder: "max_members",
            type: "number",
            value: this.max_members,
            required: true
        })
        inputs.push({
            name: "price",
            placeholder: "price",
            type: "number",
            value: this.price,
            required: true
        })
        inputs.push({
            name: "start_date",
            placeholder: "start_date",
            type: "date_time",
            value: this.start_date,
            required: true,

        });
        inputs.push({
            name: "end_date",
            placeholder: "end_date",
            type: "date_time",
            value: this.end_date,
            required: true,

        });

        loginForm.setInputs(inputs);
        loginForm.display();

        super.generate(formContainer);
    }
}