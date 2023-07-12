import { ListRow } from "../global/ListRow.js";
import { EditEventPopup } from "./EditEventPopup.js";

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
        actionTd.appendChild(editImage);
        super.appendToRow(descriptionTd);
        super.appendToRow(typeTd);
        super.appendToRow(max_membersTd);
        super.appendToRow(priceTd);
        super.appendToRow(start_dateTd);
        super.appendToRow(end_dateTd);
        super.appendToRow(actionTd);
    }
}