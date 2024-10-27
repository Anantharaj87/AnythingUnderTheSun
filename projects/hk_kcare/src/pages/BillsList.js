import './PatientList.css';
import React, { useState, useEffect, useRef } from 'react';
import AlertDialog from "../dialogs/alertdialog";
import ConfirmDialog from "../dialogs/confirmdialog";

export default function BillsList({theadData, allbills, getServerBaseURL, RefreshBills}) {

	

	
    return (
    
		<div style={{fontSize: 11}}>

			

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
					
						allbills.map((item, index) => {

							return (<tr key={index}> 
									<th className="w-auto" scope="row">{index+1}</th>
									
									<td className="w-auto">
										{item.datetime}
									</td>
									<td className="w-auto">
										{item.name}
									</td>
									<td className="w-auto">
										{item.p_id}
									</td>
									<td className="w-auto">
										{item.billno}
									</td>
									
									
								</tr>)

						})
			 
					}
					
				</tbody>
			</table>
			
		</div>



	)
}
