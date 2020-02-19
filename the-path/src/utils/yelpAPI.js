const BASE_URL = "/api/search?";

async function fetchAll(searchRequestQuery) {
    try {
        return fetch(BASE_URL + searchRequestQuery).then(res => res.json());
    } catch (err) {
        console.log(err);
    }
}

export default {
    fetchAll
};
