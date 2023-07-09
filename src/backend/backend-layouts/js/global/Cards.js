export class Cards {
    elems = [];
    container;

    constructor(container) {
        this.container = container;
    }

    addElem(elem) {
        this.elems.push(elem);
    }

    display() {
        for(const elem of this.elems) {
            this.container.appendChild(elem.getCard());
        }
    }
}