import { UserList } from "./UserList.js";
window.onload = () => {
    const userList = new UserList();
    userList.container = document.getElementsByTagName("main")[0];
}