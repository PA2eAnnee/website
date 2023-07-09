import {CookMasterDate} from './CookMasterDate.js';

export class Calendar{
    days = [];
    table;
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor(day, table){
        this.days = this.getDaysOfMonth(day);
        this.table = table;
    }

    getDaysOfMonth(day){
        const year = day.getFullYear();
        const month = day.getMonth();
        let date = new CookMasterDate(year, month, 1);
        let days = [];

        while(date.getMonth() === month){
            days.push(new CookMasterDate(date));
            date.setDate(date.getDate() + 1);
        }

        return days;
    }

    display(){
        this.table.innerHTML = "";
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        let currentRow = document.createElement("tr");
        for(let i = 0; i < this.days[0].getDay(); i++){
            currentRow.appendChild(document.createElement("td"));
        }
        for(const day of this.days){
            if(day.getDay() === 0){
                tbody.appendChild(currentRow);
                currentRow = document.createElement("tr");
            }
            let cell = document.createElement("td");
            cell.innerHTML = day.getDate().toString();
            currentRow.appendChild(cell);
        }
        tbody.appendChild(currentRow);
        let th = document.createElement("th");
        th.innerHTML = this.days[0].getFullYear();
        th.colSpan = 3;
        thead.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = this.monthNames[this.days[0].getMonth()];
        th.colSpan = 4;
        thead.appendChild(th);
        this.table.appendChild(thead);
        this.table.appendChild(tbody);
    }

    nextMonth(){
        let day = this.days.pop();
        day.setDate(new CookMasterDate(day.getDate() + 1));
        this.days = "";
        this.days = this.getDaysOfMonth(day);
        console.log(this.days);
    }
    previousMonth(){
        let day = this.days.shift();
        day.setDate(new CookMasterDate(day.getDate() - 1));
        this.days = "";
        this.days = this.getDaysOfMonth(day);
    }
}