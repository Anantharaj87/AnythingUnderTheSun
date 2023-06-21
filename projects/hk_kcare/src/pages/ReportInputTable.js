import { useState } from 'react'

export default function ReportInputTable({handleChange, handleBranchChange, handleGroupChange, theadData, tbodyData}) {

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







 return (
<div>
{

getDistinctBranches().map((branch, index) => {
 return (
	<div>
		<h1 key={branch}>{branch}</h1>
		{


		getDistinctGroups(branch).map((group, index) => {
			return (
				<div>
					<h2>{group}</h2>
					


					<table>
						<thead>
							<tr>
								{theadData.map(heading => {
								return <th key={heading}>{heading}</th>
								})}
							</tr>
						</thead>
						<tbody>
						   {getParams(branch, group).map((row, index) => {
						       return <tr key={index}>
							   {theadData.map((key, index) => {
								if (key != "parametervalue") {
									return <td key={index}>{row[key]}</td>
								} else {
									return (<td key={index}>
										<input
										  name="parametervalue"
										  defaultValue={row["parametervalue"]}
										  type="text"
										  onChange={(e) => handleChange(e, row["parameter"])}
										  placeholder="parameter value"
										/>
									      </td>)
								}
							   })}
						     </tr>
						   })}
						</tbody>
					</table>













				</div>
				)
		})






		}
	</div>
	)
})


}
</div>
)
}


