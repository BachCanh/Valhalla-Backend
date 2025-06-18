const express = require("express");
const router = express.Router({ mergeParams: true });
const symptomController = require("../controllers/symptom.controller");

router.get("/getAllSymptoms", symptomController.getAllSymptoms);

module.exports = router;
