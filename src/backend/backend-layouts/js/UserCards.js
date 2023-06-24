import {Cards} from './Cards.js';
import {UserCard} from './UserCard.js';
import {API} from './API.js';

export class UserCards extends Cards {
    constructor(container) {
        super(container);
        this.getUsers();
    }

    async getUsers() {
        const users = await API.getUsers()
        console.log(users);
        users.forEach(user => {
            this.addElem(new UserCard(user.name, user.role));
        });
        this.display();
    }
}