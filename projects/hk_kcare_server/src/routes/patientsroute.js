const express = require("express");
const router = express.Router();

const patients_controller = require("../controllers/patientscontroller");

router.get("/", patients_controller.patients_list);

module.exports = router;