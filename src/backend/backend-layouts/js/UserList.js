import { List } from "./List.js";
import { UserRow } from "./UserRow.js";
import { API } from "./API.js";

export class UserList extends List {
    constructor() {
        super();
        super.setCategs(["Admin", "User", "Chef"]);
        super.setTheads(["<input type='checkbox' name='select-all' id='select-all' class='list-checkbox'>","Name", "Email", "Role", "Status"]);
        this.getUsers();
    }

    async getUsers() {
        const users = await API.getUsers();
        users.forEach(user => {
            const userR = new UserRow(user.id);
            userR.generate(user.first_name + " " + user.name, user.email, user.row, "active");
            super.addToList(userR);
        })
        this.display();
    }
}