const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/authMiddleware");
const appointmentController = require("../controllers/appointment.controller");
router.route("/bookingAppointment").post(authMiddleware.authenticateToken, appointmentController.bookingAppointment);
router.get(
  "/getAllAppointmentsBelonged",
  authenticateToken,
  appointmentController.getAllAppointmentsBelonged
);
module.exports = router;


