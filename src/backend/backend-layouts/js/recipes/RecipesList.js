import {List} from "../global/List.js";
import {RecipeRow} from "./RecipeRow.js";
import {API} from "../global/API.js";

export class RecipeList extends List {
    nameToThead = new Map();
    constructor() {
        super();
        super.setCategs(["In stock", "Not available"]);
        super.setTheads(["<input type='checkbox' name='select-all' id='select-all' class='list-checkbox'>", "Name", "Description", "Duration", "ComplexityLevel", "Video", "Action"]);
        this.nameToThead.set('name', 'Name');
        this.nameToThead.set('description', 'Description');
        this.nameToThead.set('duration', 'Duration');
        this.nameToThead.set('complexityLevel', 'ComplexityLevel');
        this.nameToThead.set('video', 'Video');
        console.log("ok");
        this.getRecipe();
    }

    async getRecipe() {
        const recipes = await API.getRecipe();
        console.log(recipes);
        recipes.forEach(recipe => {
            const recipeR = new RecipeRow(recipe.ID, this);
            recipeR.generate(recipe.Name, recipe.Description, recipe.Duration, recipe.ComplexityLevel, recipe.Video);
            super.addToList(recipeR);
        })
        this.display();
    }

    updateListElem(elem, value, ID) {
        const row = document.getElementById(ID);
        const idx = this.theads.indexOf(this.nameToThead.get(elem));
        row.getElementsByTagName('td')[idx].innerText = value;

    }
}