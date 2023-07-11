export class Popup {
    popup;
    generate(content) {
        this.popup = document.createElement("section");
        this.popup.classList.add("popup");
        const popupContent = document.createElement("div");
        popupContent.classList.add("popupcontent");
        const popupHeader = document.createElement("div");
        popupHeader.classList.add("popupheader");
        const closeDiv = document.createElement("div");
        closeDiv.classList.add("bgred");
        const crossImg = document.createElement("img");
        crossImg.src = '../../../img/close.svg';
        crossImg.width="30";
        crossImg.height="30";
        console.log(crossImg);
        crossImg.onclick = () => this.destroy();
        closeDiv.appendChild(crossImg);
        popupHeader.appendChild(closeDiv);
        popupContent.appendChild(popupHeader);
        const popupMainContent = content;
        popupMainContent.classList.add("popupmaincontent");
        popupContent.appendChild(popupMainContent);
        this.popup.appendChild(popupContent);
        parent.document.getElementsByTagName("body")[0].appendChild(this.popup);
        scroll = false;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
    }

    destroy() {
        parent.document.getElementsByTagName("body")[0].removeChild(this.popup);
        scroll = true;
        window.onscroll = function() {};
    }
}