import { ListRow } from "./ListRow.js";

export class UserRow extends ListRow {
    constructor(id) {
        super(id);
    }

    generate(name, email, role, status) {
        super.generate();
        const nameTd = document.createElement('td');
        nameTd.innerText = name;
        const emailTd = document.createElement('td');
        emailTd.innerText = email;
        const roleTd = document.createElement('td');
        roleTd.innerText = role;
        const statusTd = document.createElement('td');
        const statusDiv = document.createElement('div');
        statusDiv.classList.add("user-" + status);
        statusDiv.innerText = status;
        statusTd.appendChild(statusDiv);
        super.appendToRow(nameTd);
        super.appendToRow(emailTd);
        super.appendToRow(roleTd);
        super.appendToRow(statusTd);
    }
}