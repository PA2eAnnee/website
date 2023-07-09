import {Popup} from '../global/Popup.js';
import { AddArticleForm } from './AddArticleForm.js';

export class AddArticlePopup extends Popup {
    id;

    constructor(id) {
        super();
        this.id = id;
    }

    generate() {
        const formContainer = document.createElement("form");
        const popupTitle = document.createElement("h2");
        popupTitle.innerText=`Edit ${this.description}`;
        formContainer.appendChild(popupTitle);
        const loginForm = new AddArticleForm(formContainer,"Add", this.id, this, this.list);

        const inputs = [];

        inputs.push({
            name: "description",
            placeholder: "description",
            type: "text",
            required: true,

        });
        inputs.push({
            name: "stock",
            placeholder: "Stock",
            type: "number",
            required: true
        });

        inputs.push({
            name: "price",
            placeholder: "price",
            type: "number",
            required: true
        })

        loginForm.setInputs(inputs);
        loginForm.display();

        super.generate(formContainer);
    }
}