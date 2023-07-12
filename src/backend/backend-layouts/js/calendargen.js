import {Calendar} from './global/Calendar.js';
import {CookMasterDate} from './global/CookMasterDate.js';

let table;
let cal;


window.onload = () => {
    table = document.getElementById("calendar");
    cal = new Calendar(new CookMasterDate(), table);
}

const switchToNextMonth = () => {
    cal.nextMonth();
    cal.display();
}
window.switchToNextMonth = switchToNextMonth;

const switchToPreviousMonth = () => {
    cal.previousMonth();
    cal.display();
}
window.switchToPreviousMonth = switchToPreviousMonth;