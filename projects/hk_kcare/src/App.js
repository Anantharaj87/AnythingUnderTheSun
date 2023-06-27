import './App.css';
import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Lab from "./pages/Lab";
import LabBilling from "./pages/LabBilling";


function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LabBilling billinginfo={props.billinginfo} properties={props.properties} />} />
          <Route path="lab" element={<Lab labparamsinfo={props.labparamsinfo} properties={props.properties} />} />
          <Route path="billing" element={<LabBilling billinginfo={props.billinginfo} properties={props.properties} />} />
          <Route path="*" element={<LabBilling billinginfo={props.billinginfo} properties={props.properties} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
