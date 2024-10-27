import './App.css';
import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Lab from "./pages/Lab";
import LabBilling from "./pages/LabBilling";
import Patients from "./pages/Patients";
import LabBillsHistory from "./pages/LabBillsHistory";
import LabReportsHistory from "./pages/LabReportsHistory";


function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/labbilling" replace />} />
          <Route path="*" element={<Navigate to="/labbilling" replace />} />

          <Route path="labreport" element={<Lab labparamsinfo={props.labparamsinfo} properties={props.properties} />} />
          <Route path="labbilling" element={<LabBilling billinginfo={props.billinginfo} properties={props.properties} />} />
          
	  <Route path="patients" element={<Patients properties={props.properties} />} />
	  <Route path="labbillshistory" element={<LabBillsHistory properties={props.properties} />} />
	  <Route path="labreportshistory" element={<LabReportsHistory billinginfo={props.billinginfo} properties={props.properties} />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
