const express = require("express");
const router = express.Router();
const pathsCtrl = require("../../controllers/paths");
const itinerariesCtrl = require("../../controllers/itineraries");

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: "Not Authorized" });
}

router.use(require("../../config/auth"));
router.get("/", pathsCtrl.index);
router.post("/", pathsCtrl.createPath);
router.put("/:id/update", pathsCtrl.updatePath);
router.put("/:id/update/deleteplace", pathsCtrl.deletePlaceAndUpdatePath);
router.get("/:id", pathsCtrl.showPath);
router.delete("/:id", pathsCtrl.deletePath);
router.post("/:id/itinerary", itinerariesCtrl.createItinerary);
router.delete("/:id/itinerary/:iti_id", itinerariesCtrl.deleteItinerary);

module.exports = router;
