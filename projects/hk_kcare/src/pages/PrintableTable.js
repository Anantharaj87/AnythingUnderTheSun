import { useState } from 'react'

export default function PrintableTable({theadData, tbodyData}) {

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

		if (row["parametervalue"]) {
               return <tr key={index}>
                   {theadData.map((key, index) => {
			return <td key={index}>{row[key]}</td>;
                   })}
             </tr>;
}


           })}
       </tbody>
   </table>
);
}
