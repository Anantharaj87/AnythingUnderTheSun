const mongoose = require("mongoose");

const billableSchema = new mongoose.Schema({
  cost: Number,
  unitname: String,
  billable: Boolean
});

const billable = mongoose.model('billable', billableSchema);
module.exports = billable
