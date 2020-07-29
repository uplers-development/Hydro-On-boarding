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

class Repheader extends React.Component{
   constructor(props){
      super(props);
      this.state={
         Repclient:false,
         openPopup:false
      }
   }




render(){

  return (
      <div className="top-heading-continer d-flex flex-wrap align-center" >
            <div className="name-of-heading d-flex flex-wrap">
               {this.props.menulisting.map((item,index)=>
                  {if(window.location.pathname===item.field_react_route){
                  return(<React.Fragment key={index}><div dangerouslySetInnerHTML={{ __html: item.field_icon_svg }} />
                  <h1>{!this.props.checkifPagecall ? item.title :'Client Details'}</h1></React.Fragment>)
               }else if(item.child!==undefined && window.location.pathname===item.child[0].field_react_route){
                  return(<React.Fragment key={index}><div dangerouslySetInnerHTML={{ __html: item.child[0].field_icon_svg }} />
                  <h1>{item.child[0].title}</h1></React.Fragment>)
               }}
               )}
            </div>
            <div className="d-flex flex-wrap user-log" onMouseLeave={renderOutHover}>
               <div className="user-image-name d-flex flex-wrap align-center" onMouseEnter={renderInHover} onClick={renderClass} ref={(input) => { divType = input; }}>
                  {this.props.repuserinfo!==null ? 
                     <>
                        <div className="person-profile-img bg-cover" style={{backgroundImage: `url(${ this.props.repuserinfo.user_picture[0]!=='' ? this.props.repuserinfo.user_picture[0].url : "../../../images/profile-logo-blue.svg"})`}}></div>
                        <h2>{this.props.repuserinfo.field_first_name[0].value+" "+this.props.repuserinfo.field_last_name[0].value}</h2>
                     </>
                     :
                     <>
						 
                        <div className="person-profile-img bg-cover" style={{backgroundImage: "url(../../../images/profile-logo-blue.svg)"}}></div>

                        <h2>username</h2>
                     </>
                  }
               </div>
               <div className="drop-down-menu">
                  <ul>
                     <li><Link to={""} onClick={((e)=>{
                                                e.preventDefault();
                                                this.props.historyPush.history.push({
                                                      pathname:'/Profile',
                                                      state:{
                                                         Repclient:true,
                                                      }
                                                })                           
                                          })}  
                     title="Profile">Profile</Link></li>
                     <li><Link to={""} onClick={((e)=>{
                              e.preventDefault();
                              this.setState({openPopup:true});
                     })} title="Sign out">Sign out</Link></li>
                  </ul>
               </div>
               {this.state.openPopup ? 
                     <div id="modal" className="modal-container">
                        <div className="modal d-flex flex-wrap align-center justify-center">
                           <Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})})}
                           className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
                           
                        <div>
                           <img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
                              <p>Are you sure you want to Sign out?</p>
                           <div className="btn-blok">
                              <button onClick={((e)=>{e.preventDefault();this.setState({openPopup:false});

                           })} className="btn common-btn-blue"><span>CANCEL</span></button>
                              <button className="btn common-btn-blue" onClick={((e)=>{
                                    console.log(this.props.historyPush)
                                    localStorage.clear();
                                    this.props.historyPush.history.push("/Login");
                              })}><span>YES</span></button> 
                           </div>
                           
                        </div>
                        </div>
                     </div>
                     : <></>}


            </div>
   </div>
  )
 }
}

export default Repheader;