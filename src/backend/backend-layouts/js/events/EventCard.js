import {Card} from "../global/Card.js";
import {API} from "../global/API.js";

export class EventCard extends Card {
    id;
    list;
    constructor(description, type, start_date, end_date, id, attendings, list) {
        super();
        this.id = id;
        this.list = list;
        this.attributes.push({tag: "h2", value: description, CssClass: ""});
        this.attributes.push({tag: "h4", value: type, CssClass: ""});
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const day = startDate.getDate();
        const month = startDate.getMonth();
        const year = startDate.getFullYear();
        const startHour = startDate.getHours();
        const startMinutes = startDate.getMinutes();
        const endHours = endDate.getHours();
        const endMinutes = endDate.getMinutes();
        this.attributes.push({tag: "h5", value: `${day}/${month}/${year}       ${startHour}:${startMinutes} | ${endHours}:${endMinutes}`, CssClass: ""});
        let attended = false;
        for(const attending of attendings) {
            if(attending.id === this.id) {
                this.attributes.push({tag: "button", value: "leave", CssClass: "", onclick: () => {
                    API.leaveEvent(this.id).then(() => {
                        list.getElementById(id).getElementsbyTagName("button")[0].innerText = "join";
                    })
                }});
                attended = true;
            }
        }
        if(!attended) {
            this.attributes.push({tag: "button", value: "join", CssClass: "", onclick: () => {
                API.joinEvent(this.id).then(() => {
                    list.getElementById(id).getElementsbyTagName("button")[0].innerText = "leave";
                })
            }});
        }
        this.generate("card-event", "event-profile");
    }
}