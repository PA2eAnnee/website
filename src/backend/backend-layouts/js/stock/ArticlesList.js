import {List} from "../global/List.js";
import {ArticleRow} from "./ArticleRow.js";
import {API} from "../global/API.js";

export class ArticleList extends List {
    nameToThead = new Map();
    constructor() {
        super();
        super.setCategs(["In stock", "Not available"]);
        super.setTheads(["<input type='checkbox' name='select-all' id='select-all' class='list-checkbox'>", "Name", "Description", "Stock", "Prix", "Picture", "Action"]);
        this.nameToThead.set('name', 'Name');
        this.nameToThead.set('description', 'Description');
        this.nameToThead.set('stock', 'Stock');
        this.nameToThead.set('price', 'Prix');
        this.nameToThead.set('picture', 'Picture');
        
        this.getArticles();
    }

    async getArticles() {
        const articles = await API.getArticles();
        articles.forEach(article => {
            const articleR = new ArticleRow(article.id, this);
            articleR.generate(article.name, article.description, article.stock, article.price, article.picture);
            super.addToList(articleR);
        })
        this.display();
    }

    updateListElem(elem, value, id) {
        const row = document.getElementById(id);
        const idx = this.theads.indexOf(this.nameToThead.get(elem));
        row.getElementsByTagName('td')[idx].innerText = value;

    }
}