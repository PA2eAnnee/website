import {List} from "../global/List.js";
import {FormationRow} from "./FormationRow.js";
import {API} from "../global/API.js";

export class FormationList extends List {
    nameToThead = new Map();
    constructor() {
        super();
        super.setCategs(["In stock", "Not available"]);
        super.setTheads(["<input type='checkbox' name='select-all' id='select-all' class='list-checkbox'>", "Name", "Description", "Action"]);
        this.nameToThead.set('name', 'Name');
        this.nameToThead.set('description', 'Description');

        this.getFormations();
    }

    async getFormations() {
        const formations = await API.getFormations();
        formations.forEach(formation => {
            const formationR = new FormationRow(formation.id, this);
            formationR.generate(formation.name, formation.description);
            super.addToList(formationR);
        })
        this.display();
    }

    updateListElem(elem, value, id) {
        const row = document.getElementById(id);
        const idx = this.theads.indexOf(this.nameToThead.get(elem));
        row.getElementsByTagName('td')[idx].innerText = value;

    }
}