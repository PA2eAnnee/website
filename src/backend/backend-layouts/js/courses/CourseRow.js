import { ListRow } from "../global/ListRow.js";
import {EditCoursePopup} from "./EditCoursePopup.js";

export class CourseRow extends ListRow {
    list;
    constructor(id, list) {
        super(id);
        this.list = list;
    }

    generate(name, description, price, type, start_date) {
        super.generate();
        const nameTd = document.createElement('td');
        nameTd.innerText = name;
        const descriptionTd = document.createElement('td');
        descriptionTd.innerText = description;
        const priceTd = document.createElement('td');
        priceTd.innerText = price;
        const typeTd = document.createElement('td');
        typeTd.innerText = type;
        const start_dateTd = document.createElement('td');
        start_dateTd.innerText = start_date;
        const actionTd = document.createElement('td');
        const editImage = document.createElement('img');
        editImage.src = '../../../img/pen-solid.svg';
        editImage.width = 20;
        editImage.height = 20;
        editImage.onclick = () => {
            const popup = new EditCoursePopup(name, description, price, type, start_date, this.id, this.list);
            popup.generate(document.createElement("div"));
        }
        actionTd.appendChild(editImage);
        super.appendToRow(nameTd);
        super.appendToRow(descriptionTd);
        super.appendToRow(priceTd);
        super.appendToRow(typeTd);
        super.appendToRow(start_dateTd);
        super.appendToRow(actionTd);
    }
}