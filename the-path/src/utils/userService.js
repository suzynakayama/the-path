import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function signup(user) {
    return fetch(BASE_URL + "signup", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(user)
    })
        .then(res => {
            console.log("inside signup fetch");
            console.log(res);
            if (res.ok) return res.json();
            throw new Error("Email already taken!");
        })
        .then(({ token }) => tokenService.setToken(token));
}

function getUser() {
    return tokenService.getUserFromToken();
}

function logout() {
    tokenService.setToken();
}

function login(creds) {
    return fetch(BASE_URL + "login", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(creds)
    })
        .then(res => {
            console.log("inside login fetch");
            console.log(res);
            if (res.ok) return res.json();
            throw new Error("Oh! These credentials are not right!");
        })
        .then(({ token }) => tokenService.setToken(token));
}

function updateUser(user) {
    return fetch(BASE_URL + "update", {
        method: "PUT",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(user)
    })
        .then(res => {
            console.log(res);
            if (res.ok) return res.json();
            throw new Error("Couldn't update.");
        })
        .then(({ token }) => tokenService.setToken(token));
}

function deleteUser(user) {
    return fetch(BASE_URL + "delete", {
        method: "DELETE",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(user)
    })
        .then(res => {
            console.log(res);
            if (res.ok) return res.json();
            throw new Error("Couldn't delete.");
        })
        .then(({ token }) => tokenService.setToken(token));
}

export default {
    signup,
    getUser,
    logout,
    login,
    updateUser,
    deleteUser
};
