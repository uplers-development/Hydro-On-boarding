import React from 'react';
import { Link, Redirect } from "react-router-dom";


const Repnav = (props) => {
  return (
     <nav className="navbar teal-color-bg navbar-expand-md navbar-dark bg-primary fixed-left">
            <Link to={"/RepDashboard"} className="navbar-logo" title="Main white logo"><img src={require("../../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>
            {/*<!--List of menu start-->*/}
            <ul>
               <li><Link to={""} title="Dashboard">
                  <img className="svg" src={require("../../../images/dashboard-nav.svg")} alt="profile-logo" /><span>Dashboard</span></Link>
               </li>
               <li><Link to={""} href="#" title="Clients">
                  <img className="svg" src={require("../../../images/clients_ic.svg")} alt="product-logo" /><span>Clients</span></Link>
					  <ul>
								<li><Link to={""} title="Clients">Add clients</Link></li></ul>
               </li>
               <li><Link to={""} title="Products">
                  <img className="svg" src={require("../../../images/bell-icon-logo.svg")} alt="Announcements" />
                  <span>Announcements</span></Link>
               </li>
            </ul>
            {/*<!--List of menu end-->*/}
            <div className="pattern-block"><img src={require("../../../images/pattern-nav-bottom.svg")} alt="pattern-nav" /></div>
            <div className="nav-copyright">© 2020 Hydro International</div>
         </nav>
  )
}

export default Repnav;