const express = require("express");
const router = express.Router();

const labbills_controller = require("../controllers/labbillscontroller");

router.get("/", labbills_controller.bills_list);

router.post("/add", labbills_controller.add_bill);

router.post("/delete", labbills_controller.delete_bills);

module.exports = router;
