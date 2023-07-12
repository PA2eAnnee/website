import { SiteList } from "./sites/SitesList.js";

window.onload = () => {
    const siteList = new SiteList();
    siteList.container = document.getElementsByTagName("main")[0];
}