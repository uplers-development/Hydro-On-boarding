import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Admin} from '../../Apiurl'; 

class Adminremobilefilter extends React.Component{
	constructor(props){
		super(props)
		this.state={
			openContainer:false,
			openPopup:false,
		}
		this.bulkdelete=React.createRef();
		this.sort_admin_rep_clients=this.sort_admin_rep_clients.bind(this);	
		this.selectAlltheRep=this.selectAlltheRep.bind(this);
		this.bulkDelete=this.bulkDelete.bind(this);
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

	selectAlltheRep=(e)=>{
		e.preventDefault();
		this.bulkdelete.current.classList.toggle("active");
		var ele=document.querySelector(".repparent");
		var checkboxes = document.getElementsByTagName('input');
		if(this.bulkdelete.current.classList.contains("active")){
		document.querySelector(".repparent").checked=true;
		
		 if (ele.checked) {
			  for (var i = 0; i < checkboxes.length; i++) {
					if (checkboxes[i].type == 'checkbox') {
						 checkboxes[i].checked = true;
					}
			  }
		 }else {
			  for (var i = 0; i < checkboxes.length; i++) {
					console.log(i)
					if (checkboxes[i].type == 'checkbox') {
						 checkboxes[i].checked = false;
					}
			  }
		  }
		}else{
			document.querySelector(".repparent").checked=false;
			for (var i = 0; i < checkboxes.length; i++) {
				console.log(i)
				if (checkboxes[i].type == 'checkbox') {
					 checkboxes[i].checked = false;
				}
		  }
		}
	}


	bulkDelete=(e)=>{
		let collectId=[];
		document.querySelectorAll(".repchecked:checked").forEach((item,index)=>{
				collectId.push(item.value)
		})
		console.log(collectId);
		let clientbulkid={
				user_ids:collectId.toString()
			}
			try{
				fetch(Admin.adminrepBulkDelete.url,{
						headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                method:Admin.adminrepBulkDelete.method,
		                body:JSON.stringify(clientbulkid)
				}).then(res=>{
					return res.json();
				}).then(data=>{
					console.log(data);
					this.setState({openPopup:false});
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
						if(status===200){
							this.props.recordDelete(true,data);
							this.bulkdelete.current.classList.remove("active");
							this.setState({openContainer:false});
						}
					})
					document.querySelector(".repparent").checked=false;
				   document.querySelectorAll(".repchecked:checked").forEach((item,index)=>{
						item.checked=false;
					})


					 
				})
		 	}catch(err){
		 		console.log(err);
		 		alert(err);
		 		this.setState({openPopup:false});
		 	}
			
	}

	cleartheChecklist=()=>{
		var checkboxes = document.getElementsByTagName('input');
		document.querySelector(".repparent").checked=false;
			for (var i = 0; i < checkboxes.length; i++) {
				console.log(i)
				if (checkboxes[i].type == 'checkbox') {
					 checkboxes[i].checked = false;
				}
		  }

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
	                                <Link to={""} onClick={this.selectAlltheRep} title="Delete" ref={this.bulkdelete}>
	                                Delete</Link>
	                             </li>
	                             <li>
	                                <Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openPopup:true})})} title="Action 1">
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
	                          <div className="btn-block">
			                      <button className="common-btn-blue" onClick={((e)=>{
			                          e.preventDefault();
			                          document.querySelectorAll(".list-filter-mobile ul li a").forEach((item,index)=>{
			                            item.parentNode.classList.remove("active");
			                            item.classList.remove("active")
			                          });
			                          document.querySelectorAll(".rep-admin-sort li a").forEach((item,index)=>{
			                            item.parentNode.classList.remove("active");
			                            item.classList.remove("active")
			                          });

			                         this.cleartheChecklist();
			                      })}><span>Clear filters</span></button>
                 				 </div>  
	                       </div>
	                    </div>
				  {this.state.openPopup ? 
					<div id="modal" className="modal-container">
						<div className="modal d-flex flex-wrap align-center justify-center">
							<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})})}
							className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
							
						<div>
							<img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
								<p>Are you sure you want to delete records?</p>

							<div className="btn-blok">
								<button onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})
									document.querySelectorAll(".repchecked").forEach((item,index)=>{
										document.querySelector(".repparent").checked=false;
										item.checked=false;
									})

							})} className="btn common-btn-blue"><span>CANCEL</span></button>
								<button className="btn common-btn-blue" onClick={this.bulkDelete}><span>YES</span></button>	
							</div>
							
						</div>
						</div>
					</div>
					: <></>}
                 </div>
			)
	}
}
export default Adminremobilefilter;