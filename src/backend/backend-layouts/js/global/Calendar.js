import {CookMasterDate} from './CookMasterDate.js';
import {API} from './API.js';

export class Calendar{
    days = [];
    table;
    courses;
    events;
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor(day, table){
        this.getEvents(day, table);
    }

    async getEvents(day, table) {
        this.courses = await API.getCourses({user_id: API.getId()});
        this.events = await API.getMyEvents({id_user: API.getId()});
        this.days = await this.getDaysOfMonth(day);
        this.table = table;
        this.display();
    }

    async getDaysOfMonth(day) {
        return new Promise((resolve) => {
          const year = day.getFullYear();
          const month = day.getMonth();
          let date = new CookMasterDate(year, month, 1);
          let days = [];
      
          while (date.getMonth() === month) {
            days.push(new CookMasterDate(date));
            date.setDate(date.getDate() + 1);
          }
      
          days.forEach((day) => {
            day.setCourse(this.courses);
            day.setEvent(this.events);
          });
          resolve(days);
        });
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
            const date = day.getDate().toString();
            let cell = document.createElement("td");
            if(day.getEvent()) {
                const eventMarker = document.createElement("div");
                eventMarker.innerText = date;
                eventMarker.style.color = "white";
                eventMarker.style.borderRadius = "50px";
                eventMarker.style.background = "red";
                eventMarker.style.width = "30px";
                eventMarker.style.height = "30px";
                eventMarker.style.margin = "auto";
                eventMarker.style.display = "flex";
                eventMarker.style.justifyContent = "center";
                eventMarker.style.alignItems = "center";
                eventMarker.title = day.getEvent().description;

                cell.appendChild(eventMarker);

            }

            if(day.getCourse()) {
                if(cell.getElementsByTagName("div").length > 0){
                    cell.getElementsByTagName("div")[0].style.background = "purple";
                } else {
                    const eventMarker = document.createElement("div");
                    eventMarker.innerText = date;
                    eventMarker.style.color = "white";
                    eventMarker.style.borderRadius = "50px";
                    eventMarker.style.background = "green";
                    eventMarker.style.width = "30px";
                    eventMarker.style.height = "30px";
                    eventMarker.style.margin = "auto";
                    eventMarker.style.display = "flex";
                    eventMarker.style.justifyContent = "center";
                    eventMarker.style.alignItems = "center";
                    eventMarker.title = day.getCourse().name;

                    cell.appendChild(eventMarker);
                }
            }

            if(day.getCourse() && day.getEvent()) {
                cell.style.background = "purple";
            }
            if(cell.innerHTML == "") {
                cell.innerHTML = date;
            }
            
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
    }
    previousMonth(){
        let day = this.days.shift();
        day.setDate(new CookMasterDate(day.getDate() - 1));
        this.days = "";
        this.days = this.getDaysOfMonth(day);
    }
}