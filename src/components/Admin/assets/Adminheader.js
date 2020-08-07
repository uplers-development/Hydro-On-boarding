import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
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

class Adminheader extends React.Component{
   constructor(props){
      super(props);
      this.state={
         menulisting:[],
         admininfo:null,
         openPopup:false
      }
   }

   componentDidMount(){
      if(localStorage.getItem("access-token")!==null){
         this.get_admin_header_item();
         this.GetProfile();
      }
   }


   get_admin_header_item(){
      let menulist={menu:"main-navigation-admin"};
      fetch(Admin.menulisting.url,{
          headers:{
                  "Content-Type" : "application/json",
                  "X-CSRF-Token" : localStorage.getItem("access-token"),
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.menulisting.method,
            body:JSON.stringify(menulist)
      }).then(res=>{return res.json()}).then(data=>{
               this.setState({menulisting:data})
      })
   }

   GetProfile=()=>{
      let target_id=JSON.parse(localStorage.getItem("user-type")).uid;
      try{
         fetch(Admin.adminprofileinfo.url+`${target_id}?_format=json`,{
               headers: {
                     "Content-Type" : "application/json",
                     "X-CSRF-Token" : localStorage.getItem("access-token"),
                     "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                   },
                   method:Admin.adminprofileinfo.method,
         }).then(res=>{
            return res.json();
         }).then(data=>{
            // console.log(data);
            if(!data.message){
               this.setState({admininfo:data})
               this.props.getAdminuid(this.state.admininfo);
            }
         })
      }catch(err){
         console.log(err);
      }
   }



render(){
console.log(this.props.checkifPagecall,"View called");
  return (
      <div className="top-heading-continer d-flex flex-wrap align-center" >
            <div className="name-of-heading d-flex flex-wrap">
               {this.state.menulisting.map((item,index)=>
                  {if(window.location.pathname===item.field_react_route){
                     return(<React.Fragment key={index}><div dangerouslySetInnerHTML={{ __html: item.field_icon_svg }} />
                     <h1>{!this.props.checkifPagecall ? item.title :"Add"+" "+(item.title==='Products' ? "product" : item.title==="Reps" ? "rep" : item.title.toLowerCase())}</h1></React.Fragment>)
                  }
               })}
            </div>
            <div className="d-flex flex-wrap user-log" onMouseLeave={renderOutHover}>
               <div className="user-image-name d-flex flex-wrap align-center" onMouseEnter={renderInHover} onClick={renderClass} ref={(input) => { divType = input; }}>
                  {this.state.admininfo!==null ? 
                     <>
                        <div className="person-profile-img bg-cover" style={{backgroundImage: `url(${this.state.admininfo.user_picture.length > 0 && this.state.admininfo.user_picture[0]!=='' ? this.state.admininfo.user_picture[0].url : "../../../images/profile-logo-blue.svg"})`}}></div>
                        <h2>{this.state.admininfo.field_first_name[0].value+" "+this.state.admininfo.field_last_name[0].value}</h2>
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
                                                         admin:true,
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
                                          this.props.historyPush.history.push("/Login");
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

export default Adminheader;