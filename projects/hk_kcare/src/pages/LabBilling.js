import './LabBilling.css';
import ReactDOMServer from 'react-dom/server';
import { useState } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { saveAs } from 'file-saver';
import PatientDetails from "./PatientDetails";
import PatientCurrentVisitDetails from "./PatientCurrentVisitDetails";
import PrintableBillingTable from "./PrintableBillingTable";
import BillingInputTable from "./BillingInputTable";
import AlertDialog from "../dialogs/alertdialog";

function LabBilling(props) {

	const [parameterData, setParameterData] = useState(props.billinginfo.billabletests);
	const [childKey, setChildKey] = useState({id0: 0, id1: 1, id2: 2});
	const [patientInfo, setPatientInfo] = useState({name: "", sex: "", age: ""});
	const [visitInfo, setVisitInfo] = useState({sampleno: "", opno: ""});

	const handleChange = (e, unitname) => {
		const { name, value } = e.target

		console.log(unitname + " ::: " + name + " ::: " + value);

		const editData = parameterData.map((item) => 
		(item.unitname === unitname && name) ? { ...item, [name]: value.toUpperCase() } : item      
		)

		setParameterData(editData)
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
		console.log(getBillableItems().length);
		console.log(patientInfo);

		if (patientInfo != null && patientInfo.name != "" && patientInfo.age != "" && patientInfo.sex != "" && getBillableItems().length > 0) {
			const timeParams = formattedDate();
						
			/* var blob = new Blob([JSON.stringify({"patientinfo": Object.assign(patientInfo, visitInfo), "timebasedparams": {"datetime": timeParams.datetime, "fnprefix": timeParams.fnprefix, "billno": timeParams.billno}, "billables": getBillableItems()}, null, "\t")], {type: "text/plain;charset=utf-8"});
			
			saveAs(blob, timeParams.fnprefix + "_" + visitInfo.sampleno + "_" + visitInfo.opno + "_" + patientInfo.name + "_LABBILL" + ".json",); */
		

			const printElement = ReactDOMServer.renderToString(<PrintableBillingTable theadData={["Investigation", "Price"]} billables={getBillableItems()} patientInfo={Object.assign(patientInfo, visitInfo)} timeParams={timeParams}/>);

			var opt = {
			    margin: [0.25, 0.25, 0.25, 0.25],
			    filename: timeParams.fnprefix + "_" + visitInfo.sampleno + "_" + visitInfo.opno + "_" + patientInfo.name + "_LABBILL" + ".pdf",
			    image: { type: "jpeg", quality: 1 },
			    pagebreak: { avoid: "tr", mode: "css", before: "#nextpage1" },
			    html2canvas: { scale: 4, useCORS: true, dpi: 192, letterRendering: true },
			    jsPDF: { unit: "in", format: "a5", orientation: "landscape" },
			  };

			html2pdf().set(opt).from(printElement).save();

			setChildKey({id0: 3, id1: 4, id2: 5}); /*Rerender to reset the view */
		} else {
			handleOpenAlertDialog();
		}

	}

	const updatePatientInfoCallback = (pinfo) => {
		console.log(pinfo);

		if (pinfo != null) {
			setPatientInfo({name: pinfo.name.toUpperCase(), sex: pinfo.sex.toUpperCase(), age: pinfo.age})
		} else {
			setPatientInfo({name: "", sex: "", age: ""});
		}
	}

	const updatePatientCurrentVisitInfoCallback = (e, param) => {
		console.log(e.target.value);
		console.log(param);

		setVisitInfo(prev => {
			return {...prev, [param]: e.target.value}
		});
	}


	const [openalertdialog, setOpenAlertDialog] = useState(false);


	const handleOpenAlertDialog = () => {
		console.log("opened");
		setOpenAlertDialog(true);
	};

	const handleCloseAlertDialog = (e) => {
		setOpenAlertDialog(false);
	};


  return (
    <div>

	<AlertDialog open={openalertdialog} dialogheader="Error" dialogtext="Patient info or the billables not provided." handleClose={handleCloseAlertDialog} />

	<PatientDetails key={childKey.id0} updatePatientInfoCallback={updatePatientInfoCallback}/>

	<PatientCurrentVisitDetails key={childKey.id1} updatePatientCurrentVisitInfoCallback={updatePatientCurrentVisitInfoCallback}/>

	<BillingInputTable key={childKey.id2} handleChange={handleChange} theadData={["name", "billable", "cost"]} parameterData={parameterData} />

<br />
	<button className="btn btn-primary fixedbutton" onClick={(e) => onClick(e, this)}>Save Bill (PDF)</button>
    </div>
  );
}

export default LabBilling;
