import React from 'react';

const Repnav = (props) => {
  return (
     <nav className="navbar teal-color-bg navbar-expand-md navbar-dark bg-primary fixed-left">
            <a className="navbar-logo" href="#" title="Main white logo"><img src={require("../../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></a>
            {/*<!--List of menu start-->*/}
            <ul>
               <li><a className="active" href="#" title="Dashboard">
                  <img className="svg" src={require("../../../images/dashboard-nav.svg")} alt="profile-logo" /><span>Dashboard</span></a>
               </li>
               <li><a href="#" title="Clients">
                  <img className="svg" src={require("../../../images/clients_ic.svg")} alt="product-logo" /><span>Clients</span></a>
               </li>
               <li><a href="#" title="Products">
                  <img className="svg" src={require("../../../images/bell-icon-logo.svg")} alt="Announcements" />
                  <span>Announcements</span></a>
               </li>
            </ul>
            {/*<!--List of menu end-->*/}
            <div className="pattern-block"><img src={require("../../../images/pattern-nav-bottom.svg")} alt="pattern-nav" /></div>
            <div className="nav-copyright">© 2020 Hydro International</div>
         </nav>
  )
}

export default Repnav;