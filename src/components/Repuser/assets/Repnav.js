import React from 'react';
import { Link, Redirect } from "react-router-dom";

const Repnav = (props) => {
  console.log(props.repmenulisting);
  return (
     <nav className="navbar teal-color-bg navbar-expand-md navbar-dark bg-primary fixed-left">
            <Link to={"/RepDashboard"} className="navbar-logo" title="Main white logo"><img src={require("../../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>

            <ul>
              {props.repmenulisting.map((item,index)=>
                   <li key={index}><Link to={item.field_react_route} title={item.title} onClick={(e)=>e.preventDefault()}>
                      <object data={item.field_icon!=='' ? item.field_icon :require("../../../images/bell-icon-logo.svg")} type="image/svg+xml">
                        <img src={item.field_icon!=='' ? item.field_icon :require("../../../images/bell-icon-logo.svg")} />
                      </object>

                      {/*<img className="svg" src={item.field_icon!=='' ? item.field_icon :require("../../../images/bell-icon-logo.svg")} alt={item.title} />*/}
                      <span>{item.title}</span></Link>
                      {item.child && item.child!=='' ? 
                        <ul>
                          <li key={index}><Link to={item.child[0].field_react_route} title={item.child[0].title}>{item.child[0].title}</Link></li>
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