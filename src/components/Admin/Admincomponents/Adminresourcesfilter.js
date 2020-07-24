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
   	 fetch(Admin.adminresourcelisting.url,{
   	 		 headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminresourcelisting.method,
   	 }).then(res=>{return res.json()}).then(data=>{console.log(data);this.setState({adminresourcesdropdown:data})});
   }


   adminfilterresources=(e,resourceid)=>{
   		e.preventDefault();
   		alert(resourceid);
   		 fetch(Admin.adminresourcelisting.url+`&field_resource_type_target_id=${resourceid}`,{
   	 		 headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminresourcelisting.method,
   	 	}).then(res=>{return res.json()}).then(data=>{console.log(data);/*this.setState({:data})*/});
   }

   render(){
   			return(
					<>		
							<div className="select-box">
								<span>Content Types</span>
								<ul className="list">
									{this.state.adminresourcesdropdown.map((item,index)=>
										<li key={index}><Link to={""} onClick={((e)=>this.adminfilterresources(e,item.nid))} title={item.title}>{item.field_resource_type}</Link></li>
									)}
								</ul>
							</div>	
							<div className="btn-block mobile-hide">
									<button className="common-btn-blue"><span>ADD NEW</span></button>
							</div>
				   </>
   				)
  		 }
 }

export default Adminresourcesfilter;