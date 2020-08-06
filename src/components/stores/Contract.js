import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url,Client} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from'../constants/common';
import {contractmsg} from'../constants/contract';


class Contract extends Component {
	constructor(props) {
		super(props);
		this.state={
			contractDetails:[],
			categoryfilter:[],
			contractType:[],
			ContractdropDownSearch:[],
			mobileView:false,
			loader:true,
			noDatafound:contractmsg.contractmsg.contractmsg,
			noData:false,
		}
		this.FilterContract=this.FilterContract.bind(this);
		this.GetAllContractForSearch=this.GetAllContractForSearch.bind(this);
		this.ContractSearchListData=this.ContractSearchListData.bind(this);
	}

	componentDidMount(){
	 if(localStorage.getItem("access-token")!==null){
		this.GetContractForEndusers();
	}else{
		this.props.history.push("/Login")
	}
	}


	GetContractForEndusers=()=>{
		fetch(Client.GetContractForEndusers.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
                method:Client.GetContractForEndusers.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data})
    	})

    	fetch(Client.GetContractProduct.url,{
				headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
                method:Client.GetContractProduct.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({categoryfilter:data})
    	})
		fetch(Client.GetContractType.url,{
		                method:Client.GetContractType.method,
		    	}).then(res=>{
		    		return res.json()
		    	}).then(data=>{	
		    		console.log(data);
		    		this.setState({contractType:data,loader:false})
		    	})
	}

	FilterContract =(e)=>{
		e.preventDefault();
		if(e.target.parentNode.parentNode.classList.contains("product-list-item")){
			if(!e.target.classList.contains("active")){
				document.querySelectorAll(".product-list-item > li > a").forEach((item,index)=>{
					item.classList.remove("active")	
				})
			}
		}else if(e.target.parentNode.parentNode.classList.contains("contract-filter-type")){
			if(!e.target.classList.contains("active")){
				document.querySelectorAll(".contract-filter-type > li > a").forEach((item,index)=>{
					item.classList.remove("active")	
				})
			}
		}else if(e.target.parentNode.parentNode.classList.contains("contract-filter-sort")){
			if(!e.target.classList.contains("active")){
				document.querySelectorAll(".contract-filter-sort > li > a").forEach((item,index)=>{
					item.classList.remove("active")	
				})
			}
		}
		e.target.classList.toggle("active");
		let ProductId,resourceTypefilterId,resourceSortFilter;	
		document.querySelectorAll(".product-list-item > li > a").forEach((item,index)=>{
				if(item.classList[0]==="active"){
		 			ProductId=item.getAttribute("data-product-id")
			 	}	
			})
		document.querySelectorAll(".contract-filter-type > li > a").forEach((item,index)=>{
				if(item.classList[0]==="active"){
		 			resourceTypefilterId=item.getAttribute("data-contracttype-id")
			 	}	
			})
		document.querySelectorAll(".contract-filter-sort > li > a").forEach((item,index)=>{
				if(item.classList[0]==="active"){
		 			resourceSortFilter=item.getAttribute("data-contactractsort-index")
			 	}	
			})		
		ProductId=ProductId!==undefined ?"/"+ProductId :'';
		resourceTypefilterId=resourceTypefilterId!==undefined ? "&field_contract_document_type_target_id="+resourceTypefilterId :'';
		resourceSortFilter=resourceSortFilter!==undefined ?resourceSortFilter :'';
		console.log(ProductId);
		console.log(resourceTypefilterId);
		console.log(resourceSortFilter);
		let uid=JSON.parse(localStorage.getItem("user-type")).uid
		fetch(Client.ContractTypeProductBaseFilter.url+uid+ProductId+"?_format=json"+resourceTypefilterId+resourceSortFilter,{
			headers: {
                	 "Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.ContractTypeProductBaseFilter.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data,loader:false});
    		if(document.querySelectorAll(".contracts-box") && document.querySelectorAll(".contracts-box").length <= 0){
    			this.setState({noData:true});
    		}else{
    			this.setState({noData:false});
    		}	
    	})
	}

	GetAllContractForSearch=(e)=>{
		if(e.target.value!==''){
		var contractText=e.target.value;
		fetch(Client.GetAllContractForSearch.url+"&title="+contractText,{
				headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
                method:Client.GetAllContractForSearch.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({ContractdropDownSearch:data})
    	})
     }else{
    	this.setState({ContractdropDownSearch:''})
    	this.GetContractForEndusers();
     }
	}

	ContractSearchListData=(e)=>{
		e.preventDefault()
			
		let textValue=e.target.textContent;
		document.querySelector("#myInput").value=textValue;
		fetch(Client.GetAllContractForSearch.url+"&title="+textValue,{
				headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
                method:Client.GetAllContractForSearch.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data,ContractdropDownSearch:''})
    		if(document.querySelectorAll(".contracts-box") && document.querySelectorAll(".contracts-box").length <= 0){
    			this.setState({noData:true});
    		}else{
    			this.setState({noData:false,ContractdropDownSearch:''});
    		}
    	})
	}
	

	render() {
		return (
			<div>
				<section className="main-wrapper">
					<div className="d-flex flex-wrap main-block">

						
						<Sidebar historyPush={this.props}/>						
						
						<div className="d-flex flex-wrap right-content-part">
							
							<div className="top-heading">

								
								<div className="top-heading-continer d-flex flex-wrap align-center">
									<div className="name-of-heading d-flex flex-wrap">
										<img src={require("../../images/contracts-logo-blue.svg")} alt="contracts-logo"/>
										<h1>Contracts</h1>
									</div>
									<UserProfile historyPush={this.props}/>
								</div>
								
							</div>
							

							
							<div className="bottom-content-block with-filter">
								
								
								<div className="d-flex flex-wrap contracts-main">

									
									<div className="fileter-block d-flex flex-wrap border-bottom">

										
										<div className="select-box">
											<span>Products</span>
											<ul className="list product-list-item">
											{this.state.categoryfilter.map((productItem,index)=>
												<li key={index}><Link to={""} title={ReactHtmlParser(productItem.title)} data-product-id={productItem.nid} onClick={this.FilterContract}>{ReactHtmlParser(productItem.title)}</Link></li>
											)}

											</ul>
										</div>
										

										
										<div className="select-box">
											<span>Types</span>
											<ul className="list contract-filter-type">
											{this.state.contractType.map((contractType,index)=>
												<li key={index}><Link to={""} title={contractType.name} data-contracttype-id={contractType.tid} onClick={this.FilterContract}>{contractType.name}</Link></li>	
											)}
											</ul>
										</div>
										

										
										<div className="search-sort-block d-flex flex-wrap align-center">
											
											<div className="auto-search-box">
												<form>
													<div className="autocomplete">
														<input id="myInput" type="text" name="hydro" onChange={this.GetAllContractForSearch}/>
													</div>
													<ul className="list">
														{this.state.ContractdropDownSearch.length > 0 && this.state.ContractdropDownSearch.map((contractSearchlist,index)=>
															<li key={contractSearchlist.tid} ><Link data-title-name={ReactHtmlParser(contractSearchlist.title)} onClick={this.ContractSearchListData}>{ReactHtmlParser(contractSearchlist.title)}</Link></li>
														)}
													</ul>
												</form>
											</div>
											


											
											<div className="d-flex flex-wrap sort-by">
												<div className="sort-selected d-flex flex-wrap align-center">
													<h2>Sort by</h2>
												</div>
												<div className="drop-down-menu">
													<ul className="contract-filter-sort">
														<li><Link to={""} title="Expire date newest" data-contactractsort-index="&sort_by=field_contract_expiry_value&sort_order=DESC" onClick={this.FilterContract}>Expire date newest</Link></li>
														<li><Link to={""} title="Expire date oldest" data-contactractsort-index="&sort_by=field_contract_expiry_value&sort_order=ASC" onClick={this.FilterContract}>Expire date oldest</Link></li>
														<li><Link to={""} title="A-Z" data-contactractsort-index="&sort_by=title&sort_order=ASC" onClick={this.FilterContract}>A-Z</Link></li>
														<li><Link to={""} title="Z-A" data-contactractsort-index="&sort_by=title&sort_order=DESC" onClick={this.FilterContract}>Z-A</Link></li>


														
													</ul>
												</div>
											</div>
											

											
											<div className={this.state.mobileView ? "mobile-filter filter-active" : "mobile-filter"}>
												<Link to={""} title="filter-btn" className="filter-open-btn" onClick={((e)=>{e.preventDefault();this.setState({mobileView:true})})}>
													<img src={require("../../images/ic_filter.svg")} alt="ic_filter"/>
												</Link>

												<div className="open-close-filter-block">
													<div className="top-head d-flex flex-wrap align-center">
														<div className="top-title d-flex flex-wrap">
															<img src={require("../../images/ic_filter-blue.svg")} alt="ic_filter"/>
															<h4>Filters</h4>
														</div>
														<Link to={""} title="close-btn" className="filter-open-btn" onClick={((e)=>{e.preventDefault();this.setState({mobileView:false})})}>
															<img src={require("../../images/ic_close.svg")} alt="ic_close"/>
														</Link>
													</div>

													<div className="list-filter-mobile">
														<h5>Products</h5>
														<ul className="product-list-item">
															{this.state.categoryfilter.map((productItem,index)=>
																<li key={index}><Link to={""} title={productItem.title} data-product-id={productItem.nid} onClick={this.FilterContract}>{productItem.title}</Link></li>
															)}
														</ul>

														<h5>Types</h5>
														<ul className="list contract-filter-type">
														{this.state.contractType.map((contractType,index)=>
															<li key={index}><Link to={""} title={contractType.name} data-contracttype-id={contractType.tid} onClick={this.FilterContract}>{contractType.name}</Link></li>	
														)}
														</ul>

														<h5>Sort by</h5>
														<ul className="contract-filter-sort">
															<li><Link to={""} title="Expire date newest" data-contactractsort-index="&sort_by=field_contract_expiry_value&sort_order=DESC" onClick={this.FilterContract}>Expire date newest</Link></li>
														<li><Link to={""} title="Expire date oldest" data-contactractsort-index="&sort_by=field_contract_expiry_value&sort_order=ASC" onClick={this.FilterContract}>Expire date oldest</Link></li>
														<li><Link to={""} title="A-Z" data-contactractsort-index="&sort_by=title&sort_order=ASC" onClick={this.FilterContract}>A-Z</Link></li>
														<li><Link to={""} title="Z-A" data-contactractsort-index="&sort_by=title&sort_order=DESC" onClick={this.FilterContract}>Z-A</Link></li>

														</ul>
														
														<div className="btn-block">
															<button className="common-btn-blue" onClick={(e)=>this.setState({mobileView:false})}><span>Apply filters</span></button>
														</div>
													</div>

												</div>
											</div>
											

										</div>
										

									</div>
									

									
									<div className="container">
										
										<div className="contracts-list d-flex flex-wrap">
										{!this.state.loader ?
										<>
										{this.state.contractDetails.map((contractItem,index)=>
											<div className="contracts-box" key={index} onClick={(e)=>window.open(contractItem.field_contract_document!==''? site_url+contractItem.field_contract_document :contractItem.field_contract_document_external ,"_blank")}>
												<div className="d-flex flex-wrap sky-blue-light">
													<div className="image-block">
														<img src={require("../../images/contract1.png")} alt="contract"/>
													</div>
													<div className="contracts-content">
														<img src={require("../../images/ic_right-circle_blue.svg")} alt="Right icon"/>
														<h3>{contractItem.title}</h3>
														<h4>{contractItem.field_sub_title}</h4>
														<div className="date">Contract expires: {contractItem.field_contract_expiry}</div>	
													</div>
												</div>
											</div>
										)}
										</>:
										<>
											{cosmaticAsset.cosmatic.default.loader}
										</>}
										<>
										{this.state.noData ? this.state.noDatafound :''}
										</>
										</div>
										
									</div>
									

								</div>:
								

							</div>
							

						</div>
						

					</div>
				</section>
			</div>
		);
	}
}

export default Contract;