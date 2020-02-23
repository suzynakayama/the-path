const apiKey = process.env.GOOGLE_KEY;
const BASE_URL = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=016444093585543128324:madkuzcq8qb&q=`;

function searchTerms(req, res) {
    try {
        let result = fetch(BASE_URL + req.query.q);
        return res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ err });
    }
}

module.exports = {
    searchTerms
};

{
    /* <script async src="https://cse.google.com/cse.js?cx=016444093585543128324:madkuzcq8qb"></script>
<div class="gcse-search"></div> */
}
