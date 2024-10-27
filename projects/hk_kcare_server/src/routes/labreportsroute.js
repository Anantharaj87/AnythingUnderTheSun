const express = require("express");
const router = express.Router();

const labreports_controller = require("../controllers/labreportscontroller");

router.get("/", labreports_controller.reports_list);

router.post("/add", labreports_controller.add_report);

router.post("/delete", labreports_controller.delete_reports);

module.exports = router;
