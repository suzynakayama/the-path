// export function getAllPaths() {
//     return fetch("/paths").then(res => {
//         console.log(res);
//         res.json();
//     });
// }

// export default getAllPaths;

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
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(
            "Sorry, something wrong happened and the new path was not added."
        );
    });
}

function getAllPaths(userId) {
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

export default {
    createPath,
    getAllPaths
};
