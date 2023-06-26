import './ReportInputTable_plain.css';

export default function ReportInputTable_plain({handleChange, theadData, parameterData, setParameterData, patientInfo, updatePatientInfo}) {

    const getDistinctBranches = () => {
        return parameterData.map(item => item.branch)
            .filter((item, index, arr) => arr.indexOf(item) === index)
    }

    const getDistinctGroups = (branch) => {
        return parameterData.filter((item, index, arr) => {
            return item.branch === branch;
        }).map(item => item.group).filter((item, index, arr) => arr.indexOf(item) === index)
    }

    const getParams = (branch, group) => {
        return parameterData.filter((item, index, arr) => {
            return item.branch === branch && item.group === group;
        })
    }

const computeCellValue = (row, key) => {
	if (key == "parametervalue") {
		return row[key] + " " + (row["ref"]?(row["ref"]["unit"]?row["ref"]["unit"]:""):"");
	} else if (key == "ref") {
		let refval = "";

		if(row["ref"]) {
			if (row["ref"]["range"]) {
				if (row["ref"]["range"]["min"] && row["ref"]["range"]["max"]) {
					refval = row["ref"]["range"]["min"] + " - " + row["ref"]["range"]["max"];
					refval += (row["ref"]["unit"]?(" "+row["ref"]["unit"]):"");
				} else if (row["ref"]["range"]["min"]) {
					refval = ">" + row["ref"]["range"]["min"];
					refval += (row["ref"]["unit"]?(" "+row["ref"]["unit"]):"");
				} else if (row["ref"]["range"]["max"]) {
					refval = "<" + row["ref"]["range"]["max"];
					refval += (row["ref"]["unit"]?(" "+row["ref"]["unit"]):"");
				} else {
				}
			}
		}

		return refval;
	} else {
		return row[key];
	}

}

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


const prepareContent = () => {

	var content = [];

	getDistinctBranches().map((branch, index) => {

			content.push({td1: "", td2: branch.toUpperCase(), td3: "", td2style: {bold: true}});


			getDistinctGroups(branch).map((group, index) => {


					if(group !== "na") {
						content.push({td1: group.toUpperCase(), td2: "", td3: "", td1style: {bold: true}});
					}

					 getParams(branch, group).map((row, index) => {

							content.push({td1: computeCellValue(row, theadData[0]), td2: computeCellValue(row, theadData[1]), td3: computeCellValue(row, theadData[2]), td2data: row});
						
					    })


			})


	})
	
	return content;
	}
	
	const prepareValueUI = (computedData, modelData, computedDataStyle, index) => {
		if (modelData) {
			if(modelData.ref && modelData.ref.group) {
				return (<select key={index} name="parametervalue" onChange={(e) => handleChange(e, modelData["parameter"], modelData["branch"], modelData["group"])} onKeyDown={handleEnter}>
				<option disabled selected value> -- select an option -- </option>
				{
						
		    			modelData.ref.group.map((op, index) => {
							return <option key={index} value={op}>{op}</option>
			    			})
			    			}
					</select>)
			} else { 
				return (<input
				key={index}
				name="parametervalue"
				defaultValue={modelData["parametervalue"]}
				type="text"
				onChange={(e) => handleChange(e, modelData["parameter"], modelData["branch"], modelData["group"])}
				onKeyDown={handleEnter}
				placeholder=""
				/>)
			}
		} else {
			return computedDataStyle && computedDataStyle.bold ? <b>{computedData}</b>: <span>{computedData}</span>
		}
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
						<td><b>LABORATORY REPORT</b></td>
						<td></td>
					</tr>
					
					<tr>
						<td><b>TEST NAME</b></td>
						<td><b>RESULTS/UNITS</b></td>
						<td><b>REFERENCE VALUE</b></td>
					</tr>
					
					{
						prepareContent().map((item, index) => {

							return (<tr key = {index}> 
									<td>
									{
										prepareValueUI(item.td1, item.td1data, item.td1style, index)
									}
									</td>
									<td>
									{
										prepareValueUI(item.td2, item.td2data, item.td2style, index)	
									}
									</td>
									<td>
									{
										prepareValueUI(item.td3, item.td3data, item.td3style, index)
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
