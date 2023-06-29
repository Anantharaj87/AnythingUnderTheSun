import './PrintableBillingTable.css';

export default function PrintableBillingTable({theadData, billables, patientInfo, timeParams}) {

	
	const getTotalPrice = () => {
	
		 return billables.map(item => item.cost).reduce((prev, next) => prev + next, 0);
	}
	
    return (
    



    
    
		<div style={{fontSize: 7}}>
		
			<table className="table table-borderless table-sm">
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
			
			
			<table className="table table-borderless table-sm">
				<tbody>
				
					<tr>
						<td>Name: </td>
						<td>
							{patientInfo.name}
						</td>

						<td>Age: </td>
						<td>
							{patientInfo.age}
						 	<span>Y</span>
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
			
			<table className="table table-sm">
				<thead>
    				<tr>
    					<th scope="col">#</th>
    					{
    					theadData.map((item, index) => {
    					
    						if(item.toLowerCase() === "price") {
    							return <th scope="col" className="text-end">{item}</th>
    						} else {
    							return <th scope="col">{item}</th>
    						}
    					})
    					}
    				</tr>
  				</thead>
				<tbody>
					
					{
						billables.map((item, index) => {

							return (<tr key = {index}> 
									<th className="w-25" scope="row">{index+1}</th>
									<td className="w-50">
										{item.unitname.toUpperCase()}
									</td>
									<td className="w-50 text-end">
										{item.cost.toFixed(2)}
									</td>
									
								</tr>)

						})
			 
					}
					
				</tbody>
			</table>
			
			<table className="table table-borderless table-sm">
				<tbody>
					<tr>
						<td className="w-50 text-end fw-bold">Total:</td>
						<td className="w-50 text-end fw-bold">Rs. {getTotalPrice().toFixed(2)}</td>
					</tr>
				</tbody>
			</table>

			<table className="table table-borderless table-sm">
				<tbody>
					<tr>
						<td className="w-50 text-start fw-bold"></td>
						<td className="w-50 text-end fw-bold">Signature</td>
					</tr>
				</tbody>
			</table>
		</div>



	)
}
