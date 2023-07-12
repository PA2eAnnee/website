import { CourseList } from "./courses/CoursesList.js";

window.onload = () => {
    const courseList = new CourseList();
    courseList.container = document.getElementsByTagName("main")[0];
}