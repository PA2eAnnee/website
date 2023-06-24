const toggleShow = (id, from) => {
    let elem = document.getElementById(id);
    let context = document.getElementById(from);
    if(elem.style.display == 'none'){
        elem.style.display = 'block';
        context.getElementsByTagName('img')[1].src = '../../img/chevron-down-solid.svg';
    }else{
        elem.style.display = 'none';
        context.getElementsByTagName('img')[1].src = '../../img/chevron-right-solid.svg';
    }
}

const switchToLayout = (layout) => {
    const container = document.getElementById("layouts-container");
    container.setAttribute("src", `backend-layouts/${layout}.html`);
}