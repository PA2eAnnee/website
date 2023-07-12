import {List} from "../global/List.js";
import {TicketRow} from "./TicketRow.js";
import {API} from "../global/API.js";

export class TicketList extends List {
    nameToThead = new Map();
    constructor() {
        super();
        super.setCategs(["In stock", "Not available"]);
        super.setTheads(["<input type='checkbox' name='select-all' id='select-all' class='list-checkbox'>", "Title", "Description", "Creation Date", "Action"]);
        this.nameToThead.set('title', 'Title');
        this.nameToThead.set('description', 'Description');
        this.nameToThead.set('creationDate', 'Creation date');

        this.getTickets();
    }

    async getTickets() {
        const tickets = await API.getTickets();
        tickets.forEach(ticket => {
            const ticketR = new TicketRow(ticket.id, this);
            ticketR.generate(ticket.title, ticket.description, ticket.creation_date);
            super.addToList(ticketR);
        })
        this.display();
    }

    updateListElem(elem, value, id) {
        const row = document.getElementById(id);
        const idx = this.theads.indexOf(this.nameToThead.get(elem));
        row.getElementsByTagName('td')[idx].innerText = value;

    }
}