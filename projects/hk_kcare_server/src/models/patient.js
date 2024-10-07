const mongoose = require("mongoose");


const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  phoneno: String,
  address: String
});


const patient = mongoose.model('patient', patientSchema);
module.exports = patient