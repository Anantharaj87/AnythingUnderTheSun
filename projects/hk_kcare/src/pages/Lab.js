import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { useState } from 'react';
import Table from "./Table";
import PrintableTable from "./PrintableTable";
import ReportInputTable from "./ReportInputTable";

function Lab(props) {

/* const handleChange = (e) => {
    console.log("hello " + e.target);
} */


  const [parameterData, setParameterData] = useState(props.labparamsinfo.tests);
  const [getBranch, setBranch] = useState("");
  const [getGroup, setGroup] = useState("");

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

  const handleBranchChange = (e, branch) => {
    const { name, value } = e.target

    setBranch(branch);
  } 

  const handleGroupChange = (e, group) => {
    const { name, value } = e.target

    setGroup(group);
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
        <Table handleChange={handleChange} theadData={["branch", "group", "parameter", "parametervalue"]} tbodyData={props.labparamsinfo.tests} />

//<ReportInputTable handleChange={handleChange} handleBranchChange={handleBranchChange} handleGroupChange={handleGroupChange} theadData={["branch", "group", "parameter", "parametervalue"]} tbodyData={props.labparamsinfo.tests} />
    </div>
  );
}

export default Lab;
