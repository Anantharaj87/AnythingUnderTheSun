import Table from "./Table";

function Lab(props) {
  return (
    <div>
      <Table theadData={["branch", "group", "parameter", "parametervalue"]} tbodyData={props.labparamsinfo.tests} />
    </div>
  );
}

export default Lab;
