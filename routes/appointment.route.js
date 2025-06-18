const express = require("express");
const router = express.Router({ mergeParams: true });
const appointmentController = require("../controllers/appointment.controller");
const { authenticateToken } = require("../middleware/authMiddleware");
router.get(
  "/getAllAppointmentsBelonged",
  authenticateToken,
  appointmentController.getAllAppointmentsBelonged
);

module.exports = router;
