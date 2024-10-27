const mongoose = require("mongoose");

const reportableSchema = new mongoose.Schema({
  cost: Number,
  branch: String,
  group: String,
  parameter: String,
  parametervalue: String
});

const reportable = mongoose.model('reportable', reportableSchema);
module.exports = reportable
