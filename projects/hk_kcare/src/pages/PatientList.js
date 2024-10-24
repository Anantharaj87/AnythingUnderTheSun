import './PatientList.css';
import React, { useState, useEffect, useRef } from 'react';
import AlertDialog from "../dialogs/alertdialog";
import ConfirmDialog from "../dialogs/confirmdialog";

export default function PatientList({theadData, allpatients, getServerBaseURL, RefreshPatients}) {

	async function deletePatients() {
		
                return await fetch(getServerBaseURL() + "/patients/delete", {
                  method: "post",
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(selectedPatients.current)
                })
                .then( (response) => { 
                   return response
                });

        }


const onEditClick = (e, pa) => {
console.log(getServerBaseURL());
console.log(e);
console.log(pa);
e.preventDefault();
}

const onMergeClick = (e, pa) => {
console.log(e);
console.log(pa);
e.preventDefault();
}

const onDeleteClick = (e, pa) => {
console.log(e);
console.log(pa);
//e.preventDefault();
handleOpenDeleteDialog();

e.preventDefault();
}

//var selectedPatients = [];
const selectedPatients = useRef([]);

const onCheckChange = (e, val) => {

if (e.target.checked && !selectedPatients.current.includes(val)) {
	selectedPatients.current.push(val);
}

if (!e.target.checked && selectedPatients.current.includes(val)) {
	selectedPatients.current.splice(selectedPatients.current.indexOf(val), 1);
}

console.log(selectedPatients.current);

}



const [opendeletedialog, setOpenDeleteDialog] = React.useState(false);

//const opendeletedialog = useRef(false);

  const handleOpenDeleteDialog = () => {
    console.log("opened");
console.log(selectedPatients.current);
    setOpenDeleteDialog(true);
//opendeletedialog.current = true;
console.log(selectedPatients.current);
  };

  const handleCloseDeleteDialog = (e, choice) => {
    console.log("closed " + choice);
//console.log(selectedPatients.current);
    setOpenDeleteDialog(false);
//opendeletedialog.current = false;
//console.log(selectedPatients.current);

	if (choice == true) {
		deletePatients().then((response) => {
                                console.log(response);
                                

                                if (response.status == 200) {
                                       // setNewPatientInfo({name: "", dob: "", sex: "", phno: ""});
					selectedPatients.current = [];

					RefreshPatients();
                                }
                          }).catch(err =>
                            console.log(err)
                          );

	}
//e.preventDefault();
  };


	
    return (
    
		<div style={{fontSize: 11}}>

			<ConfirmDialog open={opendeletedialog} dialogheader="Confirm" dialogtext="Do you want to delete records?" handleClose={handleCloseDeleteDialog} />

			<table className="table table-sm">
				<tbody>
					<tr>
						<td>
                                                        <button className="btn btn-secondary btn-sm me-2" onClick={(e) => onEditClick(e, this)}>Edit Patient</button>
							<button className="btn btn-secondary btn-sm me-2" onClick={(e) => onMergeClick(e, this)}>Merge Patients</button>
						</td>
                                                <td>
                                                        <button className="btn btn-secondary btn-sm float-end" onClick={(e) => onDeleteClick(e, this)}>Delete Patients</button>
                                                </td>
                                        </tr>
                                        
                                </tbody>
                        </table>

		
			<table className="table table-sm">
				<thead>
    				<tr>
    					<th scope="col">#</th>
    					{
    					theadData.map((item, index) => {
    					
    						return <th key={index} scope="col">{item}</th>
    					})
    					}
    				</tr>
  				</thead>
				<tbody>
					{
					
						allpatients.map((item, index) => {

							return (<tr key={index}> 
									<th className="w-auto" scope="row">{index+1}</th>
									<td className="w-auto">
										<input type="checkbox" onChange={(e) => onCheckChange(e, item._id)} />
									</td>
									<td className="w-auto">
										{item.p_id}
									</td>
									<td className="w-auto">
										{item.name.toUpperCase()}
									</td>
									<td className="w-auto">
										{item.age}
									</td>
									<td className="w-auto">
										{
											item.dob && (new Date(item.dob).toISOString().split("T")[0])
										}
									</td>
									<td className="w-auto">
										{item.sex}
									</td>
									<td className="w-auto text-end">
										{item.phno}
									</td>
									
								</tr>)

						})
			 
					}
					
				</tbody>
			</table>
			
		</div>



	)
}
