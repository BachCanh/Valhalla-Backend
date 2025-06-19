const express = require("express");
const router = express.Router({ mergeParams: true });
const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middlewares/authMiddleware");
router
  .route("/bookingAppointment")
  .post(
    authMiddleware.authenticateToken,
    appointmentController.bookingAppointment
  );
router.get(
  "/getAllAppointmentsBelonged",
  authMiddleware.authenticateToken,
  appointmentController.getAllAppointmentsBelonged
);

router.post("/cancelAppointment", appointmentController.CancelAppointment);
module.exports = router;
