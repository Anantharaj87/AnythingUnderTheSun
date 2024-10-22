const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var cors = require('cors')
const PatientsRoute = require("./src/routes/patientsroute.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/patients", PatientsRoute);

const _database = 'mongodb://hkkcare:hkkcare@127.0.0.1:27017/hkkcare?authSource=hkkcare';

mongoose.connect(_database, {serverSelectionTimeoutMS: 5000})
.catch(err => console.error('Could not connect to MongoDB:‌', err));


mongoose.connection.on('error', err => {
  console.log("error " + err);
});

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

var port = 4000;
app.listen(port);

console.log("HK Kidney care API server running at: " + port);
