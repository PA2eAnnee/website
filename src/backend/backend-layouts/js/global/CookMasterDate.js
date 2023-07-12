export class CookMasterDate extends Date{
    event;
    course;

    setEvent(events) {
        for(const event of events) {
            if(this.datesOnSameDay(new Date(event.start_date), this)) {
                this.event = event;
            }
        }
    }

    setCourse(courses) {
        for(const course of courses) {
            if(this.datesOnSameDay(new Date(course.course_date), this)) {
                this.course = course;
            }
        }
    }

    datesOnSameDay(date1, date2) {
        if(date1.getFullYear() === date2.getFullYear()){
            if(date1.getMonth() === date2.getMonth()) {
                if(date1.getDate() === date2.getDate()){
                    return true;
                }
            }
        }
        return false;
    }

    getCourse() {
        return this.course;
    }

    getEvent() {
        return this.event;
    }
}