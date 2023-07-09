import {Card} from "../global/Card.js";

export class EventCard extends Card {
    constructor(description, type, start_date, end_date) {
        super();
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
        this.generate("card-event", "event-profile");
    }
}