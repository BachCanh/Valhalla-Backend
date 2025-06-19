const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/authMiddleware");
const patientController = require("../controllers/patient.controller");

router.get(
  "/get",
  authMiddleware.authenticateToken,
  patientController.getPatient
);

router.put(
  "/update",
  authMiddleware.authenticateToken,
  patientController.updatePatient
);

module.exports = router;
