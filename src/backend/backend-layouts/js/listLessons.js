import { LessonList } from "./lessons/LessonsList.js";

window.onload = () => {
    const lessonList = new LessonList();
    lessonList.container = document.getElementsByTagName("main")[0];
}