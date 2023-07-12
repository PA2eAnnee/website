export class QuantityPicker {
    quantityPicker;
    value;
    constructor(min, max, qt, callbackPlus, callbackMinus) {
        this.quantityPicker = document.createElement("div");
        this.quantityPicker.classList.add("qtt-container");
        const nb = document.createElement("p");
        nb.innerText = qt;
        nb.id = "nb";

        const plus = document.createElement("img");
        plus.classList.add("qtt-icon");
        plus.src = "../../img/plus.svg";
        plus.onclick = () => {
            if(nb.innerText < max) {
                nb.innerText = parseInt(nb.innerText) + 1;
                this.value += 1;
                if(callbackPlus) {
                    callbackPlus();
                }
            }
        }

        const minus = document.createElement("img");
        minus.classList.add("qtt-icon");
        minus.src = "../../img/minus.svg";
        minus.onclick = () => {
            if(nb.innerText > min) {
                this.value -= 1;
                nb.innerText = parseInt(nb.innerText) - 1;
                if(callbackMinus) {
                    callbackMinus();
                }
            }
        }
        this.quantityPicker.appendChild(minus);
        this.quantityPicker.appendChild(nb);
        this.quantityPicker.appendChild(plus);
    }

    getPicker() {
        return this.quantityPicker;
    }

    getValue() {
        return this.value;
    }
}