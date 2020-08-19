import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';


class Adminresourcesmobilefilter extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	openContainer:false,
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
                  "X-CSRF-Token" : localStorage.getItem("access-token"),
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminresourcedropdown.method,
   	 }).then(res=>{return res.json()}).then(data=>{console.log(data);this.setState({adminresourcesdropdown:data});this.props.getResources(data);});
   }

  adminfilterresources=(e,resourceid)=>{
   		e.preventDefault();
          this.props.loaderTrue(true);
         if(!e.target.classList.contains('active')){
            document.querySelectorAll(".admin-resource-filter").forEach((item,index)=>{
               if(item.classList.contains("active")){item.classList.remove("active")}
            })
             e.target.classList.add("active");
             this.props.selecteddropdown(true)
      		 fetch(Admin.adminresourcelisting.url+`&field_resource_type_target_id=${resourceid}`,{
      	 		 headers:{
                     "Content-Type" : "application/json",
                     "X-CSRF-Token" : localStorage.getItem("access-token"),
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.adminresourcelisting.method,
      	 	}).then(res=>{return res.json()}).then(data=>{
                console.log(data);
                this.props.checkresourcefilter(data)
                this.props.loaderTrue(false);
              });
       }else{
         e.target.classList.remove('active');
          this.props.loaderTrue(true);
          this.props.selecteddropdown(true)
         fetch(Admin.adminresourcelisting.url+`&field_resource_type_target_id=All`,{
                headers:{
                     "Content-Type" : "application/json",
                     "X-CSRF-Token" : localStorage.getItem("access-token"),
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.adminresourcelisting.method,
            }).then(res=>{return res.json()}).then(data=>{
                console.log(data);
                this.props.checkresourcefilter(data)
                this.props.loaderTrue(false);
             });
       }
   }


   cleartheChecklist=()=>{
    this.props.loaderTrue(true);
          this.props.selecteddropdown(true)
         fetch(Admin.adminresourcelisting.url+`&field_resource_type_target_id=All`,{
                headers:{
                     "Content-Type" : "application/json",
                     "X-CSRF-Token" : localStorage.getItem("access-token"),
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.adminresourcelisting.method,
            }).then(res=>{return res.json()}).then(data=>{
                console.log(data);
                this.props.checkresourcefilter(data)
                this.props.loaderTrue(false);
             });
   }

   render(){
   		return(
			<div className={this.state.openContainer ? "mobile-filter filter-active" : "mobile-filter"}>
	                           <Link to={""} title="filter-btn" className="filter-open-btn" onClick={((e)=>{
	                                 	e.preventDefault()
	                                 	this.setState({openContainer:true})
	                                 })}>
			   <img src={require("../../../images/ic_filter.svg")} alt="ic_filter" />
			   </Link>
			   <div className="open-close-filter-block">
			      <div className="top-head d-flex flex-wrap align-center">
			         <div className="top-title d-flex flex-wrap">
			            <img src={require("../../../images/ic_filter-blue.svg")} alt="ic_filter" />
			            <h4>Filters</h4>
			         </div>
			         <Link to={""} onClick={((e)=>{
			         			         e.preventDefault()
			         			         this.setState({openContainer:false})})
			     } title="close-btn" className="filter-open-btn">
			         <img src={require("../../../images/ic_close.svg")} alt="ic_close" />
			         </Link>
			      </div>
			      <div className="list-filter-mobile">
			         <h5>Content Types</h5>
			         <ul>
						{this.state.adminresourcesdropdown.map((item,index)=>
								<li key={index}><Link to={""} className='admin-resource-filter' onClick={((e)=>this.adminfilterresources(e,item.tid))} title={item.name}>{item.name}</Link></li>
						)}
			         </ul>
			         <div className="btn-block">
			            <button className="common-btn-blue"onClick={((e)=>{
	                                 	e.preventDefault();
	                                 	this.setState({openContainer:false})
	                                 })}><span>Apply filters</span></button>
			         </div>
               <div className="btn-block">
                      <button className="common-btn-blue" onClick={((e)=>{
                          e.preventDefault();
                          document.querySelectorAll(".list-filter-mobile ul li a").forEach((item,index)=>{
                            item.parentNode.classList.remove("active");
                            item.classList.remove("active")
                          });

                         this.cleartheChecklist();
                      })}><span>Clear filters</span></button>
                  </div>
			      </div>
			   </div>
			</div>

   			)

   }
}

export default Adminresourcesmobilefilter;