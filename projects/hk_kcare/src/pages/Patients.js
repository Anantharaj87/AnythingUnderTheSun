import './Patients.css';
import ReactDOMServer from 'react-dom/server';
import { useState, useEffect } from 'react';
import PatientList from "./PatientList";
import AlertDialog from "../dialogs/alertdialog";

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

	async function addNewPatient() {
console.log(JSON.stringify(newPatientInfo));

		return await fetch(getServerBaseURL() + "/patients/add", {
		  method: "post",
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(newPatientInfo)
		})
		.then( (response) => { 
		   return response
		});

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

  const updatePatientInfo = (e) => {
	const { name, value } = e.target

		setNewPatientInfo(prev => {
			return {...prev, [name]: value.toUpperCase()}
		});

		//console.log(name);
		console.log(newPatientInfo);

		if (name == "name") {
			RefreshPatients(value);
		}
	}

  const onClick = (e, pa) => {
	//console.log(newPatientInfo);

	addNewPatient().then((response) => {
				console.log(response);
                                RefreshPatients(newPatientInfo.name);

				if (response.status == 200) {
					setNewPatientInfo({name: "", dob: "", sex: "", phno: ""});
				}
			  }).catch(err =>
			    console.log(err)
			  );

	//e.preventDefault();
  }

  function handleEnter(event) {
  	if (event.keyCode === 13) {
    	const form = event.target.form;
    	const index = Array.prototype.indexOf.call(form, event.target);
    	
    	if(index < form.elements.length - 1) {
    		form.elements[index + 1].focus();
    		event.preventDefault();
    	}
    	
  	}
	}

  useEffect(() => {
    RefreshPatients("");
  }, []);





  return (
    <div>

<form className="container" style={{fontSize: 14}}>



<table className="table table-secondary table-borderless table-sm headertable">
				<tbody>
				
					<tr>
						<td>Name: </td>
						<td>
							<input 
						  	name="name"
						  	value={newPatientInfo.name}
						  	type="text"
						  	onChange={(e) => updatePatientInfo(e)}
						  	onKeyDown={handleEnter}
							/>
						</td>





						<td>DOB: </td>
						<td>
							<input 
						  	name="dob"
						  	value={newPatientInfo.dob}
						  	type="date"
						  	onChange={(e) => updatePatientInfo(e)}
						  	onKeyDown={handleEnter}
							/>
						 </td>

						<td>Sex: </td>
						<td>
							<select name="sex" onChange={(e) => updatePatientInfo(e)} onKeyDown={handleEnter}>
								<option disabled selected value> -- select an option -- </option>
								<option value="MALE">Male</option>
								<option value="FEMALE">Female</option>
								<option value="THIRDGENDER">ThirdGender</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Phone No: </td>
						<td> 
							<input 
						  	name="phno"
						  	value={newPatientInfo.phno}
						  	type="text"
						  	onChange={(e) => updatePatientInfo(e)}
						  	onKeyDown={handleEnter}
							/>
						</td>

						<td></td>
						<td>
							<button className="btn btn-primary btn-sm" onClick={(e) => onClick(e, this)}>Add New Patient</button>
						</td>
						<td></td>
						<td></td>
					</tr>
					
				</tbody>
			</table>

	

	<PatientList theadData={["Select", "Patient ID", "Name", "Age", "DOB (yyyy-mm-dd)", "Sex", "Phone No."]} allpatients={allPatients} getServerBaseURL={getServerBaseURL} RefreshPatients={RefreshPatients}/>

        
</form>
    </div>
  );
}

export default Patients;
