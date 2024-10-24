import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function PatientCurrentVisitDetails({updatePatientCurrentVisitInfoCallback}) {
	
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


    return (
		<form className="container" style={{fontSize: 14}}>
			<table className="table table-secondary table-borderless table-sm headertable">
				<tbody>
					<tr>
						<td>Sample No: </td>
						<td> 
							<input
						  	name="sampleno"
						  	
						  	type="text"
						  	onChange={(e) => updatePatientCurrentVisitInfoCallback(e, "sampleno")}
						  	onKeyDown={handleEnter}
							/>
						</td>

						<td>OP No: </td>
						<td>
							<input
						  	name="opno"
						  	
						  	type="text"
						  	onChange={(e) => updatePatientCurrentVisitInfoCallback(e, "opno")}
						  	onKeyDown={handleEnter}
							/>
						</td>
						<td></td>
						<td></td>
					</tr>
					
				</tbody>
			</table>
			
		</form>
	)
}
