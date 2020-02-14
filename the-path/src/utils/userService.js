import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function signup(user) {
    return fetch(BASE_URL + "signup", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(user)
    })
        .then(res => {
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
            if (res.ok) return res.json();
            throw new Error("Oh! These credentials are not right!");
        })
        .then(({ token }) => tokenService.setToken(token));
}

export default {
    signup,
    getUser,
    logout,
    login
};
