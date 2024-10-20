const Patient = require('../models/patient.js');
const asyncHandler = require("express-async-handler");

async function findPatients(inpname) {
  return await Patient.find({name: { $regex: inpname, $options: 'i' }}).sort({ name: 1 });
}

async function findPatient(name, age, dob, sex) {
  if (age && age != "") {
    return await Patient.findOne({name: name, age: age, sex: sex});
  } else {

  //const s = '01-01-1970Z';
  //const d = new Date(s);
  //console.log(d);



    return await Patient.findOne({name: name, dob: new Date(dob), sex: sex});
  }
}

async function lastPatient() {
  return await Patient.find({}).sort({ "_id" : -1.0 }).limit(1);
}

async function addPatient(name, age, dob, sex, phno) {

  const findrecord = await findPatient(name, age, dob, sex);

  if (findrecord == null) {
        const lastPatients = await lastPatient();

        if (lastPatients.length == 0) {
          if (age && age != "") {
    	    return await Patient.create({name: name, age: age, sex: sex, phno: phno, p_id: 1});
          } else {
            return await Patient.create({name: name, dob: new Date(dob), sex: sex, phno: phno, p_id: 1});
          }
        } else {
          if (age && age != "") {
            return await Patient.create({name: name, age: age, sex: sex, phno: phno, p_id: lastPatients[0].p_id + 1});
          } else {
            return await Patient.create({name: name, dob: new Date(dob), sex: sex, phno: phno, p_id: lastPatients[0].p_id + 1});
          }
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
    res.status(500).send('Could not get data from MongoDB:')
  );


});

exports.merge_patients = asyncHandler(async (req, res, next) => {
  res.send("Merging patients");
});

exports.add_patient = asyncHandler(async (req, res, next) => {

console.log(req.body);

  if (req.body && req.body.name && req.body.name != "" && (req.body.age || req.body.dob) && (req.body.age != "" || req.body.dob != "") && req.body.sex && req.body.sex != "" && req.body.phno && req.body.phno != "") {

 addPatient(req.body.name, req.body.age, req.body.dob, req.body.sex, req.body.phno).then((patient) => {
      res.send(patient);
    }).catch(err => {
      res.status(500).send('Couldnot get data from MongoDB:')
}
    );

  } else {
    res.status(400).send("Add patient failed");
  }
});
