import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class AddTicketForm extends Form {

    constructor() {
        const container = document.getElementsByTagName("form")[0];
        const buttonText = "Create ticket";
        super(container, buttonText);
        this.inPopup = false;
        const inputs = [];
        inputs.push({
            name: "title",
            placeholder: "title",
            type: "text",
            required: true
        });
        inputs.push({
            name: "description",
            placeholder: "description",
            type: "text",
            required: true
        });
        this.setInputs(inputs);
        this.display();
        API.getMessages().then((sites) => {
            const selectSite = document.createElement("select");
            selectSite.id = "select-site";
            for(const site of sites) {
                const option = document.createElement("option");
                option.value = site.id;
                option.innerText = site.address;
                selectSite.appendChild(option);
            }
            const form = document.getElementsByTagName("form")[0];
            form.insertBefore(selectSite, form.getElementsByTagName("button")[0]);
        })
    }

    send() {
        // Create a new Date object
        const today = new Date();

        // Get the individual components of the date
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Months are zero-based, so add 1
        const day = today.getDate();

        // Format the date as desired (e.g., YYYY-MM-DD)
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        let toSend = {};
        for(const input of this.inputs) {
            switch(input.name) {
                case "title":
                    toSend.title = input.value;
                    break;
                case "description":
                    toSend.description = input.value;
                    break;
                case "creation_date":
                    toSend.creation_date = formattedDate;
                    break;
            }
        }
        
        API.addTicket(toSend).then(() => {
            console.log("ok");
        }).catch((e) => {
            console.log(e);
        })
        console.log("ok");
        }


}