//import './PrintableReportTable.css';

export default function PrintableBillingTable({theadData, billables, patientInfo, timeParams}) {

	
	const getTotalPrice = () => {
	
		 return billables.map(item => item.cost).reduce((prev, next) => prev + next);
	}
	
    return (
		<div>
		
			<table className="table table-borderless">
				<tbody>
				
					<tr>
						<td className="text-center fw-bold">HK DIAGNOSTIC LAB</td>
					</tr>
					<tr>
						<td className="text-center">HK KIDNEY CARE, #49, DOWLATH NAGAR, VILVARAYANATHAM, CUDDALORE-607001</td>
					</tr>
					<tr>
						<td className="text-center fw-bold">LAB BILL</td>
					</tr>
					<tr>
						<td className="text-center">
							BILL NO - {timeParams.billno}
						</td>
					</tr>
				</tbody>
			</table>
			
			
			<table className="table table-borderless">
				<tbody>
				
					<tr>
						<td>Name: </td>
						<td>
							{patientInfo.name}
						</td>

						<td>Age: </td>
						<td>
							{patientInfo.age}
						 	<span> Years</span>
						 </td>

						<td>Sex: </td>
						<td>
							{patientInfo.sex}
						</td>
					</tr>
					<tr>
						<td>Sample No: </td>
						<td> 
							{patientInfo.sampleno}
						</td>

						<td>OP No: </td>
						<td>
							{patientInfo.opno}
						</td>
						<td>Date: </td>
						<td>
							{timeParams.datetime}
						</td>
					</tr>
					
				</tbody>
			</table>
			
			<table className="table">
				<thead>
    				<tr>
    					<th scope="col">#</th>
    					{
    					theadData.map((item, index) => {
    						return <th scope="col">{item}</th>
    					})
    					}
    				</tr>
  				</thead>
				<tbody>
					
					{
						billables.map((item, index) => {

							return (<tr key = {index}> 
									<th scope="row">{index+1}</th>
									<td>
										{item.unitname.toUpperCase()}
									</td>
									<td>
										{item.cost}
									</td>
									
								</tr>)

						})
			 
					}
					
				</tbody>
			</table>
			
			<table className="table table-borderless">
				<tbody>
					<tr>
						<td className="text-start fw-bold">Total:</td>
						<td className="text-end fw-bold">{getTotalPrice()} Rupees</td>
					</tr>
				</tbody>
			</table>

			<table className="table table-borderless reportfooter">
				<tbody>
					<tr>
						<td className="text-start fw-bold"></td>
						<td className="text-end fw-bold">Signature</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
