import React from 'react';
import { Link, Redirect } from "react-router-dom";
import SVG from 'react-inlinesvg';

const Repnav = (props) => {
      return(
     <nav className="navbar teal-color-bg navbar-expand-md navbar-dark bg-primary fixed-left">
            <Link to={"/RepDashboard"} className="navbar-logo"><img src={require("../../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>

            <ul>
              {props.repmenulisting.map((item,index)=>
                   <li key={index}><Link to={item.field_react_route} className={window.location.pathname===item.field_react_route ? "active" :''}  title={item.title}>
                      <object data={item.field_icon!=='' ? item.field_icon :require("../../../images/bell-icon-logo.svg")} type="image/svg+xml">
                           <img className='svg' src={item.field_icon!=='' ? item.field_icon :require("../../../images/bell-icon-logo.svg")}/>
                      </object>
                      <span>{item.title}</span></Link>
                      {item.child && item.child!=='' ? 
                        <ul>
                          <li className={window.location.pathname===item.field_react_route ? "active" :''}  key={index}><Link to={item.child[0].field_react_route} title={item.child[0].title}>{item.child[0].title}</Link></li>
                        </ul>:''}
                  </li>
                )}

            </ul>
            {/*<!--List of menu end-->*/}
            <div className="pattern-block"><img src={require("../../../images/pattern-nav-bottom.svg")} alt="pattern-nav" /></div>
            <div className="nav-copyright">© 2020 Hydro International</div>
         </nav>
  )
}

export default Repnav;