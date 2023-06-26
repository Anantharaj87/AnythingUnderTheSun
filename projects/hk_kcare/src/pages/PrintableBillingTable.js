import './PrintableReportTable.css';

export default function PrintableBillingTable({theadData, tbodyData, patientInfo}) {

	const getBillableItems = () => {
		return tbodyData
            	.filter((item, index, arr) => item.billable && item.billable !== "" && item.billable !== null && item.billable === "YES");
	}
	
	const getTotalPrice = () => {
	
		 return getBillableItems().map(item => item.cost).reduce((prev, next) => prev + next);
	}
	
	const formattedDate = () => {
		var date = new Date();
		var dateStr =
	  	("00" + date.getDate()).slice(-2) + "/" +
	  	("00" + (date.getMonth() + 1)).slice(-2) + "/" +
	  	date.getFullYear() + " " +
	  	("00" + date.getHours()).slice(-2) + ":" +
	  	("00" + date.getMinutes()).slice(-2) + ":" +
	  	("00" + date.getSeconds()).slice(-2);
	
		return dateStr;
	}
	
    return (
		<div>
			<h3 className="text-center fw-bold">HK DIAGNOSTIC LAB</h3>
			
			<p className="text-center">
				HK KIDNEY CARE,
				49, DOWLATH NAGAR,
				VILVARAYANATHAM,
				CUDDALORE-607001
			</p>
		
			<h4 className="text-center fw-bold">LAB BILL</h4>
			
			<table className="table">
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
						{formattedDate()}
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
						getBillableItems().map((item, index) => {

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
			
			<table className="table">
				<tbody>
					<tr>
						<td className="text-start fw-bold">Total:</td>
						<td className="text-end fw-bold">{getTotalPrice()} Rupees</td>
					</tr>
					<tr>
						<td className="text-start fw-bold"></td>
						<td className="text-end fw-bold">Signature</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
