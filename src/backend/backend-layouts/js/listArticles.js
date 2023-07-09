import { ArticleList } from "./stock/ArticlesList.js";
import { AddArticlePopup } from "./stock/AddArticlePopup.js";

window.onload = () => {
    const articleList = new ArticleList();
    articleList.setAddPopupType(AddArticlePopup);
    articleList.container = document.getElementsByTagName("main")[0];
}