import { ListRow } from "../global/ListRow.js";
import { EditEventPopup } from "./EditEventPopup.js";
import {ConfirmDeletePopup} from "../global/ConfirmDeletePopup.js";
import { API } from "../global/API.js";

export class EventRow extends ListRow {
    list;
    constructor(id, list) {
        super(id);
        this.list = list;
    }

    generate(description, type, max_members, price, start_date, end_date) {
        super.generate();
        const descriptionTd = document.createElement('td');
        descriptionTd.innerText = description;
        const typeTd = document.createElement('td');
        typeTd.innerText = type;
        const max_membersTd = document.createElement('td');
        max_membersTd.innerText = max_members;
        const priceTd = document.createElement('td');
        priceTd.innerText = price;
        const start_dateTd = document.createElement('td');
        start_dateTd.innerText = start_date;
        const end_dateTd = document.createElement('td');
        end_dateTd.innerText = end_date;
        const actionTd = document.createElement('td');
        const editImage = document.createElement('img');
        editImage.src = '../../../img/pen-solid.svg';
        editImage.width = 20;
        editImage.height = 20;
        editImage.onclick = () => {
            const popup = new EditEventPopup(description, type, max_members, price, start_date, end_date, this.id, this.list);
            popup.generate(document.createElement("div"));
        }
        const deleteImage = document.createElement('img');
        deleteImage.src = '../../../img/trash-can.svg';
        deleteImage.width = 20;
        deleteImage.height = 20;
        deleteImage.onclick = () => {
            const popup = new ConfirmDeletePopup(() => {
                API.deleteEvent(this.id);
                this.list.removeItemFromList(this.id);
                return true;     
            });

            popup.generate(document.createElement("div"));
        }
        actionTd.appendChild(editImage);
        actionTd.appendChild(deleteImage);
        super.appendToRow(descriptionTd);
        super.appendToRow(typeTd);
        super.appendToRow(max_membersTd);
        super.appendToRow(priceTd);
        super.appendToRow(start_dateTd);
        super.appendToRow(end_dateTd);
        super.appendToRow(actionTd);
    }
}