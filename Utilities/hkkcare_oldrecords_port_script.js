//mongosh -u hkkcare -p hkkcare --authenticationDatabase hkkcare < hkkcare_oldrecords_port_script.js

use hkkcare

var srcdir = "/home/pi/Hk_kcare_records/old_records"

const files = fs.readdirSync(srcdir);

files.forEach(function (filename, index) {


	var filepath = path.join(srcdir, filename);

	var file = JSON.parse(fs.readFileSync(filepath).toString());

	if (!(file.patientinfo.name == "" && file.patientinfo.age == "" && file.patientinfo.sex == "")) {

		file.patientinfo.name = file.patientinfo.name.replace(/mr.|mr |mrs.|mrs |ms.|ms |dr.|dr /gi, "");
		file.patientinfo.name = file.patientinfo.name.replace(".", "");
		file.patientinfo.name = file.patientinfo.name.trim();

		file.patientinfo.age = Number(file.patientinfo.age.trim());
		file.patientinfo.sex = file.patientinfo.sex.trim();


		var temppinfo = {
			name: file.patientinfo.name,
			age: file.patientinfo.age,
			sex: file.patientinfo.sex
		}

               var lastrecord = db.patients.find({}).sort({ "_id" : -1.0 }).limit(1).toArray();

	       var tempid = 1;
               if (lastrecord.length == 0) {
			tempid = 1;
                        temppinfo.p_id = tempid;
                        db.patients.insertOne(temppinfo);
                } else {

			var findrecord = db.patients.findOne(temppinfo);
			if (findrecord == null) {
				tempid = lastrecord[0].p_id + 1;
				temppinfo.p_id = tempid;
                        	db.patients.insertOne(temppinfo);
			} else {
				tempid = findrecord.p_id;
			}
                }

		if (filename.indexOf("LABBILL") != -1) {
			var labbillrecord = Object.assign({p_id: tempid}, file.patientinfo, file.timebasedparams);
			labbillrecord.billables = file.billables;

			db.labbills.insertOne(labbillrecord);
		}


		if (filename.indexOf("LABREPORT") != -1) {
			var labreportrecord = Object.assign({p_id: tempid}, file.patientinfo, file.timebasedparams);
			labreportrecord.reportables = file.reportables;

			db.labreports.insertOne(labreportrecord);
		}



	}

	

});


