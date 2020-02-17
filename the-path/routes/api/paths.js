const express = require("express");
const router = express.Router();
const pathsCtrl = require("../../controllers/paths");

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: "Not Authorized" });
}

router.use(require("../../config/auth"));
router.get("/", pathsCtrl.index);
router.post("/", pathsCtrl.createPath);
// router.get("/:id", pathsCtrl.showPath);
// router.put("/:id", pathsCtrl.updatePath);
router.delete("/:id", pathsCtrl.deletePath);

module.exports = router;
