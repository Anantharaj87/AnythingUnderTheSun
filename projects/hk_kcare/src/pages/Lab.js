import './Lab.css';
import ReactDOMServer from 'react-dom/server';
import { useState } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { saveAs } from 'file-saver';
import PrintableReportTable from "./PrintableReportTable";
import ReportInputTable_plain from "./ReportInputTable_plain";

function Lab(props) {

const [parameterData, setParameterData] = useState(props.labparamsinfo.tests);
const [childKey, setChildKey] = useState(0);

  const handleChange = (e, parameter, branch, group) => {
    const { name, value } = e.target

    const editData = parameterData.map((item) => 
    	(item.parameter === parameter && item.branch === branch && item.group === group && name) ? { ...item, [name]: value.toUpperCase() } : item      
    )

    setParameterData(editData)
  } 


const [patientInfo, setPatientInfo] = useState({name: "", age: "", sex: "", sampleno: "", opno: ""});

const updatePatientInfo = (e) => {
const { name, value } = e.target

	setPatientInfo(prev => {
		return {...prev, [name]: value.toUpperCase()}
	});

	console.log(patientInfo);
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

	var fnStr =
	  date.getFullYear() + 
	  ("00" + (date.getMonth() + 1)).slice(-2) +
	  ("00" + date.getDate()).slice(-2) + "_" +
	  ("00" + date.getHours()).slice(-2) +
	  ("00" + date.getMinutes()).slice(-2) +
	  ("00" + date.getSeconds()).slice(-2);


		var billStr = "B" +
	    date.getFullYear() + 
	    ("00" + (date.getMonth() + 1)).slice(-2) +
	    ("00" + date.getDate()).slice(-2) +
	  	("00" + date.getHours()).slice(-2) +
	  	("00" + date.getMinutes()).slice(-2) +
	  	("00" + date.getSeconds()).slice(-2);
	  	
	  	var reportStr = "R" +
	    date.getFullYear() + 
	    ("00" + (date.getMonth() + 1)).slice(-2) +
	    ("00" + date.getDate()).slice(-2) +
	  	("00" + date.getHours()).slice(-2) +
	  	("00" + date.getMinutes()).slice(-2) +
	  	("00" + date.getSeconds()).slice(-2);
	
		return {"datetime": dateStr, "fnprefix": fnStr, "billno": billStr, "reportno": reportStr};
	}

	const getReportableItems = () => {
		return parameterData
            	.filter((item, index, arr) => item.parametervalue);
	}

	const onClick = (e, pa) => {
		console.log('paramData', parameterData)
		
		const timeParams = formattedDate();
		
			var blob = new Blob([JSON.stringify({"patientinfo": patientInfo, "timebasedparams": {"datetime": timeParams.datetime, "fnprefix": timeParams.fnprefix, "reportno": timeParams.reportno}, "reportables": getReportableItems()}, null, "\t")], {type: "text/plain;charset=utf-8"});
		
		saveAs(blob, timeParams.fnprefix + "_" + patientInfo.sampleno + "_" + patientInfo.opno + "_" + patientInfo.name + "_LABREPORT" + ".json",);
	

		const printElement = ReactDOMServer.renderToString(<PrintableReportTable theadData={["parameter", "parametervalue", "ref"]} tbodyData={parameterData} patientInfo={patientInfo} timeParams={timeParams}/>);

		var opt = {
		    margin: props.properties.pdf_margin,
		    filename: timeParams.fnprefix + "_" + patientInfo.sampleno + "_" + patientInfo.opno + "_" + patientInfo.name + "_LABREPORT" + ".pdf",
		    image: { type: "jpeg", quality: 1 },
		    pagebreak: { avoid: "tr", mode: "css", before: "#nextpage1" },
		    html2canvas: { scale: 4, useCORS: true, dpi: 192, letterRendering: true },
		    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
		  };

		  html2pdf().set(opt).from(printElement).save();

		/* const printElement = ReactDOMServer.renderToString(<PrintableReportTable theadData={["parameter", "parametervalue", "ref"]} tbodyData={parameterData} patientInfo={patientInfo} timeParams={timeParams}/>);
		
var blob = new Blob([printElement], {type: "text/plain;charset=utf-8"});
		
		saveAs(blob, "check1.txt",); */
		

		setParameterData(props.labparamsinfo.tests);
		setPatientInfo({name: "", age: "", sex: "", sampleno: "", opno: ""});

		setChildKey(prev => prev + 1);
	}

  return (
    <div>
	<ReportInputTable_plain key={childKey} handleChange={handleChange} theadData={["parameter", "parametervalue", "ref"]} parameterData={parameterData} setParameterData={setParameterData} patientInfo={patientInfo} updatePatientInfo={updatePatientInfo} formattedDate={formattedDate}/>

<br />
	<button className="btn btn-primary fixedbutton" onClick={(e) => onClick(e, this)}>Save Report (PDF)</button>
    </div>
  );
}

export default Lab;
