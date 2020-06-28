import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from './assets/Sidebar';
import UserProfile from './assets/UserProfile';
import Apiurl,{site_url} from './Apiurl'; 
import ReactHtmlParser from 'react-html-parser';


class Contract extends Component {
	constructor(props) {
		super(props);
		this.state={
			contractDetails:[],
			categoryfilter:[],
			contractType:[],
		}
		this.ContractTypeBaseFilter=this.ContractTypeBaseFilter.bind(this);
		this.ContractSortByDateOld=this.ContractSortByDateOld.bind(this);
		this.ContractSortByDateNew=this.ContractSortByDateNew.bind(this);
		this.ContractSortA_Z=this.ContractSortA_Z.bind(this);
	}

	componentDidMount(){
		this.GetContractForEndusers();
		this.ProductCategory();
		this.GetContractType();
	}


	GetContractForEndusers=()=>{
		fetch(Apiurl.GetContractForEndusers.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
                method:Apiurl.GetContractForEndusers.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data})
    	})
	}

	ProductCategory=()=>{
		fetch(Apiurl.ProductCategoryId.url,{
                method:Apiurl.ProductCategoryId.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({categoryfilter:data})
    	})
	}

	GetContractType =()=>{
		fetch(Apiurl.GetContractType.url,{
                method:Apiurl.GetContractType.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractType:data})
    	})
	}

	ContractTypeBaseFilter=(e)=>{
		e.preventDefault()
		let typeId=e.target.getAttribute("data-contracttype-id");
		fetch(Apiurl.ContractTypeBaseFilter.url+"&field_contract_document_type_target_id="+typeId,{
                method:Apiurl.ContractTypeBaseFilter.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data})
    	})
	}

	ContractSortByFilter=(e)=>{
		e.preventDefault()
		fetch(Apiurl.ContractSortByFilter.url+"&sort_by=title&sort_order=ASC",{
                method:Apiurl.ContractSortByFilter.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data})
    	})
	}
	

	ContractSortByDateOld=(e)=>{
		e.preventDefault()
		fetch(Apiurl.ContractSortByDate.url+"&sort_by=field_purchase_date_value&sort_order=DESC",{
                method:Apiurl.ContractSortByDate.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data})
    	})
	}

	ContractSortByDateNew=(e)=>{
		e.preventDefault()
		fetch(Apiurl.ContractSortByDate.url+"&sort_by=field_purchase_date_value&sort_order=ASC",{
                method:Apiurl.ContractSortByDate.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data})
    	})
	}

	ContractSortA_Z=(e)=>{
		e.preventDefault()
		//let sortBy=e.target.
		fetch(Apiurl.ContractSortA_Z.url+"&sort_by=field_purchase_date_value&sort_order=DESC",{
                method:Apiurl.ContractSortA_Z.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data})
    	})
	}

	render() {
		return (
			<div>
				<section className="main-wrapper">
					<div className="d-flex flex-wrap main-block">

						
						<Sidebar/>						
						
						<div className="d-flex flex-wrap right-content-part">
							
							<div className="top-heading">

								
								<div className="top-heading-continer d-flex flex-wrap align-center">
									<div className="name-of-heading d-flex flex-wrap">
										<img src={require("./../images/resources-logo-blue.svg")} alt="profile-logo"/>
										<h1>Contracts</h1>
									</div>

									<div className="d-flex flex-wrap user-log">
										<div className="user-image-name d-flex flex-wrap align-center">
											<img src={require("./../images/girls-profile-img.png")} alt="Prfile image"/>
											<h2>Username</h2>
										</div>
										<div className="drop-down-menu">
											<ul>
												<li><a href="#" title="Profile">Profile</a></li>
												<li><a href="#" title="Sign out">Sign out</a></li>
											</ul>
										</div>
									</div>
								</div>
								
							</div>
							

							
							<div className="bottom-content-block with-filter">

								
								<div className="d-flex flex-wrap contracts-main">

									
									<div className="fileter-block d-flex flex-wrap border-bottom">

										
										<div className="select-box">
											<a href="#" data-value="">Products</a>
											<ul className="list">
											{this.state.categoryfilter.map((productItem,index)=>
												<li key={index}><Link to={""} title={productItem.name} data-product-id={productItem.tid}>{productItem.name}</Link></li>
											)}

											</ul>
										</div>
										

										
										<div className="select-box">
											<a href="#" data-value="">Types</a>
											<ul className="list">
											{this.state.contractType.map((contractType,index)=>
												<li key={index}><Link title={contractType.name} data-contracttype-id={contractType.tid} onClick={this.ContractTypeBaseFilter}>{contractType.name}</Link></li>	
											)}
											</ul>
										</div>
										

										
										<div className="search-sort-block d-flex flex-wrap align-center">
											
											<div className="auto-search-box">
												<form>
													<div className="autocomplete">
														<input id="myInput" type="text" name="hydro"/>
													</div>
												</form>
											</div>
											


											
											<div className="d-flex flex-wrap sort-by">
												<div className="sort-selected d-flex flex-wrap align-center">
													<h2>Sort by</h2>
												</div>
												<div className="drop-down-menu">
													<ul>
														<li><Link to={""} title="Purchase date newest" onClick={this.ContractSortByDateNew}>Purchase date newest</Link></li>
														<li><Link to={""} title="Purchase date oldest" onClick={this.ContractSortByDateOld}>Purchase date oldest</Link></li>
														<li><Link to={""} title="A-Z" onClick={this.ContractSortA_Z}>A-Z</Link></li>
													</ul>
												</div>
											</div>
											

											
											<div className="mobile-filter">
												<a href="#" title="filter-btn" className="filter-open-btn">
													<img src={require("./../images/ic_filter.svg")} alt="ic_filter"/>
												</a>

												<div className="open-close-filter-block">
													<div className="top-head d-flex flex-wrap align-center">
														<div className="top-title d-flex flex-wrap">
															<img src={require("./../images/ic_filter-blue.svg")} alt="ic_filter"/>
															<h4>Filters</h4>
														</div>
														<a href="#" title="close-btn" className="filter-open-btn">
															<img src={require("./../images/ic_close.svg")} alt="ic_close"/>
														</a>
													</div>

													<div className="list-filter-mobile">
														<h5>Applications</h5>
														<ul>
															<li><a href="#">Stormwater treatment</a></li>
															<li><a href="#">Hydrometry and monitoring</a></li>
															<li><a href="#">Industrial water treatment</a></li>
															<li><a href="#">CSO screening, treatment & flow control</a></li>
															<li className="active"><a href="#">Flow control and flood protection</a></li>
															<li><a href="#">Water and wastewater treatment</a></li>
														</ul>

														<h5>Sort by</h5>
														<ul>
															<li className="active"><a href="#" title="Purchase date newest">Purchase date newest</a></li>
															<li><a href="#" title="Purchase date oldest">Purchase date oldest</a></li>
															<li><a href="#" title="A-Z">A-Z</a></li>

														</ul>

													</div>

												</div>
											</div>
											

										</div>
										

									</div>
									

									
									<div className="container">
										
										<div className="contracts-list d-flex flex-wrap">
										{this.state.contractDetails.map((contractItem,index)=>
											<div className="contracts-box" key={index}>
												<div className="d-flex flex-wrap sky-blue-light">
													<div className="image-block">
														<img src={require("./../images/contract1.png")} alt="contract"/>
													</div>
													<div className="contracts-content">
														<img src={require("./../images/ic_right-circle_blue.svg")} alt="Right icon"/>
														<h3>{contractItem.title}</h3>
														<h4>{contractItem.field_sub_title}</h4>
														<div className="date">Contract expires: {contractItem.field_contract_expiry}</div>	
													</div>
												</div>
											</div>
										)}
										</div>
										
									</div>
									

								</div>

							</div>
							

						</div>
						

					</div>
				</section>
			</div>
		);
	}
}

export default Contract;