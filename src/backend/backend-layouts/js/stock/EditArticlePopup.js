import { Popup } from "../global/Popup.js";
import { EditArticleForm } from "./EditArticleForm.js";

export class EditArticlePopup extends Popup {
    description;
    stock;
    price;
    id;
    list;

    constructor(description, stock, price ,id, list) {
        super();
        this.description = description;
        this.stock = stock;
        this.price = price;
        this.id = id;
        this.list = list;
    }
    generate() {
        const formContainer = document.createElement("form");
        const popupTitle = document.createElement("h2");
        popupTitle.innerText=`Edit ${this.description}`;
        formContainer.appendChild(popupTitle);
        const loginForm = new EditArticleForm(formContainer,"Update", this.description, this.stock, this.price, this.id, this, this.list);

        const inputs = [];

        inputs.push({
            name: "description",
            placeholder: "description",
            type: "text",
            value: this.description,
            required: true,

        });
        inputs.push({
            name: "stock",
            placeholder: "Stock",
            type: "number",
            value: this.stock,
            required: true
        });

        inputs.push({
            name: "price",
            placeholder: "price",
            type: "number",
            value: this.price,
            required: true
        })

        loginForm.setInputs(inputs);
        loginForm.display();

        super.generate(formContainer);
    }
}