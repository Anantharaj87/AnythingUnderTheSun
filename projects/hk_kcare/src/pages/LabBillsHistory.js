import './LabBilling.css';
import ReactDOMServer from 'react-dom/server';
import { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { saveAs } from 'file-saver';
import PatientDetails from "./PatientDetails";
import BillsList from "./BillsList";
import AlertDialog from "../dialogs/alertdialog";

function LabBillsHistory(props) {

	const [childKey, setChildKey] = useState({id0: 0, id1: 1, id2: 2});
	const [patientInfo, setPatientInfo] = useState({p_id: ""});
	const [allBills, setAllBills] = useState([]);

	function getServerBaseURL() {
	  return window.location.protocol + "//" + window.location.hostname + ":4000";
	}

	async function getAllBills(p_id) {

		return await fetch(getServerBaseURL() + '/bills/?p_id=' + p_id).then((response)=>response.json())
		.then((responseJson)=>{return responseJson});


	}

	function RefreshBills(p_id) {

		if (!p_id) {
			p_id = patientInfo.p_id;
		}

		setAllBills([]);

		getAllBills(p_id).then((bills) => {
			//	console.log(bills);
			setAllBills(bills);
			}).catch(err =>
			setAllBills([])
		);
	}

	const updatePatientInfoCallback = (pinfo) => {

		console.log(pinfo);
		if (pinfo != null) {
			setPatientInfo({p_id: pinfo.p_id})

			RefreshBills(pinfo.p_id);
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
	    RefreshBills();
	  }, []);


  return (
    <div>

	<AlertDialog open={openalertdialog} dialogheader="Error" dialogtext="Patient info or the billables not provided." handleClose={handleCloseAlertDialog} />

	<PatientDetails key={childKey.id0} updatePatientInfoCallback={updatePatientInfoCallback}/>

	<BillsList theadData={["Date", "Name", "PID", "Bill no"]} allbills={allBills} getServerBaseURL={getServerBaseURL} RefreshBills={RefreshBills}/>


    </div>
  );
}

export default LabBillsHistory;
