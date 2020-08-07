import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import Apiurl,{site_url,Repclient} from '../../Apiurl'; 

class Repannouncementmobile extends React.Component {
	constructor(props){
		super(props);
		this.state={
				anouncementproductdropdown:[],
				openContainer:false,
				companyList:[]
			}
		this.filterTheClientlocation=this.filterTheClientlocation.bind(this);
		this.filterTheClientProduct=this.filterTheClientProduct.bind(this);
	}

	componentDidMount(){
		this.get_product_list();
		this.get_location_list();
	}

	get_product_list=()=>{

		try{
			fetch(Repclient.RepAnnouncementproductlist.url,{
					headers: {
	                	"Content-Type" : "application/json",
	                	"X-CSRF-Token" : localStorage.getItem("access-token"),
	                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                },
	                method:Repclient.RepAnnouncementproductlist.method,
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

	filterTheClientlocation=(e)=>{
		e.preventDefault();
		let locationvalue,productvalue;
		if(!e.target.classList.contains('active')){
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
			productvalue=document.querySelector(".product-item") && document.querySelector(".product-item").classList.contains("active") ? document.querySelector(".product-item").getAttribute("data-id") : '';
			console.log(productvalue);
			try{
				fetch(Repclient.RepAnnouncementfilterclientlocation.url+`&field_product_target_id=${productvalue==='' || productvalue===undefined ? '' : productvalue}&field_organisation_value=${locationvalue==='' || locationvalue===undefined ? '' : locationvalue}`,{
						headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                method:Repclient.RepAnnouncementfilterclientlocation.method,
				}).then(res=>{
					return res.json();
				}).then(data=>{
					console.log(data);
					this.props.checkFiltereddata(data);
					//this.setState({anouncementproductdropdown:data})
				})
	 	}catch(err){
	 		console.log(err);
	 	}
		}else{
			console.log(e.target);
			e.target.classList.remove("active");
			locationvalue='';

			try{
				fetch(Repclient.RepAnnouncementfilterclientlocation.url+`&field_product_target_id=${productvalue==='' || productvalue===undefined ? '' : productvalue}&field_organisation_value=${locationvalue==='' || locationvalue===undefined ? '' : locationvalue}`,{
						headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                method:Repclient.RepAnnouncementfilterclientlocation.method,
				}).then(res=>{
					return res.json();
				}).then(data=>{
					console.log(data);
					this.props.checkFiltereddata(data);
					//this.setState({anouncementproductdropdown:data})
				})
	 	}catch(err){
	 		console.log(err);
	 	}
		}
	}


	filterTheClientProduct=(e)=>{
		e.preventDefault();
		let productvalue,locationvalue;
		if(!e.target.classList.contains('active')){
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
			locationvalue=document.querySelector(".location-item") && document.querySelector(".location-item").classList.contains("active") ? document.querySelector(".location-item").getAttribute("title") : '';

			try{
				fetch(Repclient.RepAnnouncementfilterclientlocation.url`&field_product_target_id=${productvalue==='' || productvalue===undefined ? '' : productvalue}&field_organisation_value=${locationvalue==='' || locationvalue===undefined ? '' : locationvalue}`,{
						headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                method:Repclient.RepAnnouncementfilterclientlocation.method,
				}).then(res=>{
					return res.json();
				}).then(data=>{
					console.log(data);
					this.props.checkFiltereddata(data);
					//this.setState({anouncementproductdropdown:data})
				})
	 	}catch(err){
	 		console.log(err);
	 	}
		}else{
			console.log(e.target);
			e.target.classList.remove("active");
			productvalue='';
			try{
				fetch(Repclient.RepAnnouncementfilterclientlocation.url`&field_product_target_id=${productvalue==='' || productvalue===undefined ? '' : productvalue}&field_organisation_value=${locationvalue==='' || locationvalue===undefined ? '' : locationvalue}`,{
						headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                method:Repclient.RepAnnouncementfilterclientlocation.method,
				}).then(res=>{
					return res.json();
				}).then(data=>{
					console.log(data);
					this.props.checkFiltereddata(data);
					//this.setState({anouncementproductdropdown:data})
				})
	 	}catch(err){
	 		console.log(err);
	 	}


		}
	}

	get_location_list=()=>{

		try{
			fetch(Repclient.RepAnnouncementlocationlist.url,{
					headers: {
	                	"Content-Type" : "application/json",
	                	"X-CSRF-Token" : localStorage.getItem("access-token"),
	                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                },
	                method:Repclient.RepAnnouncementlocationlist.method,
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

			<div className={this.state.openContainer ? "mobile-filter filter-active" : "mobile-filter"}>
			   <Link to={""}  onClick={((e)=>{
	                                 	e.preventDefault()
	                                 	this.setState({openContainer:true})
	                                 })} title="filter-btn" className="filter-open-btn">
			   		<img src={require("../../../images/ic_filter.svg")} alt="ic_filter" />
			   </Link>
			   <div className="open-close-filter-block">
			      <div className="top-head d-flex flex-wrap align-center">
			         <div className="top-title d-flex flex-wrap">
			            <img src={require("../../../images/ic_filter-blue.svg")} alt="ic_filter" />
			            <h4>Filters</h4>
			         </div>
		          	 <Link to={""}  onClick={((e)=>{
	                                 	e.preventDefault();
	                                 	this.setState({openContainer:false})
	                                 })} title="close-btn" className="filter-open-btn">
			         	<img src={require("../../../images/ic_close.svg")} alt="ic_close" />
			         </Link>
			      </div>
			      <div className="list-filter-mobile">
			         <h5>Location</h5>
			         <ul className="list location-list-item">
						{this.state.companyList.map((item,index)=>
							<li key={index}><Link className="location-item" to={""} onClick={this.filterTheClientlocation} title={item.field_organisation}>{item.field_organisation}</Link></li>		
						)}
			         </ul>
			         <h5>Product Types</h5>
			         <ul className="list product-list-item">
			           {this.state.anouncementproductdropdown.map((item,index)=>
							<li key={index}><Link className="product-item" to={""} data-id={item.tid} onClick={this.filterTheClientProduct} title={ReactHtmlParser(item.name)}>{ReactHtmlParser(item.name)}</Link></li>	
						 )}
			         </ul>
			      </div>
			   </div>
			</div>
			)

	}
}

export default Repannouncementmobile; 
