import { Popup } from "../global/Popup.js";
import { EditTicketForm } from "./EditTicketForm.js";

export class EditTicketPopup extends Popup {
    title;
    description;
    creationDate;
    id;
    list;

    constructor(title, description, creationDate ,id, list) {
        super();
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.id = id;
        this.list = list;
    }
    generate() {
        const formContainer = document.createElement("form");
        const popupTitle = document.createElement("h2");
        popupTitle.innerText=`Edit ${this.description}`;
        formContainer.appendChild(popupTitle);
        const loginForm = new EditTicketForm(formContainer,"Update", this.title, this.description, this.creationDate, this, this.id, this.list);

        const inputs = [];

        inputs.push({
            name: "title",
            placeholder: "title",
            type: "text",
            value: this.title,
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
            name: "creationDate",
            placeholder: "creationDate",
            type: "timedate",
            value: this.creationDate,
            required: true
        });

        loginForm.setInputs(inputs);
        loginForm.display();

        super.generate(formContainer);
    }
}