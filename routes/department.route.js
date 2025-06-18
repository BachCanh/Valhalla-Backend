const express = require("express");
const router = express.Router({ mergeParams: true });
const departmentController = require("../controllers/department.controller");

router.post(
  "/getDepartmentsBySymptoms",
  departmentController.getDepartmentsBySymptoms
);

module.exports = router;
