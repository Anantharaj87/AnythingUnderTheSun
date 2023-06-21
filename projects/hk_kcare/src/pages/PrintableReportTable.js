import {useState} from 'react'

export default function PrintableReportTable({
    theadData,
    tbodyData
}) {

    const getDistinctBranches = () => {
        return tbodyData.map(item => item.branch)
            .filter((item, index, arr) => arr.indexOf(item) === index)
    };

    const getDistinctGroups = (branch) => {
        return tbodyData.filter((item, index, arr) => {
            return item.branch == branch;
        }).map(item => item.group).filter((item, index, arr) => arr.indexOf(item) === index)
    };

    const getDistinctParams = (branch, group) => {
        return tbodyData.filter((item, index, arr) => {
            return item.branch == branch;
        }).filter((item, index, arr) => {
            return item.group == group;
        }).map(item => item.parameter).filter((item, index, arr) => arr.indexOf(item) === index)
    };

    const getParams = (branch, group) => {
        return tbodyData.filter((item, index, arr) => {
            return item.branch == branch && item.group == group;
        })
    };

    /* getDistinctGroups("clinicalpathology").forEach((group, index1) => {
    		console.log(group);
    	});


    getDistinctBranches().forEach((branch, index) => {
    	console.log(branch);
    	getDistinctGroups(branch).forEach((group, index) => {
    		console.log("	" + group);
    		getDistinctParams(branch, group).forEach((param, index) => {
    			console.log("		" + param);
    		});
    	});
    }); */



    const hasParametersPopulatedForBranch = (branch) => {
        return tbodyData.filter((item, index, arr) => {
            return item.branch == branch;
        }).filter((item, index, arr) => item.parametervalue && item.parametervalue != "" && item.parametervalue != null).length > 0;
    };


    const hasParametersPopulatedForBranchGroup = (branch, group) => {
        return tbodyData.filter((item, index, arr) => {
            return item.branch == branch;
        }).filter((item, index, arr) => {
            return item.group == group;
        }).filter((item, index, arr) => item.parametervalue && item.parametervalue != "" && item.parametervalue != null).length > 0;
    };


    return (
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
								                        return <td key = {index} > {row[key]} </td>
								                    })
								                }
								                </tr>
								        }
								    })
								}
								</tbody>
						        </table>

				                </div>
				            )

}
				        })

				    } 
		            </div>
		        )

		}

            })

        }

        </div>
    )
}
