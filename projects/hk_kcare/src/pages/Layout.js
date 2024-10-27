import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  		<div className="container-fluid">
    		
	    		<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
	      		<span className="navbar-toggler-icon"></span>
	    		</button>
	    		<div className="collapse navbar-collapse justify-content-between" id="navbarNav">
		      		<ul className="navbar-nav mr-auto">
					<li className="nav-item">
				  		<Link className="nav-link" to="/labbilling">New Lab Bill</Link>
					</li>
					<li className="nav-item">
				  		<Link className="nav-link" to="/labreport">New Lab Report</Link>
					</li>
					<li className="nav-item">
				  		<Link className="nav-link" to="/labbillshistory">Bills History</Link>
					</li>
					<li className="nav-item">
				  		<Link className="nav-link" to="/labreportshistory">Reports History</Link>
					</li>
		      		</ul>
				<ul className="navbar-nav">
					<li className="nav-item">
				  		<Link className="nav-link" to="/patients">Patients</Link>
					</li>
		      		</ul>
	    		</div>
  		</div>
	</nav>     
      
      <Outlet />
    </>
  )
};

export default Layout;

