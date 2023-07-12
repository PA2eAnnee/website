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
                            document.cookie = `user_id=${userId}`; 
                            const userRole = userInfos.connection.connection.role;
                            document.cookie = `role=${userRole}`;
                            window.location = './backend/backend.html';
                            if(!API.getBasket()) {
                                document.cookie = "basket={}"
                            }
                        }
                    }
                }
        }
        loginRequest.setRequestHeader("Content-type", "application/json");
        loginRequest.send(JSON.stringify({
            email: email, 
            password: password,
            origin: "website"
        }));
    } catch(e) {
        console.log(e);
    }
    }

    static getToken() {
        const cookies = document.cookie;
        const tokenKey = "token=";
        const cookieStart = cookies.indexOf(tokenKey);
        let token = null;
        if(cookieStart !== -1) {
            let cookieEnd = cookies.indexOf(";", cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = cookies.length;
            }
            token = decodeURIComponent(cookies.substring(cookieStart + tokenKey.length, cookieEnd));
        }
        return token;
    }

    static getId() {
        const cookies = document.cookie;
        const idKey = "user_id=";
        const cookieStart = cookies.indexOf(idKey);
        let id = null;
    
        if (cookieStart !== -1) {
            let cookieEnd = cookies.indexOf(";", cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = cookies.length;
            }
            id = decodeURIComponent(cookies.substring(cookieStart + idKey.length, cookieEnd));
        }
        return id;
    }

    static getRole() {
        const cookies = document.cookie;
        const roleKey = "role=";
        const cookieStart = cookies.indexOf(roleKey);
        let role = null;
    
        if (cookieStart !== -1) {
            let cookieEnd = cookies.indexOf(";", cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = cookies.length;
            }
            role = decodeURIComponent(cookies.substring(cookieStart + roleKey.length, cookieEnd));
        }
        return role;
    }


    static getBasket() {
        const cookies = document.cookie;
        const basketKey = "basket=";
        const cookieStart = cookies.indexOf(basketKey);
        let basket = null;
    
        if (cookieStart !== -1) {
            let cookieEnd = cookies.indexOf(";", cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = cookies.length;
            }
            basket = decodeURIComponent(cookies.substring(cookieStart + basketKey.length, cookieEnd));
        }
        return basket;
    }

    static getTotalBasket() {
        const cookies = document.cookie;
        const totalKey = "total_order=";
        const cookieStart = cookies.indexOf(totalKey);
        let total = null;
    
        if (cookieStart !== -1) {
            let cookieEnd = cookies.indexOf(";", cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = cookies.length;
            }
            total = decodeURIComponent(cookies.substring(cookieStart + totalKey.length, cookieEnd));
        }
        return total;
    }

    static getOrderType() {
        const cookies = document.cookie;
        const typeKey = "type_order=";
        const cookieStart = cookies.indexOf(typeKey);
        let type = null;
    
        if (cookieStart !== -1) {
            let cookieEnd = cookies.indexOf(";", cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = cookies.length;
            }
            type = decodeURIComponent(cookies.substring(cookieStart + typeKey.length, cookieEnd));
        }
        return type;
    }

    static getEventId() {
        const cookies = document.cookie;
        const eventKey = "event_id=";
        const cookieStart = cookies.indexOf(eventKey);
        let event = null;
    
        if (cookieStart !== -1) {
            let cookieEnd = cookies.indexOf(";", cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = cookies.length;
            }
            event = decodeURIComponent(cookies.substring(cookieStart + eventKey.length, cookieEnd));
        }
        return event;
    }

    static getUsers(toSend) {
        try {
            return new Promise(resolve => {
                const getUsersRequest = new XMLHttpRequest();
                getUsersRequest.open("POST", `${API.address}/getusers`);
                getUsersRequest.onreadystatechange = () => {
                    if (getUsersRequest.readyState === 4) {
                        if (getUsersRequest.status === 200) {
                            const result = JSON.parse(getUsersRequest.responseText);
    
                            if (result.success === true) {
                                const users = result.users;
                                resolve(users);
                            }
                        }
                    }
                }
    
                const token = API.getToken();
                console.log(token);
    
                if (token) {
                    getUsersRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
    
                if (toSend) {
                    const requestBody = JSON.stringify(toSend);
                    getUsersRequest.setRequestHeader('Content-Type', 'application/json');
                    getUsersRequest.send(requestBody);
                } else {
                    getUsersRequest.send();
                }
            });
        } catch (e) {
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

    static updateEvents(id, toSend) {
        if(Object.keys(toSend).length > 0 && typeof id !== undefined) {
            try {
                return new Promise((resolve, reject) => {
                    const updateEventsRequest = new XMLHttpRequest();
                    updateEventsRequest.open("PATCH", `${API.address}/events/${id}`);
                    updateEventsRequest.onreadystatechange = () => {
                        if(updateEventsRequest.readyState === 4) {
                            const result = JSON.parse(updateEventsRequest.responseText);

                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(result.error);
                            }
                        }
                    }
                    const token = API.getToken();
                    if(token) {
                        updateEventsRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                    }
                    updateEventsRequest.send(JSON.stringify(toSend));
                })
            } catch(e) {
                console.log(e);
            }
        } 
    }

    static updateLessons(id, toSend) {
        if(Object.keys(toSend).length > 0 && typeof id !== undefined) {
            try {
                return new Promise((resolve, reject) => {
                    const updateLessonsRequest = new XMLHttpRequest();
                    updateLessonsRequest.open("PATCH", `${API.address}/lessons/${id}`);
                    updateLessonsRequest.onreadystatechange = () => {
                        if(updateLessonsRequest.readyState === 4) {
                            const result = JSON.parse(updateLessonsRequest.responseText);

                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(result.error);
                            }
                        }
                    }
                    const token = API.getToken();
                    if(token) {
                        updateLessonsRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                    }
                    updateLessonsRequest.send(JSON.stringify(toSend));
                })
            } catch(e) {
                console.log(e);
            }
        } 
    }

    static updateRecipes(id, toSend) {
        if(Object.keys(toSend).length > 0 && typeof id !== undefined) {
            try {
                return new Promise((resolve, reject) => {
                    const updateRecipesRequest = new XMLHttpRequest();
                    updateRecipesRequest.open("PATCH", `${API.address}/recipes/${id}`);
                    updateRecipesRequest.onreadystatechange = () => {
                        if(updateRecipesRequest.readyState === 4) {
                            const result = JSON.parse(updateRecipesRequest.responseText);

                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(result.error);
                            }
                        }
                    }
                    const token = API.getToken();
                    if(token) {
                        updateRecipesRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                    }
                    updateRecipesRequest.send(JSON.stringify(toSend));
                    console.log(JSON.stringify(toSend));
                })
            } catch(e) {
                console.log(e);
            }
        } 
    }

    static updateSites(id, toSend) {
        if(Object.keys(toSend).length > 0 && typeof id !== undefined) {
            try {
                return new Promise((resolve, reject) => {
                    const updateSitesRequest = new XMLHttpRequest();
                    updateSitesRequest.open("PATCH", `${API.address}/sites/${id}`);
                    updateSitesRequest.onreadystatechange = () => {
                        if(updateSitesRequest.readyState === 4) {
                            const result = JSON.parse(updateSitesRequest.responseText);

                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(result.error);
                            }
                        }
                    }
                    const token = API.getToken();
                    if(token) {
                        updateSitesRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                    }
                    updateSitesRequest.send(JSON.stringify(toSend));
                })
            } catch(e) {
                console.log(e);
            }
        } 
    }

    static updateCourses(id, toSend) {
        if(Object.keys(toSend).length > 0 && typeof id !== undefined) {
            try {
                return new Promise((resolve, reject) => {
                    const updateCoursesRequest = new XMLHttpRequest();
                    updateCoursesRequest.open("PATCH", `${API.address}/cours/${id}`);
                    updateCoursesRequest.onreadystatechange = () => {
                        if(updateCoursesRequest.readyState === 4) {
                            const result = JSON.parse(updateCoursesRequest.responseText);

                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(result.error);
                            }
                        }
                    }
                    const token = API.getToken();
                    if(token) {
                        updateCoursesRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                    }
                    updateCoursesRequest.send(JSON.stringify(toSend));
                })
            } catch(e) {
                console.log(e);
            }
        } 
    }

    static updateTickets(id, toSend) {
        if(Object.keys(toSend).length > 0 && typeof id !== undefined) {
            try {
                return new Promise((resolve, reject) => {
                    const updateTicketsRequest = new XMLHttpRequest();
                    updateTicketsRequest.open("PATCH", `${API.address}/tickets/${id}`);
                    updateTicketsRequest.onreadystatechange = () => {
                        if(updateTicketsRequest.readyState === 4) {
                            const result = JSON.parse(updateTicketsRequest.responseText);

                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(result.error);
                            }
                        }
                    }
                    const token = API.getToken();
                    if(token) {
                        updateTicketsRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                    }
                    updateTicketsRequest.send(JSON.stringify(toSend));
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

    static getEvents(toSend) {
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
                getEventRequest.send(JSON.stringify(toSend));
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

    static getCourses() {
        try {
            return new Promise(resolve => {
            const getCourseRequest = new XMLHttpRequest();
            getCourseRequest.open("POST", `${API.address}/getcours`);
            getCourseRequest.onreadystatechange = () => {
                if(getCourseRequest.readyState === 4) {
                    if(getCourseRequest.status === 200) {
                        const result = JSON.parse(getCourseRequest.responseText);
                            if(result.success === true){
                                const courses = result.courses;
                                resolve(courses);
                            }
                    }
                }
            }
                const token = API.getToken();
                if(token) {
                    getCourseRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                getCourseRequest.send();
        });
        } catch(e) {
            console.log(e);
        }
    }

    static getFormations() {
        try {
            return new Promise(resolve => {
            const getFormationRequest = new XMLHttpRequest();
            getFormationRequest.open("POST", `${API.address}/getformations`);
            getFormationRequest.onreadystatechange = () => {
                if(getFormationRequest.readyState === 4) {
                    if(getFormationRequest.status === 200) {
                        const result = JSON.parse(getFormationRequest.responseText);

                            if(result.success === true){
                                const formations = result.formations;
                                resolve(formations);
                            }



                    }
                }
            }
                const token = API.getToken();
                if(token) {
                    getFormationRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                getFormationRequest.send();
        });
        } catch(e) {
            console.log(e);
        }
    }

    static getTickets() {
        try {
            return new Promise(resolve => {
            const getTicketRequest = new XMLHttpRequest();
            getTicketRequest.open("POST", `${API.address}/gettickets`);
            getTicketRequest.onreadystatechange = () => {
                if(getTicketRequest.readyState === 4) {
                    if(getTicketRequest.status === 200) {
                        const result = JSON.parse(getTicketRequest.responseText);

                            if(result.success === true){
                                const tickets = result.tickets;
                                resolve(tickets);
                            }



                    }
                }
            }
                const token = API.getToken();
                if(token) {
                    getTicketRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                getTicketRequest.send();
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

    static addSite(toSend) {
        try {
            return new Promise((resolve, reject) => {
                const addSiteRequest = new XMLHttpRequest();
                addSiteRequest.open("POST", `${API.address}/sites`);
                addSiteRequest.onreadystatechange = () => {
                    if(addSiteRequest.readyState === 4) {
                        if(addSiteRequest.status === 200) {
                            const result = JSON.parse(addSiteRequest.responseText);

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
                    addSiteRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                addSiteRequest.send(JSON.stringify(toSend));
            })
        } catch (e) {
            console.log(e);
        }
    }

    static addCourse(toSend) {
        try {
            return new Promise((resolve, reject) => {
                const addCourseRequest = new XMLHttpRequest();
                addCourseRequest.open("POST", `${API.address}/cours`);
                addCourseRequest.onreadystatechange = () => {
                    if(addCourseRequest.readyState === 4) {
                        if(addCourseRequest.status === 200) {
                            const result = JSON.parse(addCourseRequest.responseText);

                            if(result.success === true) {
                                resolve(result.price);
                            } else {
                                reject(result.error);
                            }
                        }
                    }
                }
                const token = API.getToken();
                if(token) {
                    addCourseRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                addCourseRequest.send(JSON.stringify(toSend));
            })
        } catch (e) {
            console.log(e);
        }
    }

    static addRecipe(toSend) {
        try {
            return new Promise((resolve, reject) => {
                const addRecipeRequest = new XMLHttpRequest();
                addRecipeRequest.open("POST", `${API.address}/recipe`);
                addRecipeRequest.onreadystatechange = () => {
                    if(addRecipeRequest.readyState === 4) {
                        if(addRecipeRequest.status === 200) {
                            const result = JSON.parse(addRecipeRequest.responseText);

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
                    addRecipeRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                addRecipeRequest.send(JSON.stringify(toSend));
            })
        } catch (e) {
            console.log(e);
        }
    }
    
    static addLesson(toSend) {
        try {
            return new Promise((resolve, reject) => {
                const addLessonRequest = new XMLHttpRequest();
                addLessonRequest.open("POST", `${API.address}/lessons`);
                addLessonRequest.onreadystatechange = () => {
                    if(addLessonRequest.readyState === 4) {
                        if(addLessonRequest.status === 200) {
                            const result = JSON.parse(addLessonRequest.responseText);

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
                    addLessonRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                addLessonRequest.send(JSON.stringify(toSend));
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

    static getMyEvents(toSend) {
        try {
            return new Promise(resolve => {
                const getMyEventRequest = new XMLHttpRequest();
                getMyEventRequest.open("POST", `${API.address}/getmygoestos`);
                getMyEventRequest.onreadystatechange = () => {
                    if (getMyEventRequest.readyState === 4) {
                        if (getMyEventRequest.status === 200) {
                            const result = JSON.parse(getMyEventRequest.responseText);
    
                            if (result.success === true) {
                                const events = result.goestos;
                                resolve(events);
                            }
                        }
                    }
                }
    
                const token = API.getToken();
                if (token) {
                    getMyEventRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
    
                if (toSend) {
                    const requestBody = JSON.stringify(toSend);
                    getMyEventRequest.setRequestHeader('Content-Type', 'application/json');
                    getMyEventRequest.send(requestBody);
                } else {
                    const userId = API.getId();
                    const requestBody = JSON.stringify({ id_user: userId });
                    getMyEventRequest.setRequestHeader('Content-Type', 'application/json');
                    getMyEventRequest.send(requestBody);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    

    static joinEvent(event_id) {
        try {
            return new Promise((resolve, reject) => {
                const joinEventRequest = new XMLHttpRequest();
                joinEventRequest.open("POST", `${API.address}/goestos`);
                joinEventRequest.onreadystatechange = () => {
                    if(joinEventRequest.readyState === 4) {
                        if(joinEventRequest.status === 200) {
                            const result = JSON.parse(joinEventRequest.responseText);
                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(false);
                            }
                        }
                    }
                }
                const token = API.getToken();
                if(token) {
                    joinEventRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                joinEventRequest.send(JSON.stringify({id_user: API.getId(), id_event: `${event_id}`}));
            });
        } catch (e) {
            console.log(e);
        }
    }

    static leaveEvent(event_id) {
        try {
            return new Promise((resolve, reject) => {
                const leaveEventRequest = new XMLHttpRequest();
                leaveEventRequest.open("POST", `${API.address}/deletegoestos`);
                leaveEventRequest.onreadystatechange = () => {
                    if(leaveEventRequest.readyState === 4) {
                        if(leaveEventRequest.status === 200) {
                            const result = JSON.parse(leaveEventRequest.responseText);
                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(false);
                            }
                        }
                    }
                }
                const token = API.getToken();
                if(token) {
                    leaveEventRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                leaveEventRequest.send(JSON.stringify({id_user: API.getId(), id_event: `${event_id}`}));
            });
        } catch (e) {
            console.log(e);
        }
    }

    static deleteTicket(ticket_id) {
        console.log("ok");
        try {
            return new Promise((resolve, reject) => {
                const deleteTicketRequest = new XMLHttpRequest();
                deleteTicketRequest.open("DELETE", `${API.address}/tickets/${ticket_id}`);
                deleteTicketRequest.onreadystatechange = () => {
                    if(deleteTicketRequest.readyState === 4) {
                        if(deleteTicketRequest.status === 200) {
                            const result = JSON.parse(deleteTicketRequest.responseText);
                            if(result.success === true) {
                                resolve(true);
                            } else {
                                reject(false);
                            }
                        }
                    }
                }
                const token = API.getToken();
                if(token) {
                    deleteTicketRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                deleteTicketRequest.send(JSON.stringify({id_ticket: `${ticket_id}`}));
            });
        } catch (e) {
            console.log(e);
        }
    }

    static addOrder(toSend) {
        try {
            return new Promise((resolve, reject) => {
                const addOrderRequest = new XMLHttpRequest();
                addOrderRequest.open("POST", `${API.address}/orders`);
                addOrderRequest.onreadystatechange = () => {
                    if(addOrderRequest.readyState === 4) {
                        if(addOrderRequest.status === 200) {
                            const result = JSON.parse(addOrderRequest.responseText);

                            if(result.success === true) {
                                resolve(result);
                            } else {
                                reject(result.error);
                            }
                        }
                    }
                }
                const token = API.getToken();
                if(token) {
                    addOrderRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                addOrderRequest.send(JSON.stringify(toSend));
            })
        } catch (e) {
            console.log(e);
        }

    }

    static addContains(toSend) {
        try {
            return new Promise((resolve, reject) => {
                const addContainsRequest = new XMLHttpRequest();
                addContainsRequest.open("POST", `${API.address}/contains`);
                addContainsRequest.onreadystatechange = () => {
                    if(addContainsRequest.readyState === 4) {
                        if(addContainsRequest.status === 200) {
                            const result = JSON.parse(addContainsRequest.responseText);
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
                    addContainsRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                }
                addContainsRequest.send(JSON.stringify(toSend));
            })
        } catch (e) {
            console.log(e);
        }

    }

    
}