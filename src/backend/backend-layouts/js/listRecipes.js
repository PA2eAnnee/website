import { RecipeList } from "./recipes/RecipesList.js";

window.onload = () => {
    const recipeList = new RecipeList();
    recipeList.container = document.getElementsByTagName("main")[0];
}