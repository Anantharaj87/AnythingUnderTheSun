const Patient = require('../models/patient.js');
const asyncHandler = require("express-async-handler");

async function findPatients(inpname) {
  return await Patient.find({name: { $regex: inpname, $options: 'i' }}).sort({ name: 1 });
}


exports.patients_list = asyncHandler(async (req, res, next) => {
  console.log(req.query.name);
  
  var inputname = ""
  if (req.query.name) {
    inputname = req.query.name
  }

  findPatients(inputname).then((patients) => {
    res.send(patients);
  }).catch(err => 
    res.send('Could get data from MongoDB:‌', err)
  );


});