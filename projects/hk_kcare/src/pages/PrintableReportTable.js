import './PrintableReportTable.css';

export default function PrintableReportTable({theadData, tbodyData, patientInfo}) {

    const getDistinctBranches = () => {
        return tbodyData.map(item => item.branch)
            .filter((item, index, arr) => arr.indexOf(item) === index)
    }

    const getDistinctGroups = (branch) => {
        return tbodyData.filter((item, index, arr) => {
            return item.branch === branch;
        }).map(item => item.group).filter((item, index, arr) => arr.indexOf(item) === index)
    }

    const getParams = (branch, group) => {
        return tbodyData.filter((item, index, arr) => {
            return item.branch === branch && item.group === group;
        })
    }

    const hasParametersPopulatedForBranch = (branch) => {
        return tbodyData.filter((item, index, arr) => {
            return item.branch === branch;
        }).filter((item, index, arr) => item.parametervalue && item.parametervalue !== "" && item.parametervalue !== null).length > 0;
    }


    const hasParametersPopulatedForBranchGroup = (branch, group) => {
        return tbodyData.filter((item, index, arr) => {
            return item.branch === branch;
        }).filter((item, index, arr) => {
            return item.group === group;
        }).filter((item, index, arr) => item.parametervalue && item.parametervalue !== "" && item.parametervalue !== null).length > 0;
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

		var billStr = "R" +
	  	("00" + date.getDate()).slice(-2) +
	  	("00" + (date.getMonth() + 1)).slice(-2) +
	  	date.getFullYear() +
	  	("00" + date.getHours()).slice(-2) +
	  	("00" + date.getMinutes()).slice(-2) +
	  	("00" + date.getSeconds()).slice(-2);
	
		return {"datetime": dateStr, "reportno": billStr};
	}


const prepareContent = () => {

	var content = [];

	content.push({td1: "Name: " + patientInfo.name, td2: "Age: " + patientInfo.age + " years", td3: "Sex: " + patientInfo.sex});
	content.push({td1: "Sample No: " + patientInfo.sampleno, td2: "OP No: " + patientInfo.opno, td3: "Date: " + formattedDate().datetime});
	content.push({td1: "", td2: "LABORATORY REPORT", td3: "Report No: " + formattedDate().reportno, td2style: {bold: true}});
	content.push({td1: "TEST NAME", td2: "RESULTS/UNITS", td3: "REFERENCE VALUE", td1style: {bold: true}, td2style: {bold: true}, td3style: {bold: true}});

	getDistinctBranches().map((branch, index) => {

		if (hasParametersPopulatedForBranch(branch)) {
			content.push({td1: "", td2: branch.toUpperCase(), td3: "", td2style: {bold: true}});


			getDistinctGroups(branch).map((group, index) => {

				if (hasParametersPopulatedForBranchGroup(branch, group)) {

					if(group !== "na") {
						content.push({td1: group.toUpperCase(), td2: "", td3: "", td1style: {bold: true}});
					}

					 getParams(branch, group).map((row, index) => {

						if (row["parametervalue"]) {

							content.push({td1: computeCellValue(row, theadData[0]), td2: computeCellValue(row, theadData[1]), td3: computeCellValue(row, theadData[2])});
						}
					    })

				}

			})

		}

	})
	
	return content;
	}

    return (
		<div>
			<table className="table table-borderless">
				<tbody>
					
					{
						prepareContent().map((item, index) => {

							return (<tr key = {index}> 
									<td>
										{item.td1style && item.td1style.bold ? <b>{item.td1}</b>: <span>{item.td1}</span>}
									</td>
									<td>
										{item.td2style && item.td2style.bold ? <b>{item.td2}</b>: <span>{item.td2}</span>}
									</td>
									<td>
										{item.td3style && item.td3style.bold ? <b>{item.td3}</b>: <span>{item.td3}</span>}
									</td>
								</tr>)

						})
			 
					}
					
				</tbody>
			</table>
			
			<table className="table table-borderless reportfooter">
				<tbody>
					<tr>
						<td className="text-start fw-bold">Lab Technician</td>
						<td className="text-end fw-bold">Verified by</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
