import {LessonCards} from "./lessons/LessonCards.js";

window.onload = () => {
    const container = document.getElementsByTagName("main")[0];
    const lessonCards = new LessonCards(container);
}