const express = require("express");
const router = express.Router({ mergeParams: true });

const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middlewares/authMiddleware");

// Booking appointment (Patient)
router.post(
  "/bookingAppointment",
  authMiddleware.authenticateToken,
  appointmentController.bookingAppointment
);

// Get all appointments for a logged-in user (Patient or Doctor)
router.get(
  "/getAllAppointmentsBelonged",
  authMiddleware.authenticateToken,
  appointmentController.getAllAppointmentsBelonged
);

router.post("/cancelAppointment", appointmentController.cancelAppointment);

router.get(
  "/getAllAppointmentForDoctor",
  authMiddleware.authenticateToken,
  authMiddleware.isDoctor,
  appointmentController.getAllAppointmentsOfDoctor
);

// Adjust appointment status (Doctor only)
router.put(
  "/adjustStatus",
  authMiddleware.authenticateToken,
  authMiddleware.isDoctor,
  appointmentController.adjustStatus
);

module.exports = router;
