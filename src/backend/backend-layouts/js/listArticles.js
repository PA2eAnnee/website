import { ArticleList } from "./stock/ArticlesList.js";

window.onload = () => {
    const articleList = new ArticleList();
    articleList.container = document.getElementsByTagName("main")[0];
}