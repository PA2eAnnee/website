import { Popup } from "../global/Popup.js";
import { EditSiteForm } from "./EditSiteForm.js";

export class EditSitePopup extends Popup {
    address;
    postcode;
    id;
    list;

    constructor(address, postcode ,id, list) {
        super();
        this.address = address;
        this.postcode = postcode;
        this.id = id;
        this.list = list;
    }
    generate() {
        const formContainer = document.createElement("form");
        const popupTitle = document.createElement("h2");
        popupTitle.innerText=`Edit ${this.description}`;
        formContainer.appendChild(popupTitle);
        const loginForm = new EditSiteForm(formContainer,"Update", this.address, this.postcode, this, this.id, this.list);

        const inputs = [];

        inputs.push({
            name: "address",
            placeholder: "address",
            type: "text",
            value: this.address,
            required: true,

        });
        inputs.push({
            name: "postcode",
            placeholder: "postcode",
            type: "number",
            value: this.postcode,
            required: true
        });

        loginForm.setInputs(inputs);
        loginForm.display();

        super.generate(formContainer);
    }
}