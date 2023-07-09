export class ListRow {
    row;
    id;

    constructor(id) {
        this.id = id;
        this.row = document.createElement('tr');
    }
    generate() {
        const checkboxTd = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('list-checkbox');
        checkbox.elemId = this.id;
        checkboxTd.appendChild(checkbox);
        this.row.appendChild(checkboxTd);
        this.row.id = this.id;
        
    }

    getRow() {
        return this.row;
    }

    appendToRow(elem) {
        this.row.appendChild(elem);
    }
}