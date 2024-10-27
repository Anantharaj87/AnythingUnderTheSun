const Report = require('../models/labreport.js');
const asyncHandler = require("express-async-handler");

async function findReports(p_id) {
	if (p_id == "") {
		return await Report.find({});
	} else {
		return await Report.find({p_id: p_id});
	}
}

async function findReport(p_id, reportno) {

    return await Report.findOne({p_id:p_id, reportno:reportno});
}

async function addReport(p_id, datetime, reportno, reportables) {

  const findrecord = await findReport(p_id, reportno);

  if (findrecord == null) {

    return await Report.create({p_id:p_id, datetime:datetime, reportno:reportno, reportables:reportables});
  } else {
        return await Promise.resolve(findrecord);
  }
}

async function deleteReports(reportIds) {
	return await Report.deleteMany({ _id: { $in: reportIds } });
}

exports.reports_list = asyncHandler(async (req, res, next) => {

  var pid = ""
  if (req.query.p_id) {
    pid = req.query.p_id
  }

  findReports(pid).then((reports) => {
    res.send(reports);
  }).catch(err =>
    res.status(500).send('Could not get data from MongoDB:')
  );
});

exports.delete_reports = asyncHandler(async (req, res, next) => {

  console.log(req.body);

if (req.body) {
  deleteReports(req.body).then((response) => {
    res.send(response);
  }).catch(err =>
    res.status(500).send('Could not delete data from MongoDB:')
  );
} else {
res.status(400).send("Delete reports failed");
}

});


exports.add_report = asyncHandler(async (req, res, next) => {

console.log(req.body);

  if (req.body && req.body.p_id && req.body.p_id != "" && req.body.datetime && req.body.datetime != "" && req.body.reportno && req.body.reportno != "" && req.body.reportables && req.body.reportables.length > 0) {

 addReport(req.body.p_id, req.body.datetime, req.body.reportno, req.body.reportables).then((report) => {
      res.send(report);
    }).catch(err => {
      res.status(500).send('Couldnot get data from MongoDB:')
}
    );

  } else {
    res.status(400).send("Add report failed");
  }
});
