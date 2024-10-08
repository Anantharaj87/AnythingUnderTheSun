const mongoose = require("mongoose");


const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  phno: String,
  address: String,
  p_id: Number
});


const patient = mongoose.model('patient', patientSchema);
module.exports = patient
