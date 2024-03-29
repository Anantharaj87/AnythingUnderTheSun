import './BillingInputTable.css';

export default function BillingInputTable({handleChange, theadData, parameterData, setParameterData, patientInfo, updatePatientInfo, formattedDate}) {
	
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
						<td>Name: </td>
						<td>
							<input 
						  	name="name"
						  	value={patientInfo.name}
						  	type="text"
						  	onChange={(e) => updatePatientInfo(e)}
						  	onKeyDown={handleEnter}
							/>
						</td>

						<td>Age: </td>
						<td>
							<input
						  	name="age"
						  	defaultValue={patientInfo.age}
						  	type="text"
						  	onChange={(e) => updatePatientInfo(e)}
						  	onKeyDown={handleEnter}
							/>
						 	<span> Years</span>
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
						<td>Sample No: </td>
						<td> 
							<input
						  	name="sampleno"
						  	defaultValue={patientInfo.sampleno}
						  	type="text"
						  	onChange={(e) => updatePatientInfo(e)}
						  	onKeyDown={handleEnter}
							/>
						</td>

						<td>OP No: </td>
						<td>
							<input
						  	name="opno"
						  	defaultValue={patientInfo.opno}
						  	type="text"
						  	onChange={(e) => updatePatientInfo(e)}
						  	onKeyDown={handleEnter}
							/>
						</td>
						<td></td>
						<td></td>
					</tr>
					
				</tbody>
			</table>
			
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
										<select key={index} name="billable" onChange={(e) => handleChange(e, item["unitname"])} onKeyDown={handleEnter}>
											<option disabled selected value> -- select an option -- </option>
											<option key={index} value="yes">YES</option>
											<option key={index} value="no">NO</option>
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
