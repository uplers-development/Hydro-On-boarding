import React from 'react';
import { Link, Redirect } from "react-router-dom";
import {site_url,base_url,Admin} from '../../Apiurl'; 



class Adminclientsorting extends React.Component {
	constructor(props){
		super(props);
		this.state={

		}
		this.sortRef=React.createRef();
		this.SortClient=this.SortClient.bind(this);
	}

	SortClient=(e)=>{
		e.preventDefault();
		if(!e.target.classList.contains("active")){
		document.querySelectorAll(".drop-down-menu ul li a").forEach((item,index)=>{
			item.classList.remove("active");
		})
		e.target.classList.add("active");

		fetch(Admin.adminClientlisting.url+e.target.getAttribute("title"),{
					headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
		                },
				}).then(res=>res.json()).then(data=>{
					console.log(data);
					this.props.getSortedItems(data);
				});
		}else{
			e.target.classList.remove("active");
			fetch(Admin.adminClientlisting.url,{
					headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
		                },
				}).then(res=>res.json()).then(data=>{
					console.log(data);
					this.props.getSortedItems(data);
				});
		}
	}


	render(){
		  return (
		    <div className="d-flex flex-wrap sort-by">
						<div className="sort-selected d-flex flex-wrap align-center">
							<h2>Sort by</h2>
						</div>
						<div className="drop-down-menu">
							<ul>
								<li><Link to={""} title="&sort_by=created&sort_order=DESC"  onClick={this.SortClient}>Newest user</Link></li>
								<li><Link to={""} title="&sort_by=created&sort_order=ASC"  onClick={this.SortClient}>Oldest user</Link></li>
								<li><Link to={""} title="&sort_by=field_first_name_value&sort_order=ASC"  onClick={this.SortClient}>A-Z</Link></li>
								<li><Link to={""} title="&sort_by=field_first_name_value&sort_order=DESC"  onClick={this.SortClient}>Z-A</Link></li>
							</ul>
						</div>
			</div>
		  )
	}
}
export default Adminclientsorting;