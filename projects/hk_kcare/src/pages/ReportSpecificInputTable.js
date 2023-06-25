import { useState, useEffect } from 'react'
import Table from "./Table";

export default function ReportSpecificInputTable({handleChange, handleBranchChange, handleGroupChange, theadData, parameterData, setParameterData, selectedBranch, setBranch, selectedGroup, setGroup, patientInfo, updatePatientInfo}) {

const getDistinctBranches = () => {
	return parameterData.map(item => item.branch)
  .filter((item, index, arr) => arr.indexOf(item) === index)
};

const getDistinctGroups = (branch) => {
	return parameterData.filter((item, index, arr) => {
		return item.branch == branch;
	}).map(item => item.group).filter((item, index, arr) => arr.indexOf(item) === index)
};

const getDistinctParams = (branch, group) => {
	return parameterData.filter((item, index, arr) => {
		return item.branch == branch;
	}).filter((item, index, arr) => {
		return item.group == group;
	}).map(item => item.parameter).filter((item, index, arr) => arr.indexOf(item) === index)
};

const getParams = (branch, group) => {
	return parameterData.filter((item, index, arr) => {
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


const [selectedLocalBranchGroups, setLocalBranchGroups] = useState([]);
const [pickedParams, setPickedParams] = useState([]);
const [childKey, setChildKey] = useState(0);

useEffect(() => {
	setBranch(getDistinctBranches()[0]);

}, []);

useEffect(() => {
	let curgrp = getDistinctGroups(selectedBranch);

	setLocalBranchGroups(curgrp);
	setGroup(curgrp[0]);

}, [selectedBranch]);

useEffect(() => {
	setPickedParams(getParams(selectedBranch, selectedGroup));

	setChildKey(prev => prev + 1);
	
}, [selectedGroup]);

 return (
<div>
	<div>
		<table>
			<tbody>
				<tr>
					<td>Name:</td>
					<td>
						<input
						  name="name"
						  value={patientInfo.name}
						  type="text"
						  onChange={(e) => updatePatientInfo(e)}
						/>
					</td>
					<td>Age:</td>
					<td>
						<input
						  name="age"
						  defaultValue={patientInfo.age}
						  type="text"
						  onChange={(e) => updatePatientInfo(e)}
						/>
					</td>
				</tr>
				<tr>
					<td>Sex:</td>
					<td>
						<select name="sex" value={patientInfo.sex} onChange={(e) => updatePatientInfo(e)}>
							<option value="MALE">Male</option>
							<option value="FEMALE">Female</option>
							<option value="THIRDGENDER">ThirdGender</option>
						</select>
					
					</td>
					<td>Sample No:</td>
					<td>
						<input
						  name="sampleno"
						  defaultValue={patientInfo.sampleno}
						  type="text"
						  onChange={(e) => updatePatientInfo(e)}
						/>
					</td>
					
				</tr>
			</tbody>
		</table>
	</div>
	<br />
	<div>

		<select name="branchselector" value={selectedBranch} onChange={(e) => handleBranchChange(e)}>
		    {

			getDistinctBranches().map((branch, index) => {
				return <option key={index} value={branch}>{branch}</option>;
			    })

		}
		</select>

		<select name="groupselector" value={selectedGroup} onChange={(e) => handleGroupChange(e)}>
		    {

			selectedLocalBranchGroups.map((group, index) => {
				return <option key={index} value={group}>{group}</option>;
			    })

		}
		</select>


		<Table key={childKey} handleChange={handleChange} theadData={theadData} tbodyData={pickedParams} />


	</div>
</div>
)
}


