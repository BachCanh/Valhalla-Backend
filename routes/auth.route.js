const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/auth.controller");
router.post("/isEmailAvailable", authController.isEmailAvailable);
router.post("/login", authController.login);

module.exports = router;
