export class Card {
    card;
    attributes = [];

    constructor() {
        this.card = document.createElement("div");
    }

    generate(otherRootClass, otherContentClass) {
        if(this.id) {
            this.card.id = this.id;
        }
        this.card.classList.add("card");
        if(otherRootClass) {
            this.card.classList.add(otherRootClass);
        }
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        if(otherContentClass) {
            cardContent.classList.add(otherContentClass);
        }
        for(const attribute of this.attributes) {
            if(attribute.tag) {
                const elem = document.createElement(attribute.tag);
                elem.innerText = attribute.value;
                for(const CssClass of attribute.CssClass) {
                    elem.classList.add(CssClass);
                }

                if(attribute.tag === "button") {
                    elem.onclick = () => attribute.onclick();
                }
                cardContent.appendChild(elem);
            }
            
        }
        this.card.appendChild(cardContent);
    }  

    addAttribute(attr) {
        this.attributes.push(attr);
    }

    getCard() {
        return this.card;
    }

    setId(id) {
        this.id = id;
    }
}