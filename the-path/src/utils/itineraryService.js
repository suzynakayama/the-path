import tokenService from "../utils/tokenService";
import pathService from "../utils/pathService";

const BASE_URL = "/api/paths";

function createItinerary(pathId, itinerary) {
    console.log("inside service");
    return fetch(`${BASE_URL}/${pathId}/itinerary`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + tokenService.getToken()
        },
        body: JSON.stringify(itinerary)
    })
        .then(async res => {
            console.log(res);
            if (res.ok) return res.json();
            throw new Error(
                "Sorry, something wrong happened and the new itinerary was not added."
            );
        })
        .then(data => pathService.getAllPaths());
}

function deleteItinerary(pathId, iti_id) {
    return fetch(`${BASE_URL}/${pathId}/${iti_id}`, {
        method: "DELETE"
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error("Sorry, this itinerary is too good to be deleted!");
    });
}

export default {
    createItinerary,
    deleteItinerary
};
