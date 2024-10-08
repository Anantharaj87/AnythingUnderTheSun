const express = require("express");
const router = express.Router();

const patients_controller = require("../controllers/patientscontroller");

router.get("/", patients_controller.patients_list);

router.post("/merge", patients_controller.merge_patients);

router.post("/add", patients_controller.add_patient);

module.exports = router;
