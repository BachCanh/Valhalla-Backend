const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");
router.post("/register", authController.register);
router.post("/isEmailAvailable", authController.isEmailAvailable);
router.post("/login", authController.login);
router.post("/validateJWT", authController.validateJWT);
router.route("/logOut").post(authController.logout);
router.post(
  "/changePassword",
  authMiddleware.authenticateToken,
  authController.changePassword
);
module.exports = router;
