const express = require("express");
const router = express.Router({ mergeParams: true });
const appointmentController = require("../controllers/appointment.controller");

router.get("/:doctorId/busyDates", appointmentController.getDoctorBusyDates);

module.exports = router;
