import {Popup} from "./Popup.js";

export class ConfirmDeletePopup extends Popup {
    callback;
    constructor(callback) {
        super();
        this.callback = callback;
    }

    generate() {
        const content = document.createElement("div");
        const sure = document.createElement("h1");
        sure.innerText = "Are you sure you want to delete ?";
        content.appendChild(sure);
        const yesBtn = document.createElement("button");
        yesBtn.innerText = "Yes";
        yesBtn.onclick = () => {
            if(this.callback()) {
                this.destroy()
            }
        };
        const noBtn = document.createElement("button");
        noBtn.innerText = "No";
        noBtn.onclick = () => this.destroy();
        content.appendChild(yesBtn);
        content.appendChild(noBtn);
        super.generate(content);
    }
}