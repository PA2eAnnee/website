import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class LoginForm extends Form {
    constructor(container, buttonText) {
        super(container, buttonText);
    }

    send() {
        let email;
        let password;
        for(const input of this.inputs) {
            if(input.name === "email") {
                email = input.value;
            }
            if(input.name === "password") {
                password = input.value;
            }
        }

        if(API.login(email, password)) {
            window.location.href = '../../../backend.html';
        }
    }
}