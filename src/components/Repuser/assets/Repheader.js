import React from 'react';
import { Link, Redirect } from "react-router-dom";

let divType = null;
let hoverState=null;

const renderClass=(e)=>{
		if(divType.parentNode.classList.contains("active")){
			divType.parentNode.classList.remove("active")
		}else{
			divType.parentNode.classList.add("active")
		}
}

const renderInHover=()=>{
	hoverState=true;
	divType.parentNode.classList.add("active")
}

const renderOutHover=()=>{
	hoverState=false;
	divType.parentNode.classList.remove("active")
}


const Repheader = (props) => {
  return (
    <div className="top-heading-continer d-flex flex-wrap align-center" >
          <div className="name-of-heading d-flex flex-wrap">
             <img src={require("../../../images/dashboard-nav-blue.svg")} alt="profile-logo" />
             <h1>Dashboard</h1>
          </div>
          <div className="d-flex flex-wrap user-log"  onMouseEnter={renderInHover} onMouseLeave={renderOutHover}>
             <div className="user-image-name d-flex flex-wrap align-center" onClick={renderClass} ref={(input) => { divType = input; }}>
                {props.repuserinfo!==null ? 
                	<>
		                <img src={props.repuserinfo.user_picture[0]!=='' ? props.repuserinfo.user_picture[0].url : require("../../../images/john-smith.png")} alt="Prfile image" />
	                	<h2>{props.repuserinfo.field_first_name[0].value+" "+props.repuserinfo.field_last_name[0].value}</h2>
                	</>
                    :
                    <>
		                <img src={require("../../../images/john-smith.png")} alt="Prfile image" />
	                	<h2>username</h2>
                	</>
                }
             </div>
             <div className="drop-down-menu">
                <ul>
                   <li><a href="#" title="Profile">Profile</a></li>
                   <li><a href="#" title="Sign out">Sign out</a></li>
                </ul>
             </div>
          </div>
   </div>
  )
}

export default Repheader;