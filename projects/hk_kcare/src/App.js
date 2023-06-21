import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Lab from "./pages/Lab";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Lab labparamsinfo={ props.labparamsinfo } />} />
          <Route path="*" element={<Lab labparamsinfo={ props.labparamsinfo } />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
