import {Form} from '../global/Form.js';
import {API} from '../global/API.js';

export class AddEventForm extends Form {

    constructor() {
        const container = document.getElementsByTagName("form")[0];
        const buttonText = "Create event";
        super(container, buttonText);
        this.inPopup = false;
        const inputs = [];
        inputs.push({
            name: "description",
            placeholder: "Description",
            type: "text",
            required: true
        });

        inputs.push({
            name: "type",
            placeholder: "Type de cuisine",
            type: "name",
            required: true
        });

        inputs.push({
            name: "max_users",
            placeholder: "Maximum de participants",
            type: "number",
            required: true

        });
        inputs.push({
            name: "price",
            placeholder: "Prix d'inscription",
            type: "number",
            required: true
        });
        inputs.push({
            name: "date",
            placeholder: "Date",
            type: "date",
            required: true

        });
        inputs.push({
            name: "start_hour",
            placeholder: "Début",
            type: "time",
            required: true
        });
        inputs.push({
            name: "end_hour",
            placeholder: "Début",
            type: "time",
            required: true
        });
        this.setInputs(inputs);
        this.display();
        API.getRecipe().then((recipes) => {
            console.log(recipes);
            const selectRecipe = document.createElement("select");
            selectRecipe.id = "select-recipe"
            for(const recipe of recipes) {
                const option = document.createElement("option");
                option.value = recipe.ID;
                option.innerText = recipe.Name;
                selectRecipe.appendChild(option);
            }
            const form = document.getElementsByTagName("form")[0];
            form.insertBefore(selectRecipe, form.getElementsByTagName("button")[0]);
        })
        API.getSites().then((sites) => {
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
        let toSend = {};
        let date;
        let startHour;
        let endHour;
        for(const input of this.inputs) {
            switch(input.name) {
                case "description":
                    toSend.description = input.value;
                    break;
                case "type":
                    toSend.type = input.value;
                    break;
                case "max_users":
                    toSend.max_members = input.value;
                    break;
                case "price":
                    toSend.price = input.value;
                    break;
                case "date":
                    date = new Date(input.value);
                    break;
                case "start_hour":
                    startHour = input.value.split(":");
                    break;
                case "end_hour":
                    endHour = input.value.split(":");
                    break;
            }
        }

        toSend.start_date = `${date.toISOString().split("T")[0]} ${startHour[0]}:${startHour[1]}:00`;
        toSend.end_date = `${date.toISOString().split("T")[0]} ${endHour[0]}:${endHour[1]}:00`;
        

        toSend.id_site = document.getElementById("select-site").value;
        toSend.recipe_id = document.getElementById("select-recipe").value;
        
        API.addEvent(toSend).then(() => {
            console.log("ok");
        }).catch((e) => {
            console.log(e);
        })
        console.log("ok");
        }


}