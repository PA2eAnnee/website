import { ListRow } from "../global/ListRow.js";
import {EditRecipePopup} from "./EditRecipePopup.js";
import {ConfirmDeletePopup} from "../global/ConfirmDeletePopup.js";
import { API } from "../global/API.js";

export class RecipeRow extends ListRow {
    list;
    constructor(id, list) {
        super(id);
        this.list = list;
    }

    generate(name, description, duration, complexityLevel, video) {
        super.generate();
        const nameTd = document.createElement('td');
        nameTd.innerText = name;
        const descriptionTd = document.createElement('td');
        descriptionTd.innerText = description;
        const durationTd = document.createElement('td');
        durationTd.innerText = duration;
        const complexityLevelTd = document.createElement('td');
        complexityLevelTd.innerText = complexityLevel;
        const videoTd = document.createElement('td');
        videoTd.innerText = video;
        const actionTd = document.createElement('td');
        const editImage = document.createElement('img');
        editImage.src = '../../../img/pen-solid.svg';
        editImage.width = 20;
        editImage.height = 20;
        editImage.onclick = () => {
            const popup = new EditRecipePopup(name, description, duration, complexityLevel, video, this.id, this.list);
            popup.generate(document.createElement("div"));
        }
        const deleteImage = document.createElement('img');
        deleteImage.src = '../../../img/trash-can.svg';
        deleteImage.width = 20;
        deleteImage.height = 20;
        deleteImage.onclick = () => {
            const popup = new ConfirmDeletePopup(() => {
                API.deleteRecipe(this.id);
                this.list.removeItemFromList(this.id);
                return true;     
            });

            popup.generate(document.createElement("div"));
        }
        actionTd.appendChild(editImage);
        actionTd.appendChild(deleteImage);
        super.appendToRow(nameTd);
        super.appendToRow(descriptionTd);
        super.appendToRow(durationTd);
        super.appendToRow(complexityLevelTd);
        super.appendToRow(videoTd);
        super.appendToRow(actionTd);
    }
}