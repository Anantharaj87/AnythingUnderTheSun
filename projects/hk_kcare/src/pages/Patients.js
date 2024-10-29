import './Patients.css';
import ReactDOMServer from 'react-dom/server';
import { useState, useEffect } from 'react';
import PatientList from "./PatientList";
import RegisterNewPatient from "./RegisterNewPatient";

function Patients(props) {

function getServerBaseURL() {
  return window.location.protocol + "//" + window.location.hostname + ":4000";
}

  const [newPatientInfo, setNewPatientInfo] = useState({name: "", dob: "", sex: "", phno: ""});
   const [allPatients, setAllPatients] = useState([]);

  async function getAllPatients(namestart) {


      return await fetch(getServerBaseURL() + '/patients/?name=' + namestart).then((response)=>response.json())
        .then((responseJson)=>{return responseJson});


  }


  function RefreshPatients(startname) {

	if (!startname) {
	startname = newPatientInfo.name;
	}

	setAllPatients([]);

	getAllPatients(startname).then((patients) => {
			//	console.log(patients);
			    setAllPatients(patients);
			  }).catch(err =>
			    setAllPatients([])
			  );
  }



 

  useEffect(() => {
    RefreshPatients("");
  }, []);


  return (
    <div>


	<RegisterNewPatient newPatientInfo={newPatientInfo} setNewPatientInfo={setNewPatientInfo}   getServerBaseURL={getServerBaseURL} RefreshPatients={RefreshPatients} />

	<PatientList theadData={["Select", "Patient ID", "Name", "Age", "DOB (yyyy-mm-dd)", "Sex", "Phone No."]} allpatients={allPatients} getServerBaseURL={getServerBaseURL} RefreshPatients={RefreshPatients}/>

    </div>
  );
}

export default Patients;
