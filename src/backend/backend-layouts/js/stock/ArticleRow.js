import { ListRow } from "../global/ListRow.js";
import {EditArticlePopup} from "./EditArticlePopup.js";
import {ConfirmDeletePopup} from "../global/ConfirmDeletePopup.js";
import { API } from "../global/API.js";

export class ArticleRow extends ListRow {
    list;
    constructor(id, list) {
        super(id);
        this.list = list;
    }

    generate(name, description, stock, price, picture) {
        super.generate();
        const nameTd = document.createElement('td');
        nameTd.innerText = name;
        const descriptionTd = document.createElement('td');
        descriptionTd.innerText = description;
        const stockTd = document.createElement('td');
        stockTd.innerText = stock;
        const priceTd = document.createElement('td');
        priceTd.innerText = price;
        const pictureTd = document.createElement('td');
        pictureTd.innerText = picture;
        const actionTd = document.createElement('td');
        const editImage = document.createElement('img');
        editImage.src = '../../../img/pen-solid.svg';
        editImage.width = 20;
        editImage.height = 20;
        editImage.onclick = () => {
            const popup = new EditArticlePopup(name, description, stock, price, picture, this.id, this.list);
            popup.generate(document.createElement("div"));
        }
        const deleteImage = document.createElement('img');
        deleteImage.src = '../../../img/trash-can.svg';
        deleteImage.width = 20;
        deleteImage.height = 20;
        deleteImage.onclick = () => {
            const popup = new ConfirmDeletePopup(() => {
                API.deleteArticle(this.id);
                this.list.removeItemFromList(this.id);
                return true;     
            });

            popup.generate(document.createElement("div"));
        }
        actionTd.appendChild(editImage);
        actionTd.appendChild(deleteImage);
        super.appendToRow(nameTd);
        super.appendToRow(descriptionTd);
        super.appendToRow(stockTd);
        super.appendToRow(priceTd);
        super.appendToRow(pictureTd);
        super.appendToRow(actionTd);
    }
}