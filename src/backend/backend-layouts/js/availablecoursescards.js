import {CourseCards} from "./courses/CourseCards.js";

window.onload = () => {
    const container = document.getElementsByTagName("main")[0];
    const courseCards = new CourseCards(container, false, false);
}