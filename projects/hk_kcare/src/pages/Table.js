import { useState } from 'react'

export default function Table({handleChange, theadData, tbodyData}) {

 return (
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
                        	return <td key={index}>{row[key]}</td>
			} else {
				return (<td key={index}>
					<input
					key={index}
					  name="parametervalue"
					  defaultValue={row["parametervalue"]}
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
);
}
