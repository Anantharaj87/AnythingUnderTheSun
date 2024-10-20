import './PatientList.css';

export default function PatientList({theadData, allpatients}) {

	
    return (
    
		<div style={{fontSize: 11}}>
		
			<table className="table table-sm">
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
					
						allpatients.map((item, index) => {

							return (<tr key = {index}> 
									<th className="w-auto" scope="row">{index+1}</th>
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
