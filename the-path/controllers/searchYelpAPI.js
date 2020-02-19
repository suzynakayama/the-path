const BASE_URL = "https://api.yelp.com/v3/businesses/search";
const apiKey = process.env.API_KEY;
const yelp = require("yelp-fusion");

const client = yelp.client(apiKey);

function searchTerms(req, res) {
    try {
        client.search(req.query).then(response => {
            const result = response.jsonBody.businesses;
            return res.status(200).json(result);
        });
    } catch (err) {
        res.status(400).json({ err });
    }
}

module.exports = {
    searchTerms
};
