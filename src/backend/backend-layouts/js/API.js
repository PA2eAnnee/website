export class API{
    static address = "https://api.cookmaster.best";

    static login(email, password){
        try{
            const loginRequest = new XMLHttpRequest();
            loginRequest.open("POST", this.address + "/connection");
            loginRequest.onreadystatechange = () => {
                if(loginRequest.readyState === 4){
                    if(loginRequest.status === 200){
                        const userInfos = JSON.parse(loginRequest.responseText);
                        if(userInfos.success == true){
                            const userToken = userInfos.connection.connection.token;
                            document.cookie = 'token=' + userToken;
                            window.location = './backend/backend.html';
                        }
                    }
                }
        }
        loginRequest.setRequestHeader("Accept", "application/json")
        loginRequest.setRequestHeader("Content-type", "application/json");
        loginRequest.send(JSON.stringify({
            "email" : email, 
            "password": password
        }));
    } catch(e) {
        console.log(e);
    }
    }

    static getUsers() {
        try {
            return new Promise(resolve => {
            const getUsersRequest = new XMLHttpRequest();
            getUsersRequest.open("GET", this.address + "/users");
            getUsersRequest.onreadystatechange = () => {
                if(getUsersRequest.readyState === 4) {
                    if(getUsersRequest.status === 200) {
                        const result = JSON.parse(getUsersRequest.responseText);
                        
                            if(result.success === true){
                                const users = result.users;
                                console.log(users);
                                resolve(users);
                            }
                        
                        
                        
                    }
                }
            }
            getUsersRequest.send();
        });
        } catch(e) {
            console.log(e);
        }
    }
}