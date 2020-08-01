import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Admin} from '../../Apiurl'; 

class Adminrepsort extends React.Component{
	constructor(props){
		super(props)
		this.state={

		}
		this.sort_admin_rep_clients=this.sort_admin_rep_clients.bind(this);
	}


	sort_admin_rep_clients=(e)=>{
		e.preventDefault();	
		alert(123);
		if(!e.target.classList.contains("active")){
			document.querySelectorAll(".rep-admin-sort ul li a").forEach((item,index)=>{
				console.log(item);
				item.classList.remove("active");
			});
			e.target.classList.add("active");
			try{
				let status;
				fetch(Admin.adminreptablelisting.url+`&sort_by=created&sort_order=${e.target.getAttribute("sortorder")}`,{
					headers:{
	                  "Content-Type" : "application/json",
	                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
	            	},
	            	method:Admin.adminreptablelisting.method
				}).then(res=>{
					status=res.status;
					return res.json()
				}).then(data=>{
					console.log(data);
					this.props.sortedfilterdata(data);
				})
			}catch(err){
				console.log(err)
			}
		}else{
			e.target.classList.remove("active");

		}

	}

	render(){
		return(
	 			 <div className="d-flex flex-wrap sort-by">
	                        <div className="sort-selected d-flex flex-wrap align-center">
	                           <h2>Sort by</h2>
	                        </div>
	                        <div className="drop-down-menu rep-admin-sort">
	                           <ul>
	                              <li>
	                                 <Link to={""} onClick={this.sort_admin_rep_clients} sortorder="ASC" title="Purchase date newest">
	                                 Purchase date newest</Link>
	                              </li>
	                              <li>
	                                 <Link to={""} onClick={this.sort_admin_rep_clients} sortorder="DESC" title="Purchase date oldest">
	                                 Purchase date oldest</Link>
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
	                        </div>
                 </div>
			)
	}
}

export default Adminrepsort;