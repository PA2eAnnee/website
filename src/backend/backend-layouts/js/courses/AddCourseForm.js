import {Form} from '../global/Form.js';
import {API} from '../global/API.js';
import {PaymentPopup} from '../shop/PaymentPopup.js';

export class AddCourseForm extends Form {

    constructor() {
        const container = document.getElementsByTagName("form")[0];
        const buttonText = "Create course";
        super(container, buttonText);
        this.inPopup = false;
        const inputs = [];
        inputs.push({
            name: "name",
            placeholder: "Name",
            type: "text",
            required: true
        });

        inputs.push({
            name: "description",
            placeholder: "Description",
            type: "text",
            required: true
        });

        inputs.push({
            name: "course_date",
            placeholder: "Course Date",
            type: "date",
            required: true
        });

        inputs.push({
            name: "start_hour",
            placeholder: "Start Hour",
            type: "time",
            required: true
        })

        inputs.push({
            name: "nb_hour",
            placeholder: "Hours",
            type: "number",
            required: true
        })

        this.setInputs(inputs);
        this.display();
        const radioDiv = document.createElement("div");
        radioDiv.style.display = "flex";
        radioDiv.style.display = "align-items";
        const radioHome = document.createElement("input");
        radioHome.type = "radio";
        radioHome.name = "type";
        radioHome.value = "home";
        radioHome.id = "radio-home";
        const radioHomeLabel = document.createElement("label");
        radioHomeLabel.setAttribute("for", "radio-home");
        radioHomeLabel.innerText = "At home";
        const radioDist = document.createElement("input");
        radioDist.type="radio";
        radioDist.name = "type";
        radioDist.value = "home";
        radioDist.id = "radio-dist";
        const radioDistLabel = document.createElement("label");
        radioDistLabel.setAttribute("for", "radio-dist");
        radioDistLabel.innerText = "Distance lesson";
        radioDiv.appendChild(radioHome);
        radioDiv.appendChild(radioHomeLabel);
        radioDiv.appendChild(radioDist);
        radioDiv.appendChild(radioDistLabel);
        this.container.insertBefore(radioDiv, document.getElementById("name"));

    }

    send() {
        let toSend = {};
        let date;
        let startHour;
        let nbHour;
        for(const input of this.inputs) {
            switch(input.name) {
                case "name":
                    toSend.name = input.value;
                    break;
                case "description":
                    toSend.description = input.value;
                    break;
                case "course_date":
                    date = new Date(input.value);
                    break;
                case "start_hour":
                    startHour = input.value.split(":");
                    break;
                case "nb_hour":
                    nbHour = input.value;
                    break;
            }
        }
        
        const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour[0], startHour[1]);
        const endDate = new Date(startDate.getTime() + (nbHour * 60 * 60 * 1000));
      
        const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')} ${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}:${startDate.getSeconds().toString().padStart(2, '0')}`;
        const formattedEndDate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')} ${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}:${endDate.getSeconds().toString().padStart(2, '0')}`;
      
        toSend.course_date = formattedStartDate;
        toSend.course_enddate = formattedEndDate;

        const radios = document.getElementsByName("type");
        for(const radio of radios) {
            if(radio.checked) {
                toSend.type = radio.value;
            }
        }

        toSend.user_id = API.getId();
        API.addCourse(toSend).then((price) => {
            document.cookie = `type_order=course;path=/`;
            document.cookie = `total_order=${parseInt(price)};path=/`;
            const paymentPopup = new PaymentPopup();
            paymentPopup.generate();
        }).catch((e) => {
            console.log(e);
        })
        }


}