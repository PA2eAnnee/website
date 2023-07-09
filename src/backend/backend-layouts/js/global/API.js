export class API{
    static address = "https://api.cookmaster.best";

    static login(email, password){
        try{
            const loginRequest = new XMLHttpRequest();
            loginRequest.open("POST", `${API.address}/connection`);
            loginRequest.onreadystatechange = () => {
                if(loginRequest.readyState === 4){
                    if(loginRequest.status === 200){
                        const userInfos = JSON.parse(loginRequest.responseText);
                        if(userInfos.success == true){
                            const userToken = userInfos.connection.connection.token;
                            document.cookie = `token=${userToken}`;
                            window.location = './backend/backend.html';
                        }
                    }
                }
        }
        // loginRequest.setRequestHeader("Accept", "application/json")
        loginRequest.setRequestHeader("Content-type", "application/json");
        loginRequest.send(JSON.stringify({
            email: email, 
            password: password
        }));
    } catch(e) {
        console.log(e);
    }
    }

    static getUsers() {
        try {
            return new Promise(resolve => {
            const getUsersRequest = new XMLHttpRequest();
            getUsersRequest.open("GET", `${API.address}/users`);
            getUsersRequest.onreadystatechange = () => {
                if(getUsersRequest.readyState === 4) {
                    if(getUsersRequest.status === 200) {
                        const result = JSON.parse(getUsersRequest.responseText);
                        
                            if(result.success === true){
                                const users = result.users;
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

    static getArticles() {
        try {
            return new Promise(resolve => {
                const getArticlesRequest = new XMLHttpRequest();
                getArticlesRequest.open("GET", `${API.address}/articles`);
                getArticlesRequest.onreadystatechange = () => {
                    if(getArticlesRequest.readyState === 4) {
                        if(getArticlesRequest.status === 200) {
                            const result = JSON.parse(getArticlesRequest.responseText);

                            if(result.success === true) {
                                const articles = result.articles;
                                resolve(articles);
                            }
                        }
                    }
                }
                getArticlesRequest.send();
            });
        } catch(e) {
            console.log(e);
        }
    }

    static updateArticles(id, toSend) {
        if(Object.keys(toSend).length > 0 && typeof id !== undefined) {
            try {
                return new Promise((resolve, reject) => {
                    const updateArticlesRequest = new XMLHttpRequest();
                    updateArticlesRequest.open("PATCH", `${API.address}/articles/${id}`);
                    updateArticlesRequest.onreadystatechange = () => {
                        if(updateArticlesRequest.readyState === 4) {
                            const result = JSON.parse(updateArticlesRequest.responseText);

                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(result.error);
                            }
                        }
                    }
                    updateArticlesRequest.send(JSON.stringify(toSend));
                })
            } catch(e) {
                console.log(e);
            }
        } 
    }

    addArticle(toSend) {
        try {
            return new Promise((resolve, reject) => {
                const addArticleRequest = new XMLHttpRequest();
                addArticleRequest.open("POST", `${API.address}/articles`);
                addArticleRequest.onreadystatechange = () => {
                    if(updateArticles.readyState === 4) {
                        const result = JSON.parse(addArticleRequest.responseText);

                        if(result.success === true) {
                            resolve(true);
                        } else {
                            reject(result.error);
                        }
                    }
                    addArticleRequest.send(JSON.stringify(toSend));
                }
            })
        } catch(e) {
            console.log(e);
        }
    }
}