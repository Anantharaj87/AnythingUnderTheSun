import './PatientList.css';
import React, { useState, useEffect, useRef } from 'react';
import ConfirmDialog from "../dialogs/confirmdialog";
import EditPatientDialog from "../dialogs/editpatientdialog";

export default function PatientList({theadData, allpatients, getServerBaseURL, RefreshPatients}) {

	const selectedPatients = useRef([]);

	async function deletePatients() {
		
                return await fetch(getServerBaseURL() + "/patients/delete", {
                  method: "post",
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(selectedPatients.current.map(a => a._id))
                })
                .then( (response) => { 
                   return response
                });

        }

	const onEditClick = (e) => {
		//console.log(getServerBaseURL());
		//console.log(e);

		//console.log(selectedPatients.current);

		//handleOpenEditDialog();

		e.preventDefault();

		handleOpenEditDialog();
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


	const onCheckChange = (e, val) => {

		if (e.target.checked && selectedPatients.current.find(o => o._id === val._id) == null) {
			selectedPatients.current.push(val);
		}

		if (!e.target.checked && selectedPatients.current.find(o => o._id === val._id) != null) {
			selectedPatients.current.splice(selectedPatients.current.map(e => e._id).indexOf(val._id), 1);
		}

		console.log(selectedPatients.current);

	}



	const [opendeletedialog, setOpenDeleteDialog] = React.useState(false);


	const handleOpenDeleteDialog = () => {
		console.log("opened");
		setOpenDeleteDialog(true);
	};

	const handleCloseDeleteDialog = (e, choice) => {
		console.log("closed " + choice);
		setOpenDeleteDialog(false);

		if (choice == true) {
			deletePatients().then((response) => {
				console.log(response);

				if (response.status == 200) {
					selectedPatients.current = [];

					RefreshPatients();
				}
				}).catch(err =>	console.log(err));
		}
	};

	const [openeditdialog, setOpenEditDialog] = React.useState(false);


	const handleOpenEditDialog = () => {
		console.log("opened");
		setOpenEditDialog(true);
	};

	const handleCloseEditDialog = (e, choice) => {
		console.log("closed " + JSON.stringify(choice));
		setOpenEditDialog(false);

		/*if (choice == true) {
			editPatient().then((response) => {
				console.log(response);

				if (response.status == 200) {
					selectedPatients.current = [];

					RefreshPatients();
				}
				}).catch(err =>	console.log(err));
		}*/
	};


    return (
    
	<form className="container" style={{fontSize: 14}}>


			<ConfirmDialog open={opendeletedialog} dialogheader="Confirm" dialogtext="Do you want to delete records?" handleClose={handleCloseDeleteDialog} />
			<EditPatientDialog open={openeditdialog} dialogheader="Edit" selectedPatients={selectedPatients} handleClose={handleCloseEditDialog} />

			<table className="table table-sm">
				<tbody>
					<tr>
						<td>
                                                        <button className="btn btn-secondary btn-sm me-2" onClick={(e) => onEditClick(e)}>Edit Patient</button>
							<button className="btn btn-secondary btn-sm me-2" onClick={(e) => onMergeClick(e)}>Merge Patients</button>
						</td>
                                                <td>
                                                        <button className="btn btn-secondary btn-sm float-end" onClick={(e) => onDeleteClick(e)}>Delete Patients</button>
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
										<input type="checkbox" onChange={(e) => onCheckChange(e, item)} />
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
			
		</form>



	)
}
