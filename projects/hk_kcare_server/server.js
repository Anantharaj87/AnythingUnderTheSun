const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const PatientsRoute = require("./src/routes/patientsroute.js");

const app = express();

app.use("/patients", PatientsRoute);

const _database = 'mongodb://hkkcare:hkkcare@localhost:27017/hkkcare?authSource=hkkcare';

mongoose.connect(_database, {})
.then(() => console.log('Connected to MongoDB ...'))
.catch(err => console.error('Could not connect to MongoDB:‌', err));


var port = 4000;
app.listen(port);

console.log("HK Kidney care API server running at: " + port);
