//import './ReportInputTable_plain.css';

export default function BillingInputTable({handleChange, theadData, parameterData, setParameterData, patientInfo, updatePatientInfo}) {


	const formattedDate = () => {
		var date = new Date();
		var dateStr =
	  	("00" + date.getDate()).slice(-2) + "/" +
	  	("00" + (date.getMonth() + 1)).slice(-2) + "/" +
	  	date.getFullYear() + " " +
	  	("00" + date.getHours()).slice(-2) + ":" +
	  	("00" + date.getMinutes()).slice(-2) + ":" +
	  	("00" + date.getSeconds()).slice(-2);
	
		return dateStr;
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

    return (
		<form className="container">
		<table className="table table-dark table-borderless headertable">
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
			
			<table className="table table-borderless recordstable">
				<tbody>
									
					<tr>
						<td></td>
						<td><b>Billing</b></td>
						<td></td>
					</tr>
					
					<tr>
						<td><b>TEST NAME</b></td>
						<td><b>BILLABLE</b></td>
						<td><b>COST</b></td>
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
										</select>
									</td>
									<td>
									{
										item.cost
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
