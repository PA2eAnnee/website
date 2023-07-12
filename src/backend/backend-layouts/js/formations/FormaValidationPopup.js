import {Popup} from "../global/Popup.js";
import {API} from "../global/API.js";

export class FormaValidationPopup extends Popup {
    degree;
    constructor(degree) {
        super();
        this.degree = degree;
        this.validate();
    }

    async validate() {
        const coursesValidation = await API.getCourses({user_id: API.getId()});
        const eventValidation = await API.getEvents({id_user: API.getId()});
        const lessonsValidation = await API.getParticipateLessons({user_id: API.getId()});
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.padding = "10%";
        const p = document.createElement("p");

        if(coursesValidation.length >= this.degree * 5 && eventValidation.length >= this.degree * 5 && lessonsValidation.length >= this.degree * 5) {
            console.log("ok");
            let txt;
            switch(this.degree) {
                case 1:
                    txt = "Starter";
                    break;
                case 2:
                    txt = "Beginner";
                    break;
                case 3:
                    txt = "Master";
                    break;
            }

            p.innerText = "Bien joué vous avez validé le diplome " + txt;
            div.appendChild(p);
            this.generate(div);
        } else {
            p.innerText = "Vous n'avez pas les attributs pour valider la formation";
            div.appendChild(p);
            this.generate(div);
        }
    }
}