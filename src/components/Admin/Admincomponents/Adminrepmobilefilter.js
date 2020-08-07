import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Admin} from '../../Apiurl'; 

class Adminremobilefilter extends React.Component{
	constructor(props){
		super(props)
		this.state={
			openContainer:false,
		}
	this.sort_admin_rep_clients=this.sort_admin_rep_clients.bind(this);

	}


	sort_admin_rep_clients=(e)=>{
		e.preventDefault();	
		this.props.loaderTrue(true); 
		if(!e.target.classList.contains("active")){
			document.querySelectorAll(".rep-admin-sort li a").forEach((item,index)=>{
				console.log(item);
				item.classList.remove("active");
			});
			e.target.classList.add("active");
			 this.props.selecteddropdown(true);
			try{
				let status;
				fetch(Admin.adminreptablelisting.url+`&sort_by=created&sort_order=${e.target.getAttribute("sortorder")}`,{
					headers:{
	                  "Content-Type" : "application/json",
	                  "X-CSRF-Token" : localStorage.getItem("access-token"),
	                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
	            	},
	            	method:Admin.adminreptablelisting.method
				}).then(res=>{
					status=res.status;
					return res.json()
				}).then(data=>{
					console.log(data);
					this.props.sortedfilterdata(data);
					this.props.loaderTrue(false); 
				})
			}catch(err){
				console.log(err)
			}
		}else{
			e.target.classList.remove("active");
			this.props.loaderTrue(true); 
			this.props.selecteddropdown(false);
			try{
				let status;
				fetch(Admin.adminreptablelisting.url,{
					headers:{
	                  "Content-Type" : "application/json",
	                  "X-CSRF-Token" : localStorage.getItem("access-token"),
	                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
	            	},
	            	method:Admin.adminreptablelisting.method
				}).then(res=>{
					status=res.status;
					return res.json()
				}).then(data=>{
					console.log(data);
					this.props.sortedfilterdata(data);
					this.props.loaderTrue(false); 
				})
			}catch(err){
				console.log(err)
			}
		}

	}

	render(){
		return(
				 <div className={this.state.openContainer ? "mobile-filter filter-active" : "mobile-filter"}>
	                     <Link to={""} title="filter-btn" className="filter-open-btn" onClick={((e)=>{e.preventDefault()
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
			         			         this.setState({openContainer:false})})} 
	                          title="close-btn" className="filter-open-btn">
			         <img src={require("../../../images/ic_close.svg")} alt="ic_close" />
			         </Link>
	                       </div>
	                       <div className="list-filter-mobile">
	                          <h5>Bulk Action</h5>
	                          <ul>
	                             <li>
	                                <Link to={""} onClick={e=>e.preventDefault()} title="Delete">
	                                Delete</Link>
	                             </li>
	                             <li>
	                                <Link to={""} onClick={e=>e.preventDefault()} title="Action 1">
	                                Action</Link>
	                             </li>
	                          </ul>
	                          <h5>Sort by</h5>
	                          <ul className="rep-admin-sort">
                                  <li>
	                                 <Link to={""} onClick={this.sort_admin_rep_clients} sortorder="ASC" title="Newest">
	                                 Newest</Link>
	                              </li>
	                              <li>
	                                 <Link to={""} onClick={this.sort_admin_rep_clients} sortorder="DESC" title="Oldest">
	                                 Oldest</Link>
	                              </li>
	                              <li>
	                                 <Link to={""} onClick={this.sort_admin_rep_clients} sortorder="ASC" title="A-Z">
	                                 A-Z</Link>
	                              </li>
	                              <li>
	                                 <Link to={""} sortorder="DESC" onClick={this.sort_admin_rep_clients} title="Z-A">
	                                 Z-A</Link>
	                              </li>
	                          </ul>
	                          <div className="btn-block">
	                             <button className="common-btn-blue" onClick={((e)=>{
	                                 	e.preventDefault();
	                                 	this.setState({openContainer:false})
	                                 })}><span>Apply filters</span></button>
	                          </div>
	                       </div>
	                    </div>
                 </div>
			)
	}
}
export default Adminremobilefilter;