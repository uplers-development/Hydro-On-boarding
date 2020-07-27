import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';


class Adminresourcesfilter extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	adminresourcesdropdown:[]
      }
   }


   componentDidMount(){
   	this.admin_resource_listing()
   }

   admin_resource_listing=()=>{
   	 fetch(Admin.adminresourcedropdown.url,{
   	 		 headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminresourcedropdown.method,
   	 }).then(res=>{return res.json()}).then(data=>{console.log(data);this.setState({adminresourcesdropdown:data})});
   }


   adminfilterresources=(e,resourceid)=>{
   		e.preventDefault();
   		alert(resourceid);
         if(!e.target.classList.contains('active')){
            document.querySelectorAll(".admin-resource-filter").forEach((item,index)=>{
               if(item.classList.contains("active")){item.classList.remove("active")}
            })
             e.target.classList.add("active");
      		 fetch(Admin.adminresourcelisting.url+`&field_resource_type_target_id=${resourceid}`,{
      	 		 headers:{
                     "Content-Type" : "application/json",
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.adminresourcelisting.method,
      	 	}).then(res=>{return res.json()}).then(data=>{console.log(data);this.props.checkresourcefilter(data)});
       }else{
         e.target.classList.remove('active');
         fetch(Admin.adminresourcelisting.url+`&field_resource_type_target_id=All`,{
                headers:{
                     "Content-Type" : "application/json",
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.adminresourcelisting.method,
            }).then(res=>{return res.json()}).then(data=>{console.log(data);this.props.checkresourcefilter(data)});
       }
   }

   render(){
   			return(
					<>		
							<div className="select-box">
								<span>Content Types</span>
								<ul className="list">
									{this.state.adminresourcesdropdown.map((item,index)=>
										<li key={index}><Link to={""} className='admin-resource-filter' onClick={((e)=>this.adminfilterresources(e,item.tid))} title={item.name}>{item.name}</Link></li>
									)}
								</ul>
							</div>	
							<div className="btn-block mobile-hide">
									<button className="common-btn-blue" onClick={((e)=>{e.preventDefault();this.props.checktheviewcalled(true,true,JSON.parse(localStorage.getItem("user-type")).uid)})}><span>ADD NEW</span></button>
							</div>
				   </>
   				)
  		 }
 }

export default Adminresourcesfilter;