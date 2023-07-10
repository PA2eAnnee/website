import {Card} from "../global/Card.js";

export class LessonCard extends Card {
    constructor(name, description) {
        super();
        this.attributes.push({tag: "h2", value: name, CssClass: ""});
        this.attributes.push({tag: "h4", value: description, CssClass: ""});
        this.attributes.push({tag: "button", value: "View", CssClass: ""});
        this.generate("card-lesson", "lesson-profile");
    }
}