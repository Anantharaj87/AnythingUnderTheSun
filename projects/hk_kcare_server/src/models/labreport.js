const mongoose = require("mongoose");
//const reportableSchema = require("./reportable.js");

const reportableSchema = new mongoose.Schema({
  cost: Number,
  branch: String,
  group: String,
  parameter: String,
  parametervalue: String
});

const labreportSchema = new mongoose.Schema({
  p_id: Number,
  datetime: String,
  reportno: String,
  reportables: [reportableSchema]
});


const labreport = mongoose.model('labreport', labreportSchema);
module.exports = labreport
