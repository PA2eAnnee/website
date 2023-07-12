import { TicketList } from "./tickets/TicketsList.js";

window.onload = () => {
    const ticketList = new TicketList();
    ticketList.container = document.getElementsByTagName("main")[0];
}