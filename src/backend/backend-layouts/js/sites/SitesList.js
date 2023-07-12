import {List} from "../global/List.js";
import {SiteRow} from "./SiteRow.js";
import {API} from "../global/API.js";

export class SiteList extends List {
    nameToThead = new Map();
    constructor() {
        super();
        super.setCategs(["In stock", "Not available"]);
        super.setTheads(["<input type='checkbox' name='select-all' id='select-all' class='list-checkbox'>", "Address", "Postcode", "Action"]);
        this.nameToThead.set('address', 'Address');
        this.nameToThead.set('postcode', 'Postcode');

        this.getSites();
    }

    async getSites() {
        const sites = await API.getSites();
        sites.forEach(site => {
            const siteR = new SiteRow(site.id, this);
            siteR.generate(site.address, site.postcode);
            super.addToList(siteR);
        })
        this.display();
    }

    updateListElem(elem, value, id) {
        const row = document.getElementById(id);
        const idx = this.theads.indexOf(this.nameToThead.get(elem));
        row.getElementsByTagName('td')[idx].innerText = value;

    }
}