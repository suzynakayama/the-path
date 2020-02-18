import tokenService from "../utils/tokenService";

const BASE_URL = "/api/paths";

function createPath(path) {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + tokenService.getToken()
        },
        body: JSON.stringify(path)
    })
        .then(async res => {
            if (res.ok) return res.json();
            throw new Error(
                "Sorry, something wrong happened and the new path was not added."
            );
        })
        .then(data => getAllPaths());
}

function getAllPaths() {
    return fetch(BASE_URL, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
        }
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error("Database Error");
    });
}

function getOnePath(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
        }
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error("Database Error");
    });
}

function deletePath(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error("Sorry, this path is too good to be deleted!");
    });
}

export default {
    createPath,
    getAllPaths,
    getOnePath,
    deletePath
};
