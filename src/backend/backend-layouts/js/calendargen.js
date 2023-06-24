import {Calendar} from './Calendar.js';
import {CookMasterDate} from './CookMasterDate.js';

let table;
let cal;


window.onload = () => {
    table = document.getElementById("calendar");
    cal = new Calendar(new CookMasterDate(), table);
    cal.display();
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