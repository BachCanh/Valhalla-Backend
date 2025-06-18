const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/auth.controller");
router.post("/register", authController.register);
router.post("/isEmailAvailable", authController.isEmailAvailable);
router.post("/login", authController.login);
router.post("/validateJWT", authController.validateJWT);
router.route("/logOut").post(authController.logout);
module.exports = router;
