import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { useState } from 'react';
import PrintableBillingTable from "./PrintableBillingTable";
import BillingInputTable from "./BillingInputTable";
//import './Lab.css';
import { saveAs } from 'file-saver';

function LabBilling(props) {

const [parameterData, setParameterData] = useState(props.billinginfo.billabletests);
const [childKey, setChildKey] = useState(0);

  const handleChange = (e, unitname) => {
    const { name, value } = e.target

	console.log(unitname + " ::: " + name + " ::: " + value);
	
    const editData = parameterData.map((item) => 
    	(item.unitname === unitname && name) ? { ...item, [name]: value.toUpperCase() } : item      
    )

    setParameterData(editData)
    
    //console.log(parameterData);
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

	
	const getBillableItems = () => {
		return parameterData
            	.filter((item, index, arr) => item.billable && item.billable !== "" && item.billable !== null && item.billable === "YES");
	}
	
	const onClick = (e, pa) => {
		console.log('paramData', parameterData)

		const timeParams = formattedDate();
					
		var blob = new Blob([JSON.stringify({"patientinfo": patientInfo, "timebasedparams": {"datetime": timeParams.datetime, "fnprefix": timeParams.fnprefix, "billno": timeParams.billno}, "billables": getBillableItems()}, null, "\t")], {type: "text/plain;charset=utf-8"});
		
		saveAs(blob, timeParams.fnprefix + "_" + patientInfo.sampleno + "_" + patientInfo.opno + "_" + patientInfo.name + "_LABBILL" + ".json",);
	

		const printElement = ReactDOMServer.renderToString(<PrintableBillingTable theadData={["Investigation", "Price"]} billables={getBillableItems()} patientInfo={patientInfo} timeParams={timeParams}/>);

		var opt = {
		    margin: [0.25, 0.25, 0.25, 0.25],
		    filename: timeParams.fnprefix + "_" + patientInfo.sampleno + "_" + patientInfo.opno + "_" + patientInfo.name + "_LABBILL" + ".pdf",
		    image: { type: "jpeg", quality: 1 },
		    pagebreak: { avoid: "tr", mode: "css", before: "#nextpage1" },
		    html2canvas: { scale: 4, useCORS: true, dpi: 192, letterRendering: true },
		    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
		  };

		  html2pdf().set(opt).from(printElement).save();


		setParameterData(props.billinginfo.billabletests);
		setPatientInfo({name: "", age: "", sex: "", sampleno: "", opno: ""});

		setChildKey(prev => prev + 1);
	}

  return (
    <div>
	<BillingInputTable key={childKey} handleChange={handleChange} theadData={["name", "billable", "cost"]} parameterData={parameterData} setParameterData={setParameterData} patientInfo={patientInfo} updatePatientInfo={updatePatientInfo} formattedDate={formattedDate}/>

<br />
	<button className="btn btn-primary fixedbutton" onClick={(e) => onClick(e, this)}>Save Bill (PDF)</button>
    </div>
  );
}

export default LabBilling;
