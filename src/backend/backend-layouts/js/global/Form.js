export class Form {
    inputs;
    container;
    buttonText;
    inPopup = true;

    constructor(container, buttonText) {
        this.container = container;
        this.buttonText = buttonText;
    }

    display() {
        for(const input of this.inputs) {
            const elem = document.createElement("input");
            const err = document.createElement("div");
            err.id = input.name + "-error";
            input.errDiv = err.id;
            elem.type = input.type;
            elem.name = input.name;
            elem.placeholder = input.placeholder;
            elem.id = input.name;
            if(input.value) {
                elem.value = input.value;
            }

            elem.addEventListener("keydown", (e) => {
                if(e.key ===  "Enter") {
                    this.validate();
                }
            })
            this.container.appendChild(err);
            this.container.appendChild(elem);
        }
        const btn = document.createElement("button");
        btn.innerText = this.buttonText;
        btn.type = "button";
        btn.onclick = () => this.validate();
        this.container.appendChild(btn);
    }

    setInputs(inputs) {
        this.inputs = inputs;
    }

    validate() {
        this.cleanErrors();
        for(const input of this.inputs) {
            if(this.inPopup) {
                input.value = parent.document.getElementById(input.name).value;
            } else {
                input.value = document.getElementById(input.name).value;
            }
            

            if(input.required === true && !input.value) {
                this.addError("Field " + input.placeholder + " is required", input.errDiv);
                return false;
            }

            switch(input.type) {
                case "email" :
                    if(!this.validateEmail(input)) {
                        return false;
                    }
                    break;
                case "password": 
                    if(!this.validatePassword(input)) {
                        return false
                    }
                    break;
            }
        }

        this.send();
    }

    validateEmail(input) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(input.value.match(validRegex)){
            return true;
        }
        this.addError("Email doesn't have a good format", input.errDiv);
        return false
    }

    validatePassword(input) {
        if(input.value.length < 8) {
            this.addError("Password too short", input.errDiv);
            return false;
        }
        const uppercase = input.value.search(/[A-Z]/) < 0;
        const lowercase = input.value.search(/[a-z]/) < 0;
        const number = input.value.search(/[0-9]/) < 0;
        const spechialchars = input.value.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0;

        if(uppercase || lowercase || number || spechialchars) {
            this.addError("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special char", input.errDiv);
            return false;
        }
        return true;
    }
    send() {

    }

    addError(error, containerId) {
        const container = document.getElementById(containerId);
        const errorP = document.createElement("p");
        errorP.classList.add("error");
        errorP.innerText = error;
        container.appendChild(errorP);

    }

    cleanErrors() {
        for(const input of this.inputs) {
            let errDiv;
            if(this.inPopup) {
                errDiv = parent.document.getElementById(input.errDiv);
            } else {
                errDiv = document.getElementById(input.errDiv);
            }
            
            const errors = errDiv.getElementsByClassName("error");
            for(const error of errors) {
                errDiv.removeChild(error);
            }
        }
    }

}