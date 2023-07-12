import {Cards} from "../global/Cards.js";
import {API} from "../global/API.js";
import {CourseCard} from "./CourseCard.js";

export class CourseCards extends Cards {
    profile;
    past;
    constructor(container, profile, past) {
        super(container);
        this.profile = profile;
        this.past = past;
        this.getCourses();
    }

    async getCourses() {
        const courses = await API.getCourses();
        let showedCourses = [];

        courses.forEach(course => {
            if(this.profile && course.user_id == API.getId() || !this.profile && API.getRole() == "COOKER" && course.status == "WAITING") {
                if(this.past && new Date(course.course_date) < new Date.now()) {
                    showedCourses.push(course);
                    console.log(1);
                } else if(!this.past && new Date(course.course_date) >= new Date.now()){
                    console.log(2);
                    showedCourses.push(course);
                }
            }
        });
        showedCourses.forEach(course => {
            this.addElem(new CourseCard(course.id, course.name, course.description, course.price, course.type, course.course_date, course.course_enddate, course.user_id, course.cooker_id, course.status));
        })
        this.display();
    }
}