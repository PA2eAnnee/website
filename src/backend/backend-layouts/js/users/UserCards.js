import {Cards} from '../global/Cards.js';
import {UserCard} from './UserCard.js';
import {API} from '../global/API.js';

export class UserCards extends Cards {
    constructor(container) {
        super(container);
        this.getUsers();
    }

    async getUsers() {
        const users = await API.getUsers();
        users.forEach(user => {
            this.addElem(new UserCard(user.name, user.role));
        });
        this.display();
    }
}