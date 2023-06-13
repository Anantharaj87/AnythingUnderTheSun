import logo from './logo.svg';
import './App.css';
import Table from "./Table";

function App(props) {
  return (
    <div className="App">
      <Table theadData={["branch", "group", "parameter"]} tbodyData={props.labparamsinfo.tests} />
    </div>
  );
}

export default App;
