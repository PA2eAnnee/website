import {Cards} from "../global/Cards.js";
import {API} from "../global/API.js";
import {EventCard} from "./EventCard.js";

export class EventCards extends Cards {
    mine;
    constructor(container, profile, past) {
        super(container);
        this.profile = profile;
        this.past = past;
        this.getEvents();
    }

    async getEvents() {
        let events;
        if(this.profile) {
            events = await API.getMyEvents();
        } else {
            events = await API.getEvents();
        }

        const toShowEvents = [];
        events.forEach(event => {
            if(this.profile && attendings.includes(event) || !this.profile && API.getRole() == "COOKER" && event.status == "WAITING" || !this.profile && API.getRole() == "USER" && event.status == "PUBLISH"){
                if(this.past && new Date(event.start_date) < Date.now()) {
                    toShowEvents.push(event);
                } else if(!this.past && new Date(event.start_date) >= Date.now()){
                    toShowEvents.push(event);
                }
            }
        });
        toShowEvents.forEach(event => {
            this.addElem(new EventCard(event.description, event.type, event.start_date, event.end_date, event.id, this));
        });
        this.display();
    }
}