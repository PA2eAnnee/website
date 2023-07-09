import { ListRow } from "../global/ListRow.js";
import {EditArticlePopup} from "./EditArticlePopup.js";

export class ArticleRow extends ListRow {
    list;
    constructor(id, list) {
        super(id);
        this.list = list;
    }

    generate(description, stock, price) {
        super.generate();
        const descriptionTd = document.createElement('td');
        descriptionTd.innerText = description;
        const stockTd = document.createElement('td');
        stockTd.innerText = stock;
        const priceTd = document.createElement('td');
        priceTd.innerText = price;
        const actionTd = document.createElement('td');
        const editImage = document.createElement('img');
        editImage.src = '../../../img/pen-solid.svg';
        editImage.width = 20;
        editImage.height = 20;
        editImage.onclick = () => {
            const popup = new EditArticlePopup(description, stock, price, this.id, this.list);
            popup.generate(document.createElement("div"));
        }
        actionTd.appendChild(editImage);
        super.appendToRow(descriptionTd);
        super.appendToRow(stockTd);
        super.appendToRow(priceTd);
        super.appendToRow(actionTd);
    }
}