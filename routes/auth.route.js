const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);

module.exports = router;
