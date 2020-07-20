import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 

class Repannouncementsfilter extends React.Component{
	constructor(props){
		super(props);
		this.state={
			anouncementproductdropdown:[],
			openPopup:false,
			companyList:[]
		}
		this.filterTheClient=this.filterTheClient.bind(this);

	}

	componentDidMount(){
		this.get_product_list();
		this.get_location_list();
	}

	get_product_list=()=>{

		try{
			fetch(`https://staging.project-progress.net/projects/hydro/jsonapi/products?_format=json`,{
					headers: {
	                	"Content-Type" : "application/json",
	                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                },
	                method:'GET',
			}).then(res=>{
				return res.json();
			}).then(data=>{
				console.log(data);
				this.setState({anouncementproductdropdown:data})
			})
	 	}catch(err){
	 		console.log(err);
	 	}
	}

	filterTheClient=(e)=>{
		e.preventDefault();
		let locationvalue,productvalue;
		if(e.target.parentNode.parentNode.classList.contains("location-list-item")){
			document.querySelectorAll(".location-item").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
			e.target.classList.add("active");
			document.querySelectorAll(".location-item").forEach((item,index)=>{
				if(item.classList.contains("active")){
					locationvalue=item.getAttribute("title");
				}
			})


		}
		if(e.target.parentNode.parentNode.classList.contains("product-list-item")){
			document.querySelectorAll(".product-item").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
			e.target.classList.add("active");
			document.querySelectorAll(".product-item").forEach((item,index)=>{
				if(item.classList.contains("active")){
					productvalue=item.getAttribute("data-id");
				}
			})
		}

		try{
			fetch(`https://staging.project-progress.net/projects/hydro/jsonapi/announcement_clients?_format=json&field_product_target_id=${productvalue==='' || productvalue===undefined ? '' : productvalue}&field_organisation_value=${locationvalue==='' || locationvalue===undefined ? '' : locationvalue}`,{
					headers: {
	                	"Content-Type" : "application/json",
	                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                },
	                method:'GET',
			}).then(res=>{
				return res.json();
			}).then(data=>{
				console.log(data);

				//this.setState({anouncementproductdropdown:data})
			})
	 	}catch(err){
	 		console.log(err);
	 	}

	}


	get_location_list=()=>{

		try{
			fetch(`https://staging.project-progress.net/projects/hydro/json/company_list?_format=json`,{
					headers: {
	                	"Content-Type" : "application/json",
	                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                },
	                method:'GET',
			}).then(res=>{
				return res.json();
			}).then(data=>{
				console.log(data);
				this.setState({companyList:data})
			})
	 	}catch(err){
	 		console.log(err);
	 	}
	}




	render(){
		return(
				<div className="announcements-filter d-flex flex-wrap align-center">
							<h4>Select which clients you want to see the announcements</h4>
							<div className="filter-right d-flex flex-wrap">
								<div className="select-box location">
									<span>Location</span>
									<ul className="list location-list-item">
										{this.state.companyList.map((item,index)=>
											<li key={index}><Link className="location-item" to={""} onClick={this.filterTheClient} title={item.field_organisation}>{item.field_organisation}</Link></li>		
										)}
									</ul>
								</div>
								<div className="select-box prod-type">
									<span>Product Types</span>
									<ul className="list product-list-item">
									 {this.state.anouncementproductdropdown.map((item,index)=>
											<li key={index}><Link className="product-item" to={""} data-id={item.nid} onClick={this.filterTheClient} title={item.title}>{item.title}</Link></li>	
									 	)}
									</ul>
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

			)
	}
}

export default Repannouncementsfilter;