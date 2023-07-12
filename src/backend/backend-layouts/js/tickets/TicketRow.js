import { ListRow } from "../global/ListRow.js";
import {EditTicketPopup} from "./EditTicketPopup.js";
import {ConfirmDeletePopup} from "../global/ConfirmDeletePopup.js";
import { API } from "../global/API.js";

export class TicketRow extends ListRow {
    list;
    constructor(id, list) {
        super(id);
        this.list = list;
    }

    generate(title, description, creationDate) {
        super.generate();
        const titleTd = document.createElement('td');
        titleTd.innerText = title;
        const descriptionTd = document.createElement('td');
        descriptionTd.innerText = description;
        const creationDateTd = document.createElement('td');
        creationDateTd.innerText = creationDate;
        const actionTd = document.createElement('td');
        const editImage = document.createElement('img');
        editImage.src = '../../../img/pen-solid.svg';
        editImage.width = 20;
        editImage.height = 20;
        editImage.onclick = () => {
            const popup = new EditTicketPopup(title, description, creationDate, this.id, this.list);
            popup.generate(document.createElement("div"));
        }
        const deleteImage = document.createElement('img');
        deleteImage.src = '../../../img/trash-can.svg';
        deleteImage.width = 20;
        deleteImage.height = 20;
        deleteImage.onclick = () => {
            const popup = new ConfirmDeletePopup(() => {
                API.deleteTicket(this.id);
                this.list.removeItemFromList(this.id);
                return true;     
            });

            popup.generate(document.createElement("div"));
        }
        actionTd.appendChild(editImage);
        actionTd.appendChild(deleteImage);
        super.appendToRow(titleTd);
        super.appendToRow(descriptionTd);
        super.appendToRow(creationDateTd);
        super.appendToRow(actionTd);
    }
}