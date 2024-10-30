const Bill = require('../models/labbill.js');
const asyncHandler = require("express-async-handler");

async function findBills(p_id) {
	if (p_id == "") {
  		return await Bill.find({});
	} else {
  		return await Bill.find({p_id: p_id});
	}
}

async function findBill(p_id, billno) {

    return await Bill.findOne({p_id:p_id, billno:billno});
}

async function addBill(p_id, datetime, billno, billables) {

  const findrecord = await findBill(p_id, billno);

  if (findrecord == null) {

    return await Bill.create({p_id:p_id, datetime:datetime, billno:billno, billables:billables});
  } else {
        return await Promise.resolve(findrecord);
  }
}

async function deleteBills(billIds) {
	return await Bill.deleteMany({ _id: { $in: billIds } });
}

exports.bills_list = asyncHandler(async (req, res, next) => {

  var pid = ""
  if (req.query.p_id) {
    pid = req.query.p_id
  }

  findBills(pid).then((bills) => {
    res.send(bills);
  }).catch(err =>
    res.status(500).send('Could not get data from MongoDB:')
  );
});

exports.delete_bills = asyncHandler(async (req, res, next) => {

  console.log(req.body);

if (req.body) {
  deleteBills(req.body).then((response) => {
    res.send(response);
  }).catch(err =>
    res.status(500).send('Could not delete data from MongoDB:')
  );
} else {
res.status(400).send("Delete bills failed");
}

});


exports.add_bill = asyncHandler(async (req, res, next) => {

console.log(req.body);

  if (req.body && req.body.p_id && req.body.p_id != "" && req.body.datetime && req.body.datetime != "" && req.body.billno && req.body.billno != "" && req.body.billables && req.body.billables.length > 0) {

 addBill(req.body.p_id, req.body.datetime, req.body.billno, req.body.billables).then((bill) => {
	console.log(bill);      
	res.send(bill);
    }).catch(err => {
	console.log(err);
      res.status(500).send('Couldnot get data from MongoDB:')
}
    );

  } else {
    res.status(400).send("Add bill failed");
  }
});
