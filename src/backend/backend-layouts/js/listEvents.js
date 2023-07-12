import { EventList } from "./events/EventsList.js";

window.onload = () => {
    const eventList = new EventList();
    eventList.container = document.getElementsByTagName("main")[0];
}