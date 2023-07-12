import {List} from "../global/List.js";
import {LessonRow} from "./LessonRow.js";
import {API} from "../global/API.js";

export class LessonList extends List {
    nameToThead = new Map();
    constructor() {
        super();
        super.setCategs(["In stock", "Not available"]);
        super.setTheads(["<input type='checkbox' name='select-all' id='select-all' class='list-checkbox'>", "Name", "Description", "Action"]);
        this.nameToThead.set('name', 'Name');
        this.nameToThead.set('description', 'Description');
        
        this.getLessons();
    }

    async getLessons() {
        const lessons = await API.getLessons();
        lessons.forEach(lesson => {
            const lessonR = new LessonRow(lesson.id, this);
            lessonR.generate(lesson.name, lesson.description);
            super.addToList(lessonR);
        })
        this.display();
    }

    updateListElem(elem, value, id) {
        const row = document.getElementById(id);
        const idx = this.theads.indexOf(this.nameToThead.get(elem));
        row.getElementsByTagName('td')[idx].innerText = value;

    }
}