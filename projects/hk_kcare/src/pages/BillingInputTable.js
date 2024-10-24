import './BillingInputTable.css';
import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function BillingInputTable({handleChange, theadData, parameterData}) {

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
			
			<table className="table table-borderless table-sm recordstable">
				<tbody>
									
					<tr>
						<td></td>
						<td><b>Billing</b></td>
						<td></td>
					</tr>
					
					<tr>
						<td><b>TEST NAME</b></td>
						<td><b>BILLABLE</b></td>
						<td className="text-end"><b>PRICE</b></td>
					</tr>
					
					{
						parameterData.map((item, index) => {

							return (<tr key = {index}> 
									<td>
									{
										item.unitname.toUpperCase()
									}
									</td>
									<td>
										<select name="billable" onChange={(e) => handleChange(e, item["unitname"])} onKeyDown={handleEnter}>
											<option disabled selected value> -- select an option -- </option>
											<option value="yes">YES</option>
											<option value="no">NO</option>
										</select>
									</td>
									<td className="text-end">
									{
										item.cost.toFixed(2)
									}
									</td>
								</tr>)

						})
			 
					}

				</tbody>
			</table>
		</form>
	)
}
