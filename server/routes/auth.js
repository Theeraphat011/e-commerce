// import
const express = require("express");
const router = express.Router();
const { register, login, currentuser } = require("../controller/auth");
const { authCheck, adminCheck } = require("../middleweres/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/current-user", authCheck, currentuser);
router.post("/current-admin", authCheck, adminCheck, currentuser);

module.exports = router; // export the router
