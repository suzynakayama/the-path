const express = require("express");
const router = express.Router();
const searchYelpAPICtrl = require("../../controllers/searchYelpAPI");
const googleSearchAPICtrl = require("../../controllers/googleSearchAPI");

router.get("/", searchYelpAPICtrl.searchTerms);
router.get("/google", googleSearchAPICtrl.searchTerms);

module.exports = router;
