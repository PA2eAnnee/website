import {Card} from "../global/Card.js";
import {API} from "../global/API.js";
import {PaymentPopup} from "../shop/PaymentPopup.js";

export class EventCard extends Card {
    id;
    list;
    constructor(description, type, start_date, end_date, id, list) {
        super();
        this.id = id;
        this.list = list;
        this.attributes.push({tag: "h2", value: description, CssClass: ""});
        this.attributes.push({tag: "h4", value: type, CssClass: ""});
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const day = startDate.getDate();
        const month = startDate.getMonth() + 1;
        const year = startDate.getFullYear();
        const startHour = startDate.getHours();
        const startMinutes = startDate.getMinutes();
        const endHours = endDate.getHours();
        const endMinutes = endDate.getMinutes();
        this.attributes.push({tag: "h5", value: `${day}/${month}/${year}       ${startHour}:${startMinutes} | ${endHours}:${endMinutes}`, CssClass: ""});
        if(API.getRole() == "COOKER") {
            API.getEvents({id: this.id, status: "WAITING"}).then(() => {

                this.attributes.push({tag: "button", value: "Organize event", CssClass: "", onclick: () => {
                    API.updateEvents(this.id, {cooker_id: API.getId, status: "PUBLISH"}).then(() => {
                        window.location = '/backend/backend-layouts/home.html';
                    })
                }})
                this.generate("card-event", "event-profile");
            })
        } else if (API.getRole() == "USER"){
            API.getEvents({id:this.id, status: "PUBLISH"}).then((eventInfos) => {
                this.attributes.push({tag: "button", value: "Join", CssClass: "", onclick: () => {
                    document.cookie = "type_order=event;path=/";
                    document.cookie = `total_order=${eventInfos[0].price};path=/`;
                    document.cookie = `event_id=${this.id};path=/`;
                    const paymentPopup = new PaymentPopup();
                    paymentPopup.generate();
                }})
                this.generate("card-event", "event-profile");
            })
        }
    }
}