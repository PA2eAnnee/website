export class List {
    elems = [];
    container;
    searchCategs;
    theads;
    addPopupType;

    display() {
        const searchSection = document.createElement("section");
        searchSection.id = "list-search";
        const searchForm = document.createElement('form');
        const searchSelect = document.createElement("select");
        for(const searchCateg of this.searchCategs) {
            const option = document.createElement("option");
            option.value = searchCateg;
            option.innerHTML = searchCateg;
            searchSelect.appendChild(option);
        }
        const searchBar = document.createElement("input");
        searchBar.type = "search";
        searchBar.name = "search";
        searchBar.id = "list-search-input";
        searchBar.placeholder = "Search ...";

        const addButton = document.createElement('button');
        addButton.innerText = 'Add';
        addButton.onclick = () => {
            const addPopup = new this.addPopupType;
            addPopup.generate();
        };

        searchForm.appendChild(searchSelect);
        searchForm.appendChild(searchBar);
        searchForm.appendChild(addButton);

        searchSection.appendChild(searchForm);

        this.container.appendChild(searchSection);

        const listSection = document.createElement("section");
        listSection.id = "list";

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const theadTr = document.createElement("tr");
        for(const th of this.theads) {
            const elem = document.createElement("th");
            elem.innerHTML = th;
            theadTr.appendChild(elem);
        }

        thead.appendChild(theadTr);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        for(const elem of this.elems){
            tbody.appendChild(elem.getRow());
        }

        table.appendChild(tbody);
        listSection.appendChild(table);

        this.container.appendChild(listSection);

        const listFooter = document.createElement("section");
        listFooter.id = "list-footer";
        const listFooterForm = document.createElement("form");
        const listFooterDenseDiv = document.createElement("div");
        const listFooterRowsDiv = document.createElement("div");
        const listFooterDense = document.createElement("input");
        listFooterDense.type = "checkbox";
        listFooterDense.classList.add("switch-checkbox");
        listFooterDense.id = "dense-checkbox";
        const listFooterDenseSwitch = document.createElement("label");
        listFooterDenseSwitch.setAttribute("for", "dense-checkbox");
        listFooterDenseSwitch.classList.add("switch");
        const listFooterDenseLabel = document.createElement("label");
        listFooterDenseLabel.innerHTML = "Dense";
        listFooterDenseDiv.appendChild(listFooterDense);
        listFooterDenseDiv.appendChild(listFooterDenseSwitch);
        listFooterDenseDiv.appendChild(listFooterDenseLabel);
        listFooterForm.appendChild(listFooterDenseDiv);
        const listFooterRowsLabel = document.createElement('label');
        listFooterRowsLabel.setAttribute("for", "rows-page");
        listFooterRowsLabel.innerText = "Rows per page:";
        const listFooterRows = document.createElement("select");

        for(let i = 5; i <= 25; i += 5){
            const elem = document.createElement("option");
            elem.value = i;
            elem.innerHTML = i;
            listFooterRows.appendChild(elem);
        }

        listFooterRowsDiv.appendChild(listFooterRowsLabel);
        listFooterRowsDiv.appendChild(listFooterRows);
        listFooterForm.appendChild(listFooterRowsDiv);
        listFooter.appendChild(listFooterForm);
        this.container.append(listFooter);
    }

    addToList(elem) {
        this.elems.push(elem);
    }

    setCategs(categs) {
        this.searchCategs = categs;
    }

    setTheads(theads) {
        this.theads = theads;
    }

    setAddPopupType(addPopupType) {
        this.addPopupType = addPopupType;
    }
}