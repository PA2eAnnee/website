import {Card} from './Card.js'

export class UserCard extends Card {
    constructor(name, role){
        super();
        this.attributes.push({tag: "div", value: "", CssClass: ["user-img"]});
        this.attributes.push({tag: "h2", value: name, CssClass: []});
        this.attributes.push({tag: "h4", value: role, CssClass: []});
        this.generate("card-user", "user-profile");
    }
}