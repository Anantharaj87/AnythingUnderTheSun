//mongosh -u hkkcare -p hkkcare --authenticationDatabase hkkcare < hkkcare_oldrecords_port_script.js

use hkkcare
//show collections

var srcdir = "/home/pi/Hk_kcare_records/old_records"

const files = fs.readdirSync(srcdir);

files.forEach(function (filename, index) {


	var filepath = path.join(srcdir, filename);
	print(filepath);

	var file = JSON.parse(fs.readFileSync(filepath).toString());

	if (!(file.patientinfo.name == "" && file.patientinfo.age == "" && file.patientinfo.sex == "")) {

		file.patientinfo.name = file.patientinfo.name.replace(/mr.|mr |mrs.|mrs |ms.|ms |dr.|dr /gi, "");
		file.patientinfo.name = file.patientinfo.name.replace(".", "");
		file.patientinfo.name = file.patientinfo.name.trim();

		file.patientinfo.age = file.patientinfo.age.trim();
		file.patientinfo.sex = file.patientinfo.sex.trim();


		var temppinfo = {
			name: file.patientinfo.name,
			age: file.patientinfo.age,
			sex: file.patientinfo.sex
		}

		print(temppinfo);

		
		var findresult = db.patients.findOne(temppinfo);

		var updateresult = db.patients.updateOne(temppinfo,
		      { $set: temppinfo },
		      { upsert: true });


		var idd = null;

		if (findresult != null) {
			idd = findresult._id;
		} else {
			idd = updateresult.insertedId;
		}


		if (filename.indexOf("LABBILL") != -1) {
			var labbillrecord = Object.assign({p_id: idd}, file.patientinfo, file.timebasedparams);
			labbillrecord.billables = file.billables;

			db.labbills.insertOne(labbillrecord);
			
		}


		if (filename.indexOf("LABREPORT") != -1) {
			var labreportrecord = Object.assign({p_id: idd}, file.patientinfo, file.timebasedparams);
			labreportrecord.reportables = file.reportables;

			db.labreports.insertOne(labreportrecord);
		}



	}

	

});


