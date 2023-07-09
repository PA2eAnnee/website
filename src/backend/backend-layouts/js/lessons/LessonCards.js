import {Cards} from "../global/Cards.js";
import {API} from "../global/API.js";
import {LessonCard} from "./LessonCard.js";

export class LessonCards extends Cards {
    constructor(container) {
        super(container);
        this.getEvents();
    }

    async getEvents() {
        const lessons = await API.getLessons();
        console.log(lessons);
        lessons.forEach(lesson => {
            this.addElem(new LessonCard(lesson.name, lesson.description));
        });
        this.display();
    }
}