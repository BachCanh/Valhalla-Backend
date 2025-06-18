const express = require("express");
const router = express.Router({ mergeParams: true });
const doctorController = require("../controllers/doctor.controller");

// Get doctors by department ID
router.get(
  "/by-department/:departmentId",
  doctorController.getDoctorsByDepartment
);

module.exports = router;
