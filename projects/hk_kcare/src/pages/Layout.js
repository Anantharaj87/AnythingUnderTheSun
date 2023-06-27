import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>

      
      
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  		<div className="container-fluid">
    		
    		<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      		<span className="navbar-toggler-icon"></span>
    		</button>
    		<div className="collapse navbar-collapse" id="navbarNav">
      		<ul className="navbar-nav">
        		<li className="nav-item">
          		<Link className="nav-link" to="/billing">Billing</Link>
        		</li>
        		<li className="nav-item">
          		<Link className="nav-link" to="/lab">Lab</Link>
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

