import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { useState } from 'react';
import Table from "./Table";
import PrintableTable from "./PrintableTable";
import ReportInputTable from "./ReportInputTable";
import ReportSpecificInputTable from "./ReportSpecificInputTable";
import PrintableReportTable from "./PrintableReportTable";

function Lab(props) {

const [parameterData, setParameterData] = useState(props.labparamsinfo.tests);

  const [selectedBranch, setBranch] = useState("");
  const [selectedGroup, setGroup] = useState("");
const [childKey, setChildKey] = useState(0);

  const handleChange = (e, parameter, branch, group) => {
    const { name, value } = e.target

    const editData = parameterData.map((item) => 
    	(item.parameter === parameter && item.branch === branch && item.group === group && name) ? { ...item, [name]: value } : item      
    )

    setParameterData(editData)
  } 

  const handleBranchChange = (e) => {
    const { name, value } = e.target

    setBranch(value);
  } 

  const handleGroupChange = (e, group) => {
    const { name, value } = e.target

    setGroup(value);
  } 


const [patientInfo, setPatientInfo] = useState({name: "", age: "", sex: "", sampleno: ""});

const updatePatientInfo = (e) => {
const { name, value } = e.target

	setPatientInfo(prev => {
		return {...prev, [name]: value}
	});

	console.log(patientInfo);
}

	const onClick = (e, pa) => {
		console.log('paramData', parameterData)

		const printElement = ReactDOMServer.renderToString(<PrintableReportTable theadData={["parameter", "parametervalue", "ref"]} tbodyData={parameterData} patientInfo={patientInfo}/>);

		var opt = {
		    margin: [0, -0.1, 0, 0],
		    filename: patientInfo.name + ".pdf",
		    image: { type: "jpeg", quality: 1 },
		    pagebreak: { avoid: "tr", mode: "css", before: "#nextpage1" },
		    html2canvas: { scale: 4, useCORS: true, dpi: 192, letterRendering: true },
		    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
		  };

		  html2pdf().set(opt).from(printElement).save();


		setParameterData(props.labparamsinfo.tests);
		setPatientInfo({name: "", age: "", sex: "", sampleno: ""});

		setChildKey(prev => prev + 1);
	}

  return (
    <div>
	<ReportSpecificInputTable key={childKey} handleChange={handleChange} handleBranchChange={handleBranchChange} handleGroupChange={handleGroupChange} theadData={["parameter", "parametervalue"]} parameterData={parameterData} setParameterData={setParameterData} selectedBranch={selectedBranch} setBranch={setBranch} selectedGroup={selectedGroup} setGroup={setGroup} patientInfo={patientInfo} updatePatientInfo={updatePatientInfo}/>

<br />
	<button onClick={(e) => onClick(e, this)}>Generate Report</button>
    </div>
  );
}

export default Lab;
