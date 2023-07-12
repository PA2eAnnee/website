import { Popup } from "../global/Popup.js";
import { EditFormationForm } from "./EditFormationForm.js";

export class EditFormationPopup extends Popup {
    name;
    description;
    id;
    list;

    constructor(name, description ,id, list) {
        super();
        this.name = name;
        this.description = description;
        this.id = id;
        this.list = list;
    }
    generate() {
        const formContainer = document.createElement("form");
        const popupTitle = document.createElement("h2");
        popupTitle.innerText=`Edit ${this.description}`;
        formContainer.appendChild(popupTitle);
        const loginForm = new EditFormationForm(formContainer,"Update", this.name, this.description, this, this.id, this.list);

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

        loginForm.setInputs(inputs);
        loginForm.display();

        super.generate(formContainer);
    }
}