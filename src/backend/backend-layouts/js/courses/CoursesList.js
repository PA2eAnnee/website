import {List} from "../global/List.js";
import {CourseRow} from "./CourseRow.js";
import {API} from "../global/API.js";

export class CourseList extends List {
    nameToThead = new Map();
    constructor() {
        super();
        super.setCategs(["In stock", "Not available"]);
        super.setTheads(["<input type='checkbox' name='select-all' id='select-all' class='list-checkbox'>", "Name", "Description", "Price", "Type", "Course Date", "Action"]);
        this.nameToThead.set('name', 'Name');
        this.nameToThead.set('description', 'Description');
        this.nameToThead.set('price', 'Price');
        this.nameToThead.set('type', 'Type');
        this.nameToThead.set('course_date', 'Course Date');

        this.getCourses();
    }

    async getCourses() {
        const courses = await API.getCourses();
        courses.forEach(course => {
            const courseR = new CourseRow(course.id, this);
            courseR.generate(course.name, course.description, course.price, course.type, course.course_date);
            super.addToList(courseR);
        })
        this.display();
    }

    updateListElem(elem, value, id) {
        const row = document.getElementById(id);
        const idx = this.theads.indexOf(this.nameToThead.get(elem));
        row.getElementsByTagName('td')[idx].innerText = value;

    }
}