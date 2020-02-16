const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);

module.exports = router;
