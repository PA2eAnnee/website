import {API} from './backend/backend-layouts/js/API.js';
const loginPopupShow = () => {
    let popup = document.getElementById('login');
    popup.style.display = 'flex';
    scroll = false;
    scrollTop = window.pageYOffset || document.documentElement.scrollTop,
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

const loginPopupHide = () => {
    let popup = document.getElementById('login');
    popup.style.display = 'none';
    scroll = true;
    window.onscroll = function() {};
}

const login = () => {
    const email = document.getElementById('loginEmail');
    const passwd = document.getElementById('loginPassword');
    if(API.login(email.value, passwd.value)){
        window.location.href = 'backend/backend.html';
    }
}

window.loginPopupShow = loginPopupShow;
window.loginPopupHide = loginPopupHide;
window.login = login;