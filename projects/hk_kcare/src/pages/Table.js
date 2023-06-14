import { useState } from 'react'

export default function Table({theadData, tbodyData}) {

  const [parameterData, setParameterData] = useState(tbodyData)

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
                        	return <td key={row[key]}>{row[key]}</td>
			} else {
				return (<td>
					<input
					  name="parametervalue"
					  value={row["parametervalue"]}
					  type="text"
					  onChange={(e) => onChangeInput(e, row["parameter"])}
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
