import { Popup } from "../global/Popup.js";
import { EditRecipeForm } from "./EditRecipeForm.js";

export class EditRecipePopup extends Popup {
    name;
    description;
    duration;
    complexityLevel;
    video;
    id;
    list;

    constructor(name, description, duration, complexityLevel, video ,id, list) {
        super();
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.complexityLevel = complexityLevel;
        this.video = video;
        this.id = id;
        this.list = list;
    }
    generate() {
        const formContainer = document.createElement("form");
        const popupTitle = document.createElement("h2");
        popupTitle.innerText=`Edit ${this.description}`;
        formContainer.appendChild(popupTitle);
        const loginForm = new EditRecipeForm(formContainer,"Update", this.name, this.description, this.duration, this.complexityLevel, this.video, this, this.id, this.list);

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
            required: true,

        });
        inputs.push({
            name: "duration",
            placeholder: "duration",
            type: "number",
            value: this.duration,
            required: true
        });

        inputs.push({
            name: "complexityLevel",
            placeholder: "complexityLevel",
            type: "text",
            value: this.complexityLevel,
            required: true
        })
        inputs.push({
            name: "video",
            placeholder: "video",
            type: "text",
            value: this.video,
            required: true
        })

        loginForm.setInputs(inputs);
        loginForm.display();

        super.generate(formContainer);
    }
}