import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import {site_url} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';

let divType = null;
let hoverState=null;
let logoutstate=false;

const renderClass=(e)=>{
		if(!divType.parentNode.classList.contains("active")){
			divType.parentNode.classList.add("active")
		}else{
			divType.parentNode.classList.remove("active")
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

const Logout=()=>{
	localStorage.clear();
}

const Repheader = (props) => {

  return (
      <div className="top-heading-continer d-flex flex-wrap align-center" >
            <div className="name-of-heading d-flex flex-wrap">
               {props.menulisting.map((item,index)=>
                  {if(window.location.pathname===item.field_react_route){
                  return(<React.Fragment key={index}><div dangerouslySetInnerHTML={{ __html: item.field_icon_svg }} />
                  <h1>{item.title}</h1></React.Fragment>)
               }else if(item.child!==undefined && window.location.pathname===item.child[0].field_react_route){
                  return(<React.Fragment key={index}><div dangerouslySetInnerHTML={{ __html: item.child[0].field_icon_svg }} />
                  <h1>{item.child[0].title}</h1></React.Fragment>)
               }}
               )}
            </div>
            <div className="d-flex flex-wrap user-log" onMouseLeave={renderOutHover}>
               <div className="user-image-name d-flex flex-wrap align-center" onMouseEnter={renderInHover} onClick={renderClass} ref={(input) => { divType = input; }}>
                  {props.repuserinfo!==null ? 
                     <>
                        <img src={props.repuserinfo.user_picture[0]!=='' ? props.repuserinfo.user_picture[0].url : require("../../../images/john-smith.png")} alt="Profile image" />
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
                     <li><Link to={"/Profile"} title="Profile">Profile</Link></li>
                     <li><Link to={"/Login"} onClick={Logout} title="Sign out">Sign out</Link></li>
                  </ul>
               </div>
            </div>
   </div>
  )
}

export default Repheader;