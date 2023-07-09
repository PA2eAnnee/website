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
                            const userId = userInfos.connection.connection.id;
                            document.cookie = `id=${userId}`; 
                            window.location = './backend/backend.html';
                        }
                    }
                }
        }
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
            getUsersRequest.open("POST", `${API.address}/getusers`);
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
                const token = API.getToken();
                console.log(token);
                if(token) {
                    getUsersRequest.setRequestHeader('Authorization', 'Bearer ' + token);
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
                getArticlesRequest.open("POST", `${API.address}/getarticles`);
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
                    const token = API.getToken();
                    if(token) {
                        updateArticlesRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                    }
                    updateArticlesRequest.send(JSON.stringify(toSend));
                })
            } catch(e) {
                console.log(e);
            }
        } 
    }

    static addArticle(toSend) {
        try {
            return new Promise((resolve, reject) => {
                const addArticleRequest = new XMLHttpRequest();
                addArticleRequest.open("POST", `${API.address}/articles`);
                addArticleRequest.onreadystatechange = () => {
                    if(addArticleRequest.readyState === 4) {
                        const result = JSON.parse(addArticleRequest.responseText);

                        if(result.success === true) {
                            resolve(true);
                        } else {
                            reject(result.error);
                        }
                    }
                }
                const token = API.getToken();
                if(token) {
                    addArticleRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                addArticleRequest.send(JSON.stringify(toSend));
            })
        } catch(e) {
            console.log(e);
        }
    }

    static getToken() {
        const cookies = document.cookie;
        let begin = cookies.indexOf(";","token");
        if(begin == -1) {
            begin = cookies.indexOf("token");
            if(begin != 0) {
                return null;
            }
        } else {
            begin += 2;
            var end = cookies.indexOf(";", begin);
            if (end == -1) {
                end = cookies.length;
            }
        }
        return decodeURI(cookies.substring(begin + 6, end));
    }

    static getId() {
        const cookies = document.cookie;
        let begin = cookies.indexOf(";","id");
        if(begin == -1) {
            begin = cookies.indexOf("id");
            if(begin != 0) {
                return null;
            }
        } else {
            begin += 2;
            var end = cookies.indexOf(";", begin);
            if (end == -1) {
                end = cookies.length;
            }
        }
        return decodeURI(cookies.substring(begin + 3, end));
    }

    static getEvents() {
        try {
            return new Promise(resolve => {
            const getEventRequest = new XMLHttpRequest();
            getEventRequest.open("POST", `${API.address}/getevents`);
            getEventRequest.onreadystatechange = () => {
                if(getEventRequest.readyState === 4) {
                    if(getEventRequest.status === 200) {
                        const result = JSON.parse(getEventRequest.responseText);

                            if(result.success === true){
                                const events = result.events;
                                resolve(events);
                            }



                    }
                }
            }
                const token = API.getToken();
                if(token) {
                    getEventRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                getEventRequest.send();
        });
        } catch(e) {
            console.log(e);
        }
    }

    static getRecipe() {
        try {
            return new Promise(resolve => {
            const getRecipeRequest = new XMLHttpRequest();
            getRecipeRequest.open("POST", `${API.address}/getrecipe`);
            getRecipeRequest.onreadystatechange = () => {
                if(getRecipeRequest.readyState === 4) {
                    if(getRecipeRequest.status === 200) {
                        const result = JSON.parse(getRecipeRequest.responseText);

                            if(result.success === true){
                                const recipes = result.recipes;
                                resolve(recipes);
                            }



                    }
                }
            }
                const token = API.getToken();
                if(token) {
                    getRecipeRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                getRecipeRequest.send();
        });
        } catch(e) {
            console.log(e);
        }
    }

    static getSites() {
        try {
            return new Promise(resolve => {
            const getSiteRequest = new XMLHttpRequest();
            getSiteRequest.open("POST", `${API.address}/getsites`);
            getSiteRequest.onreadystatechange = () => {
                if(getSiteRequest.readyState === 4) {
                    if(getSiteRequest.status === 200) {
                        const result = JSON.parse(getSiteRequest.responseText);

                            if(result.success === true){
                                const sites = result.sites;
                                resolve(sites);
                            }



                    }
                }
            }
                const token = API.getToken();
                if(token) {
                    getSiteRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                getSiteRequest.send();
        });
        } catch(e) {
            console.log(e);
        }
    }

    static addEvent(toSend) {
        try {
            return new Promise((resolve, reject) => {
                const addEventRequest = new XMLHttpRequest();
                addEventRequest.open("POST", `${API.address}/events`);
                addEventRequest.onreadystatechange = () => {
                    if(addEventRequest.readyState === 4) {
                        if(addEventRequest.status === 200) {
                            const result = JSON.parse(addEventRequest.responseText);

                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(result.error);
                            }
                        }
                    }
                }
                const token = API.getToken();
                if(token) {
                    addEventRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                addEventRequest.send(JSON.stringify(toSend));
            })
        } catch (e) {
            console.log(e);
        }
    }

    static getLessons() {
        try {
            return new Promise(resolve => {
            const getLessonRequest = new XMLHttpRequest();
            getLessonRequest.open("POST", `${API.address}/getlessons`);
            getLessonRequest.onreadystatechange = () => {
                if(getLessonRequest.readyState === 4) {
                    if(getLessonRequest.status === 200) {
                        const result = JSON.parse(getLessonRequest.responseText);

                            if(result.success === true){
                                const lessons = result.lessons;
                                resolve(lessons);
                            }



                    }
                }
            }
                const token = API.getToken();
                if(token) {
                    getLessonRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                getLessonRequest.send();
        });
        } catch(e) {
            console.log(e);
        }
    }
}