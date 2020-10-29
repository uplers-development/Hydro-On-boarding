import React from 'react';
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

const Repnav = (props) => {
      return(
     <nav className="navbar teal-color-bg navbar-expand-md navbar-dark bg-primary fixed-left">
            <Link to={"/RepDashboard"} className="navbar-logo"><img src={require("../../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>

            <ul>
              {props.repmenulisting.map((item,index)=>
                   <li key={index}><Link to={item.field_react_route} className={window.location.pathname===item.field_react_route ? "active" :''}  title={item.title}>
                      {item.field_icon_svg!=='' ? 
                      <div dangerouslySetInnerHTML={{ __html: item.field_icon_svg }} />
                        :
                      <img src={require("../../../images/bell-icon-logo.svg")}/>
                     }
                      <span>{item.title}</span></Link>
                      {item.child && item.child!=='' ? 
                        <ul>
                          <li className={window.location.pathname===item.child[0].field_react_route ? "active" :''}  key={index}>                              
                              <Link className={window.location.pathname===item.child[0].field_react_route ? "active" :''} to={item.child[0].field_react_route} title={item.child[0].title}>{item.child[0].title}</Link>
                          </li>
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