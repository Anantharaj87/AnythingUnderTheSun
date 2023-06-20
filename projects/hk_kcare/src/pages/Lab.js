import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { useState } from 'react';
import Table from "./Table";
import PrintableTable from "./PrintableTable";
import ReportInputTable from "./ReportInputTable";
import ReportSpecificInputTable from "./ReportSpecificInputTable";

function Lab(props) {

/* const handleChange = (e) => {
    console.log("hello " + e.target);
} */

  //const [parameterData, setParameterData] = useState(props.labparamsinfo.tests.map(item => ({...item, parametervalue:undefined})));

const [parameterData, setParameterData] = useState(props.labparamsinfo.tests);

  const [selectedBranch, setBranch] = useState("");
  const [selectedGroup, setGroup] = useState("");

  const handleChange = (e, parameter) => {
    const { name, value } = e.target
    //console.log('name', name)
    //console.log('value', value)
    //console.log('parameter', parameter)

    const editData = parameterData.map((item) => 
    item.parameter === parameter && name ? { ...item, [name]: value } : item      
    )

    //console.log('editData', editData)

    setParameterData(editData)
  } 

  const handleBranchChange = (e) => {
    const { name, value } = e.target

/*console.log("brr");
console.log(name);
console.log(value);*/

    setBranch(value);
  } 

  const handleGroupChange = (e, group) => {
    const { name, value } = e.target

/*console.log("grr");
console.log(name);
console.log(value);*/

    setGroup(value);
  } 




	const onClick = (e, pa) => {
		console.log('paramData', parameterData)

		//html2pdf().from("<p>hi</p>").save();

		const printElement = ReactDOMServer.renderToString(<PrintableTable theadData={["branch", "group", "parameter", "parametervalue"]} tbodyData={parameterData} />);

		//const printElement = ReactDOMServer.renderToString(this);

		html2pdf().from(printElement).save();
	}

  return (
    <div>
	<button onClick={(e) => onClick(e, this)}>Save as PDF</button>

<ReportSpecificInputTable handleChange={handleChange} handleBranchChange={handleBranchChange} handleGroupChange={handleGroupChange} theadData={["parameter", "parametervalue"]} parameterData={parameterData} setParameterData={setParameterData} selectedBranch={selectedBranch} setBranch={setBranch} selectedGroup={selectedGroup} setGroup={setGroup} />
    </div>
  );
}

export default Lab;
