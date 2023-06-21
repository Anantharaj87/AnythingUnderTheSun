
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

    return (
<div>
	<div>
		<table>
			<tbody>
				<tr>
					<td>Name: {patientInfo.name}</td>
					<td>Age: {patientInfo.age}</td>
					<td>Sex: {patientInfo.sex}</td>
				</tr>
				<tr>
					<td>Sample No: {patientInfo.sampleno}</td>
					<td>Date: {(new Date()).toString()}</td>
				</tr>
			</tbody>
		</table>
		<br />
		<h1>LABORATORY REPORT</h1>
		<table>
			<tbody>
				<tr>
					<td>TEST NAME</td>
					<td>RESULTS/UNITS</td>
					<td>REFERENCE VALUE</td>
				</tr>
			</tbody>
		</table>
	</div>

        <div> {

            getDistinctBranches().map((branch, index) => {
                
		if (hasParametersPopulatedForBranch(branch)) {
			return (
		            <div>

				    <h1 key={index}> {branch} </h1>

				    {
				        getDistinctGroups(branch).map((group, index) => {

					if (hasParametersPopulatedForBranchGroup(branch, group)) {
				            return (
				                <div>

				                	<h2 key={index}> {group} < /h2>
				                
						        <table>
								<thead>
								<tr> {
								    theadData.map(heading => {
								        return <th key={heading}></th>
								    })
								}
								</tr>
								</thead>
								<tbody> {
								    getParams(branch, group).map((row, index) => {

								        if (row["parametervalue"]) {
								            return <tr key = {index}> 
										{
								                    theadData.map((key, index) => {
								                        return <td key = {index} > {computeCellValue(row, key)} </td> 
								                    })
								                }
								                </tr>
								        } else {
										return;
									}
								    })
								}
								</tbody>
						        </table>

				                </div>
				            )

					} else {
						return;
					}
				        })

				    } 
		            </div>
		        )

		} else { return;}

            })

        }

        </div>
</div>
    )
}
