import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url} from '../../Apiurl'; 
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
         openPopup:false,
         repinfo:null,
      }
   }

   componentDidMount(){
      if(localStorage.getItem("access-token")!==null){
        this.GetProfile();
      }
   }

   GetProfile=()=>{
      let target_id=JSON.parse(localStorage.getItem("user-type")).uid;
      try{
         fetch(Apiurl.GetProfile.url+`${target_id}?_format=json`,{
               headers: {
                     "Content-Type" : "application/json",
                     "X-CSRF-Token" : localStorage.getItem("access-token"),
                     "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                   },
                   method:Apiurl.GetProfile.method,
         }).then(res=>{
            return res.json();
         }).then(data=>{
            console.log(data);
            this.setState({repinfo:data})
            console.log(this.state.repinfo)
         })
      }catch(err){
         console.log(err);
      }
   }


render(){
console.log(this.state.repinfo);
console.log(this.props.sendtheDefaultAnnouncement);
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
            <div className="d-flex flex-wrap user-log">
               <div className="user-image-name d-flex flex-wrap align-center"  onClick={renderClass} ref={(input) => { divType = input; }}>
                  {this.state.repinfo!==null ? 
                     <>
                        <div className="person-profile-img bg-cover" style={{backgroundImage: `url(${this.state.repinfo.user_picture.length>0 && this.state.repinfo.user_picture[0]!=='' ? this.state.repinfo.user_picture[0].url : "../../../images/profile-logo-blue.svg"})`}}></div>
                        <h2>{this.state.repinfo.field_first_name[0].value+" "+this.state.repinfo.field_last_name[0].value}</h2>
                     </>
                     :
                     <>
						 
                        <div className="person-profile-img bg-cover" style={{backgroundImage: "url(../../../images/profile-logo-blue.svg)"}}></div>

                        <h2></h2>
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
                                    let status;
                                    fetch(Apiurl.LogoutCall.url,{
                                       headers: {
                                             "Content-Type" : "application/json",
                                             "X-CSRF-Token" : localStorage.getItem("access-token"),
                                             "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                                           },
                                       method:Apiurl.LogoutCall.method
                                    }).then(res=>{
                                       status=res.status;
                                       res.json()
                                    }).then(data=>{
                                       if(status===200){
                                          localStorage.clear();
                                          this.props.historyPush.history.push("/");
                                       }else{
                                          return false;
                                       }
                                    })
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