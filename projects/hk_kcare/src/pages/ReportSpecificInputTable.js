import { useState, useEffect } from 'react'

export default function ReportSpecificInputTable({handleChange, handleBranchChange, handleGroupChange, theadData, tbodyData}) {

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


const [selectedLocalBranch, setLocalBranch] = useState("");
const [selectedLocalGroup, setLocalGroup] = useState("");
const [selectedLocalBranchGroups, setLocalBranchGroups] = useState([]);
const [pickedParams, setPickedParams] = useState([]);

  const handleBranchChangeLocal = (e) => {

    console.log("local branch");
    const { name, value } = e.target
    setLocalBranch(value);

    handleBranchChange(e);
  }

  const handleGroupChangeLocal = (e) => {

    console.log("local group");
    const { name, value } = e.target
    setLocalGroup(value);

    handleGroupChange(e);
  }

useEffect(() => {
	setLocalBranch(getDistinctBranches()[0]);

}, []);

useEffect(() => {
	let curgrp = getDistinctGroups(selectedLocalBranch);

	setLocalBranchGroups(curgrp);
	setLocalGroup(curgrp[0]);

}, [selectedLocalBranch]);

useEffect(() => {
	setPickedParams(getParams(selectedLocalBranch, selectedLocalGroup));

}, [selectedLocalGroup]);

//setLocalBranch(getDistinctBranches()[0]);

 return (
<div>

<select name="branchselector" value={selectedLocalBranch} onChange={(e) => handleBranchChangeLocal(e)}>
    {

	getDistinctBranches().map((branch, index) => {
		return <option key={index} value={branch}>{branch}</option>;
	    })

}
</select>

<select name="groupselector" value={selectedLocalGroup} onChange={(e) => handleGroupChangeLocal(e)}>
    {

	selectedLocalBranchGroups.map((group, index) => {
		return <option key={index} value={group}>{group}</option>;
	    })

}
</select>








<table>
						<thead>
							<tr>
								{theadData.map(heading => {
								return <th key={heading}>{heading}</th>
								})}
							</tr>
						</thead>
						<tbody>
						   {pickedParams.map((row, index) => {
						       return <tr key={index}>
							   {theadData.map((key, index) => {
								if (key != "parametervalue") {
									return <td key={row[key]}>{row[key]}</td>
								} else {
									return (<td key={row[key]}>
										<input
										  name="parametervalue"
										  value={row["parametervalue"]}
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
}


