import {Cards} from "../global/Cards.js";
import {API} from "../global/API.js";
import {EventCard} from "./EventCard.js";

export class EventCards extends Cards {
    constructor(container) {
        super(container);
        this.getEvents();
    }

    async getEvents() {
        const events = await API.getEvents();
        const publishedEvents = [];
        for(const event of events) {
            if(event.status === "PUBLISH") {
                publishedEvents.push(event);
            }
        }
        publishedEvents.forEach(event => {
            this.addElem(new EventCard(event.description, event.type, event.start_date, event.end_date));
        });
        this.display();
    }
}