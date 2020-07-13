import React from 'react';
import { Link, Redirect } from "react-router-dom";
import {site_url,base_url} from '../../Apiurl'; 



class Repclientsorting extends React.Component {
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


	render(){
		  return (
		    <div className="d-flex flex-wrap sort-by">
						<div className="sort-selected d-flex flex-wrap align-center">
							<h2>Sort by</h2>
						</div>
						<div className="drop-down-menu">
							<ul>
								<li><Link to={""} title="&sort_by=created&sort_order=ASC"  onClick={this.SortClient}>Newest user</Link></li>
								<li><Link to={""} title="&sort_by=created&sort_order=DESC"  onClick={this.SortClient}>Oldest user</Link></li>
								<li><Link to={""} title="&sort_by=field_first_name_value&sort_order=ASC"  onClick={this.SortClient}>A-Z</Link></li>
								<li><Link to={""} title="&sort_by=field_first_name_value&sort_order=DESC"  onClick={this.SortClient}>Z-A</Link></li>
							</ul>
						</div>
			</div>
		  )
	}
}
export default Repclientsorting;