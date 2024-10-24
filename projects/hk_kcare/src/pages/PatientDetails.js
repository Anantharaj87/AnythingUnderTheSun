import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function PatientDetails({updatePatientInfoCallback}) {

	const [allPatients, setAllPatients] = useState([]);
	const [value, setValue] = useState({});
	const [inputValue, setInputValue] = useState("");

	function getServerBaseURL() {
	  return window.location.protocol + "//" + window.location.hostname + ":4000";
	}

	async function getAllPatients(namestart) {

		return await fetch(getServerBaseURL() + '/patients/?name=' + namestart).then((response)=>response.json())
			.then((responseJson)=>{return responseJson});
	}

	function RefreshPatients(startname) {

		if (!startname) {
		startname = "";
		}

		getAllPatients(startname).then((patients) => {
		                      console.log(patients);
		                	setAllPatients(patients);
		                  }).catch(err =>
		                    setAllPatients([])
		                  );
	  }

	useEffect(() => {
	  	console.log("1 time");
		RefreshPatients();
	  }, []);


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

	const renderOptions = (props: React.HTMLAttributes<HTMLLIElement>, option: Partial<any>) => {
		return (
			<li {...props} key={option._id}>
			{option.name}
			</li>
		);
	};


    return (
		<form className="container" style={{fontSize: 14}}>
			<table className="table table-secondary table-borderless table-sm headertable">
				<tbody>
				
					<tr>
						<td>Name: </td>
						<td>
							<Autocomplete
							      disablePortal
							      id="combo-box-demo"
							      
								value={value}
								onChange={(event: any, newValue) => {
								  	console.log(newValue);
									setValue(newValue);
									updatePatientInfoCallback(newValue);
								}}
								inputValue={inputValue}
								onInputChange={(event, newInputValue) => {
									console.log("2 " + newInputValue);
								  	setInputValue(newInputValue);
								}}

							      options={allPatients}
							      sx={{ width: 300 }}
							      renderInput={(params) => <TextField {...params} variant="standard" size="small" />}
								getOptionLabel={(option: Partial<any>) => option.name ?? "N/A"}
								renderOption={renderOptions}
							    />
						</td>

						<td>Age: </td>
						<td>
						 	<span>{value && value.age} Years</span>
						 </td>

						<td>Sex: </td>
						<td>
							<span>{value && value.sex}</span>
						</td>
					</tr>
					
				</tbody>
			</table>
		</form>
	)
}
