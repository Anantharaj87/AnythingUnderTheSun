import { useState } from 'react'

export default function PrintableTable({theadData, tbodyData}) {

/*  const [parameterData, setParameterData] = useState(tbodyData)

  const onChangeInput = (e, parameter) => {
    const { name, value } = e.target
    console.log('name', name)
    console.log('value', value)
    console.log('parameter', parameter)

    const editData = parameterData.map((item) => 
    item.parameter === parameter && name ? { ...item, [name]: value } : item      
    )

    console.log('editData', editData)

    setParameterData(editData)
  } 

if (key == "parametervalue" && row[key]) {
                        	
			}

*/

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
			return <td key={row[key]}>{row[key]}</td>;
                   })}
             </tr>;
}


           })}
       </tbody>
   </table>
);
}
