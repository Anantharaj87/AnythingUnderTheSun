import './ReportInputTable_plain.css';

export default function ReportInputTable_plain({handleChange, theadData, parameterData}) {

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
		<form className="container" style={{fontSize: 14}}>
			<table className="table table-borderless table-sm recordstable">
				<tbody>
									
					<tr>
						<td></td>
						<td><b>LABORATORY REPORT</b></td>
						<td></td>
					</tr>
					
					<tr>
						<td><b>TEST NAME</b></td>
						<td><b>RESULTS/UNITS</b></td>
						<td className="text-end"><b>REFERENCE VALUE</b></td>
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
									<td className="text-end">
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
