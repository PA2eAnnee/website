import { ListRow } from "../global/ListRow.js";
import {EditSitePopup} from "./EditSitePopup.js";

export class SiteRow extends ListRow {
    list;
    constructor(id, list) {
        super(id);
        this.list = list;
    }

    generate(address, postcode) {
        super.generate();
        const addressTd = document.createElement('td');
        addressTd.innerText = address;
        const postcodeTd = document.createElement('td');
        postcodeTd.innerText = postcode;
        const actionTd = document.createElement('td');
        const editImage = document.createElement('img');
        editImage.src = '../../../img/pen-solid.svg';
        editImage.width = 20;
        editImage.height = 20;
        editImage.onclick = () => {
            const popup = new EditSitePopup(address, postcode, this.id, this.list);
            popup.generate(document.createElement("div"));
        }
        actionTd.appendChild(editImage);
        super.appendToRow(addressTd);
        super.appendToRow(postcodeTd);
        super.appendToRow(actionTd);
    }
}