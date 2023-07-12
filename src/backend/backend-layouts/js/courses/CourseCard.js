import { Card } from "../global/Card.js";
import { API } from "../global/API.js";

export class CourseCard extends Card {
    id;

    constructor(id, name, description, price, type, course_date, course_enddate, user_id, cooker_id, status) {
        super();
        this.id = id;
        this.attributes.push({ tag: "h2", value: name, CssClass: "" });
        this.attributes.push({ tag: "h4", value: type, CssClass: "" });
        const startDate = new Date(course_date);
        const endDate = new Date(course_enddate);
        const day = startDate.getDate();
        const month = startDate.getMonth();
        const year = startDate.getFullYear();
        const startHour = startDate.getHours();
        const startMinutes = startDate.getMinutes();
        const endHours = endDate.getHours();
        const endMinutes = endDate.getMinutes();
        this.attributes.push({ tag: "h5", value: `${day}/${month}/${year}       ${startHour}:${startMinutes} | ${endHours}:${endMinutes}`, CssClass: "" });
        this.generate("card-course", "course-profile");
    }
}