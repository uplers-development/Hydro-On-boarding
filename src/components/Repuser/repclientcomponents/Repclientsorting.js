import React from 'react';
import { Link, Redirect } from "react-router-dom";



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
		console.log(e.target.getAttribute("title"));
		alert()
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