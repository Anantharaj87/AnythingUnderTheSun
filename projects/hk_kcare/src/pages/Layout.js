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
          		<a className="nav-link" href="/billing">Billing</a>
        		</li>
        		<li className="nav-item">
          		<a className="nav-link" href="/lab">Lab</a>
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

