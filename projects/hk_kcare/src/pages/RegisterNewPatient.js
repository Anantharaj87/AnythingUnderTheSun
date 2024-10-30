import React, { useState, useEffect } from 'react';
import AlertDialog from "../dialogs/alertdialog";

export default function RegisterNewPatient({newPatientInfo, setNewPatientInfo, getServerBaseURL, RefreshPatients}) {


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
                                

				if (response.status == 200) {
					
					setNewPatientInfo({name: "", dob: "", sex: "", phno: ""});
					RefreshPatients();
				} else {
					handleOpenAlertDialog();
				}
			  }).catch(err => {
			    	console.log(err);
				handleOpenAlertDialog();
				}
			  );

		e.preventDefault();
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


	const [openalertdialog, setOpenAlertDialog] = useState(false);


	const handleOpenAlertDialog = () => {
		console.log("opened");
		setOpenAlertDialog(true);
	};

	const handleCloseAlertDialog = (e) => {
		setOpenAlertDialog(false);
	};


    return (
		<form className="container" style={{fontSize: 14}}>

			<AlertDialog open={openalertdialog} dialogheader="Error" dialogtext="Registration failed. Provide all required info." handleClose={handleCloseAlertDialog} />

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
							<button className="btn btn-primary btn-sm" onClick={(e) => onClick(e, this)}>Register Patient</button>
						</td>
						<td></td>
						<td></td>
					</tr>
					
				</tbody>
			</table>
		</form>
	)
}
