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
router.get("/:id", pathsCtrl.showPath);
router.put("/:id", pathsCtrl.updatePath);
router.delete("/:id", pathsCtrl.deletePath);
router.post("/:id/itinerary", itinerariesCtrl.createItinerary);
router.delete("/:id/itinerary/:iti_id", itinerariesCtrl.deleteItinerary);

module.exports = router;
