const mongoose = require("mongoose");
//const billableSchema = require("./billable.js");

const billableSchema = new mongoose.Schema({
  cost: Number,
  unitname: String,
  billable: String
});

const labbillSchema = new mongoose.Schema({
  p_id: Number,
  datetime: String,
  billno: String,
  billables: [billableSchema]
});


const labbill = mongoose.model('labbill', labbillSchema);
module.exports = labbill
