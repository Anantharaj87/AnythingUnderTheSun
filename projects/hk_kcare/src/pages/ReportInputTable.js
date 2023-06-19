import { useState } from 'react'

export default function ReportInputTable({handleChange, handleBranchChange, handleGroupChange, theadData, tbodyData}) {

 return (
<div>

   <table>
       <thead>
          <tr>
           {theadData.map(heading => {
             return <th key={heading}>{heading}</th>
           })}
         </tr>
       </thead>
       <tbody>
           {tbodyData.map((row, index) => {
               return <tr key={index}>
                   {theadData.map((key, index) => {
			if (key != "parametervalue") {
                        	return <td key={row[key]}>{row[key]}</td>
			} else {
				return (<td>
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
             </tr>;
           })}
       </tbody>
   </table>
</div>
);
}
