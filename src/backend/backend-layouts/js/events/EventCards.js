import {Cards} from "../global/Cards.js";
import {API} from "../global/API.js";
import {EventCard} from "./EventCard.js";

export class EventCards extends Cards {
    mine;
    constructor(container, mine) {
        super(container);
        if(mine) {
            this.mine = true;
        }
        this.getEvents();
    }

    async getEvents() {
        let events;
        if(this.mine) {
            events = await API.getMyEvents();
        } else {
            events = await API.getEvents();
        }

        const attendings = await API.getMyEvents();
        
        const toShowEvents = [];
        const role = API.getRole();
        for(const event of events) {
            if(event.status === "PUBLISH" && role === "USER" || role === "WORKER" || role === "ADMIN") {
                toShowEvents.push(event);
            }
            if(event.status === "WAITING" && role === "COOKER" || event.organizer == API.getId() || role === "WORKER" || role === "ADMIN") {
                toShowEvents.push(event);
            }
        }
        toShowEvents.forEach(event => {
            this.addElem(new EventCard(event.description, event.type, event.start_date, event.end_date, event.id, attendings, this));
        });
        this.display();
    }
}