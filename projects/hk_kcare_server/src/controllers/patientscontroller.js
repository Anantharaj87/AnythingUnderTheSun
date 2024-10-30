const Patient = require('../models/patient.js');
const LabBill = require('../models/labbill.js');
const LabReport = require('../models/labreport.js');
const asyncHandler = require("express-async-handler");

async function findPatients(inpname) {
  return await Patient.find({name: { $regex: inpname, $options: 'i' }}).sort({ name: 1 });
}

async function findPatient(name, age, dob, sex) {
  if (age && age != "") {
    return await Patient.findOne({name: name, age: age, sex: sex});
  } else {

    return await Patient.findOne({name: name, dob: new Date(dob), sex: sex});
  }
}

async function findPatientByID(id) {
    return await Patient.findOne({_id: id});
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

async function editPatient(editedpatient) {

  const findrecord = await findPatientByID(editedpatient._id);

  if (findrecord == null) {
        const lastPatients = await lastPatient();

	var pid = 1;

        if (lastPatients.length != 0) {
		pid = lastPatients[0].p_id + 1            
        }

	return await Patient.create({name: editedpatient.name, age: editedpatient.age, dob: new Date(dob), sex: editedpatient.sex, phno: editedpatient.phno, p_id: pid});

  } else {
	return await Patient.findOneAndUpdate({_id: editedpatient._id}, editedpatient, {upsert: true});
  }
}



async function deletePatients(patientIds) {
	await LabBill.deleteMany({ p_id: { $in: patientIds } });
	await LabReport.deleteMany({ p_id: { $in: patientIds } });

	return await Patient.deleteMany({ p_id: { $in: patientIds } });
}

async function mergePatients(replaceids, destid) {
	await LabBill.updateMany({p_id: { $in: replaceids }}, {"$set":{p_id: destid}});
	await LabReport.updateMany({p_id: { $in: replaceids }}, {"$set":{p_id: destid}});

	return await Patient.deleteMany({ p_id: { $in: replaceids } });
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

exports.delete_patients = asyncHandler(async (req, res, next) => {

  console.log(req.body);

if (req.body) {
  deletePatients(req.body).then((response) => {
    res.send(response);
  }).catch(err =>
    res.status(500).send('Could not delete data from MongoDB:')
  );
} else {
res.status(400).send("Delete patients failed");
}

});

exports.merge_patients = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  if (req.body && req.body.replaceids && req.body.replaceids.length > 0 && req.body.destid && req.body.destid != '') {

   mergePatients(req.body.replaceids, req.body.destid).then((res) => {
	      res.send('success');
	    }).catch(err => {
		console.log(err);
	      res.status(500).send('Couldnot get data from MongoDB:')
	}
    );

  } else {
    res.status(400).send("Merge patients failed");
  }

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

exports.edit_patient = asyncHandler(async (req, res, next) => {

console.log(req.body);

  if (req.body && req.body._id && req.body._id != "") {

 editPatient(req.body).then((patient) => {
      res.send(patient);
    }).catch(err => {
	console.log(err);
      res.status(500).send('Couldnot get data from MongoDB:')
}
    );

  } else {
    res.status(400).send("Edit patient failed");
  }
});


