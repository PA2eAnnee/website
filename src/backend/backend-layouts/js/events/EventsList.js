import { List } from "../global/List.js";
import { EventRow } from "./EventRow.js";
import { API } from "../global/API.js";

export class EventList extends List {
    nameToThead = new Map();
    constructor() {
        super();
        super.setCategs(["Admin", "User", "Chef"]);
        super.setTheads(["<input type='checkbox' name='select-all' id='select-all' class='list-checkbox'>","Description", "Type", "Max members", "Price", "Start date", "End date", "Action"]);
        this.nameToThead.set('description', 'Description');
        this.nameToThead.set('type', 'Type');
        this.nameToThead.set('max_members', 'Max members');
        this.nameToThead.set('price', 'Price');
        this.nameToThead.set('start_date', 'Start date');
        this.nameToThead.set('end_date', 'End date');
        this.getEvents();
    }

    async getEvents() {
        const events = await API.getEvents();
        events.forEach(event => {
            const eventR = new EventRow(event.id, this);
            eventR.generate(event.description , event.type, event.max_members , event.price , event.start_date , event.end_date);
            super.addToList(eventR);
        })
        this.display();
    }

    updateListElem(elem, value, id) {
        const row = document.getElementById(id);
        const idx = this.theads.indexOf(this.nameToThead.get(elem));
        row.getElementsByTagName('td')[idx].innerText = value;

    }
}