import './LabBilling.css';
import ReactDOMServer from 'react-dom/server';
import { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { saveAs } from 'file-saver';
import PatientDetails from "./PatientDetails";
import ReportsList from "./ReportsList";
import AlertDialog from "../dialogs/alertdialog";

function LabReportsHistory(props) {

	const [childKey, setChildKey] = useState({id0: 0, id1: 1, id2: 2});
	const [patientInfo, setPatientInfo] = useState({p_id: ""});
	const [allReports, setAllReports] = useState([]);

	function getServerBaseURL() {
	  return window.location.protocol + "//" + window.location.hostname + ":4000";
	}

	async function getAllReports(p_id) {

		return await fetch(getServerBaseURL() + '/reports/?p_id=' + p_id).then((response)=>response.json())
		.then((responseJson)=>{return responseJson});


	}

	function RefreshReports(p_id) {

		if (!p_id) {
			p_id = patientInfo.p_id;
		}

		setAllReports([]);

		getAllReports(p_id).then((reports) => {
			//	console.log(reports);
			setAllReports(reports);
			}).catch(err =>
			setAllReports([])
		);
	}

	const updatePatientInfoCallback = (pinfo) => {

		console.log(pinfo);
		if (pinfo != null) {
			setPatientInfo({p_id: pinfo.p_id})

			RefreshReports(pinfo.p_id);
		} else {
			setPatientInfo({p_id: 0});
		}
	}

	const [openalertdialog, setOpenAlertDialog] = useState(false);


	const handleOpenAlertDialog = () => {
		setOpenAlertDialog(true);
	};

	const handleCloseAlertDialog = (e) => {
		setOpenAlertDialog(false);
	};

	 useEffect(() => {
	    RefreshReports();
	  }, []);


  return (
    <div>

	<AlertDialog open={openalertdialog} dialogheader="Error" dialogtext="Patient info or the billables not provided." handleClose={handleCloseAlertDialog} />

	<PatientDetails key={childKey.id0} updatePatientInfoCallback={updatePatientInfoCallback}/>

	<ReportsList theadData={["Date", "Name", "PID", "Report no"]} allreports={allReports} getServerBaseURL={getServerBaseURL} RefreshReports={RefreshReports}/>


    </div>
  );
}

export default LabReportsHistory;
