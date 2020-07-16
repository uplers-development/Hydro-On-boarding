import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url} from '../../Apiurl'; 

class Repclientmobilefilter extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			openContainer:false,
			bulkIds:[],
			openPopup:false,
			disableBulk:true
		}
		this.sortRef=React.createRef();
		this.SortClient=this.SortClient.bind(this);
		this.bulkDelete=this.bulkDelete.bind(this);
		this.selectAllcheckbox=this.selectAllcheckbox.bind(this);
	}

		SortClient=(e)=>{
		e.preventDefault();
		if(!e.target.classList.contains("active")){
		document.querySelectorAll(".list-filter-mobile ul li a").forEach((item,index)=>{
			item.classList.remove("active");
		})
		e.target.classList.add("active");

		fetch(`${base_url}/jsonapi/clients?_format=json${e.target.getAttribute("title")}`,{
					headers: {
		                	"Content-Type" : "application/json",
		                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
		                },
				}).then(res=>res.json()).then(data=>{
					console.log(data);
					this.props.getSortedItems(data);
				});
		}else{
			e.target.classList.remove("active");
			fetch(`${base_url}/jsonapi/clients?_format=json`,{
					headers: {
		                	"Content-Type" : "application/json",
		                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
		                },
				}).then(res=>res.json()).then(data=>{
					console.log(data);
					this.props.getSortedItems(data);
				});
		}
	}



	selectAllcheckbox=(e)=>{
		e.preventDefault();
		if(!e.target.classList.contains("active")){
			document.querySelectorAll(".list-filter-mobile ul li a").forEach((item,index)=>{
				item.classList.remove("active");
			})
			e.target.classList.add("active");
			if(e.target.classList.contains("active")){
				this.setState({disableBulk:false})
			}

			let collectId=[]
			if(document.querySelector(".parentcheck:checked")===false){
				document.querySelectorAll(".clientchecked").forEach((item,index)=>{
					if(item.checked===true){
						collectId.push(item.value)
					}
				})
				console.log(collectId);
				this.setState({bulkIds:collectId});
		}else{
			 var ele=document.querySelector(".parentcheck");
			 ele.checked=true;
			 var checkboxes = document.getElementsByTagName('input');
		         for (var i = 0; i < checkboxes.length; i++) {
		             if (checkboxes[i].type == 'checkbox') {
		                 checkboxes[i].checked = true;
		                 collectId.push(checkboxes.value);
		             }
		         }
		      }
		    this.setState({bulkIds:collectId});
	  }else{
	  		let collectId=[]
	  		e.target.classList.remove("active");
	  		this.setState({disableBulk:true});
	  }
	}

	bulkDelete=(e)=>{
		let clientbulkid={
				user_ids:this.state.bulkIds.toString()
			}
			try{
				fetch(`${base_url}json-api/bulk_delete.json?_format=json`,{
						headers: {
		                	"Content-Type" : "application/json",
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                method:'POST',
		                body:JSON.stringify(clientbulkid)
				}).then(res=>{
					return res.json();
				}).then(data=>{
					console.log(data);
					this.setState({openPopup:false,openContainer:false,disableBulk:true});
		 			this.props.recordDelete(true);
				})
		 	}catch(err){
		 		console.log(err);
		 		alert(err);
		 		this.setState({openPopup:false,openContainer:false,disableBulk:true});
		 	}
			
	}

	render() {
		return (
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
	                                 	e.preventDefault();
	                                 	this.setState({openContainer:false})
	                                 })} title="close-btn" className="filter-open-btn">
	                                 <img src={require("../../../images/ic_close.svg")} alt="ic_close" />
	                                 </Link>
	                              </div>
	                              <div className="list-filter-mobile">
	                                 <h5>Bulk Action</h5>
	                                 <ul>
	                                    <li><Link to={""} title="Delete" onClick={this.selectAllcheckbox}>Delete</Link></li>
	                                    <li><Link to={""} className={this.state.disableBulk ? "disable-bluk-opt" : ""} title="Action 1" onClick={((e)=>{
	                                 	e.preventDefault();
	                                 	this.setState({openPopup:true})
	                                 })}>Action</Link></li>
	                                 </ul>
	                                 <h5>Sort by</h5>
	                                 <ul>
	                                   <li><Link to={""} title="&sort_by=created&sort_order=ASC"  onClick={this.SortClient}>Newest user</Link></li>
										<li><Link to={""} title="&sort_by=created&sort_order=DESC"  onClick={this.SortClient}>Oldest user</Link></li>
										<li><Link to={""} title="&sort_by=field_first_name_value&sort_order=ASC"  onClick={this.SortClient}>A-Z</Link></li>
										<li><Link to={""} title="&sort_by=field_first_name_value&sort_order=DESC"  onClick={this.SortClient}>Z-A</Link></li>
	                                 </ul>
	                                 <div className="btn-block">
	                                    <button className="common-btn-blue" onClick={((e)=>{
	                                 	e.preventDefault();
	                                 	this.setState({openContainer:false})
	                                 })}><span>Apply filters</span></button>
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
											<button onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})})} className="btn common-btn-blue"><span>CANCEL</span></button>
											<button className="btn common-btn-blue" onClick={this.bulkDelete}><span>YES</span></button>	
										</div>
										
									</div>
									</div>
								</div>
								: <></>}
	                        </div>
		);
	}
}


export default Repclientmobilefilter;