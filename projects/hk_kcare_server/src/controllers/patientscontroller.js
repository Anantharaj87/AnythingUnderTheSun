const Patient = require('../models/patient.js');
const asyncHandler = require("express-async-handler");

async function findPatients(inpname) {
  return await Patient.find({name: { $regex: inpname, $options: 'i' }}).sort({ name: 1 });
}

async function findPatient(name, age, sex) {
  return await Patient.findOne({name: name, age: age, sex: sex});
}

async function lastPatient() {
  return await Patient.find({}).sort({ "_id" : -1.0 }).limit(1);
}

async function addPatient(name, age, sex, phno) {

  const findrecord = await findPatient(name, age, sex);

  if (findrecord == null) {
        const lastPatients = await lastPatient();

        if (lastPatients.length == 0) {
    	  return await Patient.create({name: name, age: age, sex: sex, phno: phno, p_id: 1});
        } else {
          return await Patient.create({name: name, age: age, sex: sex, phno: phno, p_id: lastPatients[0].p_id + 1});
        }

  } else {
        return await Promise.resolve(findrecord);
  }
}

async function mergePatients(tobereplaced_p_ids, dest_p_id) {

}

exports.patients_list = asyncHandler(async (req, res, next) => {

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

exports.merge_patients = asyncHandler(async (req, res, next) => {
  res.send("Merging patients");
});

exports.add_patient = asyncHandler(async (req, res, next) => {

  if (req.body && req.body.name && req.body.name != "" && req.body.age && req.body.sex && req.body.sex != "" && req.body.phoneno && req.body.phoneno != "") {

 addPatient(req.body.name, req.body.age, req.body.sex, req.body.phoneno).then((patient) => {

      res.send(patient);
    }).catch(err =>
      res.send('Could get data from MongoDB: ^`^l', err)
    );

  } else {
    res.send("Add patient failed");
  }
});
