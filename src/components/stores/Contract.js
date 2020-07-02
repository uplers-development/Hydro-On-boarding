import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';


class Contract extends Component {
	constructor(props) {
		super(props);
		this.state={
			contractDetails:[],
			categoryfilter:[],
			contractType:[],
			ContractdropDownSearch:[],
			mobileView:false,
		}
		this.ContractTypeBaseFilter=this.ContractTypeBaseFilter.bind(this);
		this.ContractSortByDateOld=this.ContractSortByDateOld.bind(this);
		this.ContractSortByDateNew=this.ContractSortByDateNew.bind(this);
		this.ContractSortA_Z=this.ContractSortA_Z.bind(this);
		this.ContractTypeProductBaseFilter=this.ContractTypeProductBaseFilter.bind(this);
		this.GetAllContractForSearch=this.GetAllContractForSearch.bind(this);
		this.ContractSearchListData=this.ContractSearchListData.bind(this);
	}

	componentDidMount(){
	 if(localStorage.getItem("access-token")!==null){

		this.GetContractForEndusers();
		this.ProductCategory();
		this.GetContractType();
	}else{
		this.props.history.push("/Login")
	}
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
				headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
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

	ContractTypeProductBaseFilter=(e)=>{
		e.preventDefault()
		if(window.innerWidth<=767){
			document.querySelectorAll(".list-filter-mobile > .sorting-filter > li").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
			e.target.parentNode.classList.add("active");
		}
		let uid=JSON.parse(localStorage.getItem("user-type")).uid
		let nid=e.target.getAttribute("data-product-id");
		fetch(Apiurl.ContractTypeProductBaseFilter.url+uid+'/'+nid+"?_format=json",{
                method:Apiurl.ContractTypeProductBaseFilter.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data})
    	})
	}

	ContractTypeBaseFilter=(e)=>{
		e.preventDefault()
		let typeId=e.target.getAttribute("data-contracttype-id");
		fetch(Apiurl.ContractTypeBaseFilter.url+"&field_contract_document_type_target_id="+typeId,{
				headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
                method:Apiurl.ContractTypeBaseFilter.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data})
    	})
	}


	GetAllContractForSearch=(e)=>{
		if(e.target.value!==''){
		var contractText=e.target.value;
		fetch(Apiurl.GetAllContractForSearch.url+"&title="+contractText,{
				headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
                method:Apiurl.GetAllContractForSearch.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({ContractdropDownSearch:data})
    	})
     }else{
    	this.setState({ContractdropDownSearch:''})
     }
	}

	ContractSearchListData=(e)=>{
		e.preventDefault()
			
		let textValue=e.target.textContent
		fetch(Apiurl.GetAllContractForSearch.url+"&title="+textValue,{
				headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
                method:Apiurl.GetAllContractForSearch.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({contractDetails:data})
    	})
	}
	

	ContractSortByDateOld=(e)=>{
		e.preventDefault()
		if(window.innerWidth<=767){
			document.querySelectorAll(".drop-down-menu > ul > li").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
			e.target.parentNode.classList.add("active");
		}
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
		if(window.innerWidth<=767){
			document.querySelectorAll(".drop-down-menu > ul > li").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
			e.target.parentNode.classList.add("active");
		}
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
		if(window.innerWidth<=767){
			document.querySelectorAll(".drop-down-menu > ul > li").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
			e.target.parentNode.classList.add("active");
		}
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
										<img src={require("../../images/contracts-logo-blue.svg")} alt="contracts-logo"/>
										<h1>Contracts</h1>
									</div>
									<UserProfile/>
								</div>
								
							</div>
							

							
							<div className="bottom-content-block with-filter">

								
								<div className="d-flex flex-wrap contracts-main">

									
									<div className="fileter-block d-flex flex-wrap border-bottom">

										
										<div className="select-box">
											<span>Products</span>
											<ul className="list">
											{this.state.categoryfilter.map((productItem,index)=>
												<li key={index}><a href="javascript:void(0)" title={ReactHtmlParser(productItem.name)} data-product-id={productItem.tid} onClick={this.ContractTypeProductBaseFilter}>{ReactHtmlParser(productItem.name)}</a></li>
											)}

											</ul>
										</div>
										

										
										<div className="select-box">
											<span>Types</span>
											<ul className="list">
											{this.state.contractType.map((contractType,index)=>
												<li key={index}><a title={contractType.name} data-contracttype-id={contractType.tid} onClick={this.ContractTypeBaseFilter}>{contractType.name}</a></li>	
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
													<ul>
														<li><Link to={""} title="Purchase date newest" onClick={this.ContractSortByDateNew}>Purchase date newest</Link></li>
														<li><Link to={""} title="Purchase date oldest" onClick={this.ContractSortByDateOld}>Purchase date oldest</Link></li>
														<li><Link to={""} title="A-Z" onClick={this.ContractSortA_Z}>A-Z</Link></li>
													</ul>
												</div>
											</div>
											

											
											<div className={this.state.mobileView ? "mobile-filter filter-active" : "mobile-filter"}>
												<a href="#" title="filter-btn" className="filter-open-btn" onClick={(e)=>this.setState({mobileView:true})}>
													<img src={require("../../images/ic_filter.svg")} alt="ic_filter"/>
												</a>

												<div className="open-close-filter-block">
													<div className="top-head d-flex flex-wrap align-center">
														<div className="top-title d-flex flex-wrap">
															<img src={require("../../images/ic_filter-blue.svg")} alt="ic_filter"/>
															<h4>Filters</h4>
														</div>
														<a href="#" title="close-btn" className="filter-open-btn" onClick={(e)=>this.setState({mobileView:false})}>
															<img src={require("../../images/ic_close.svg")} alt="ic_close"/>
														</a>
													</div>

													<div className="list-filter-mobile">
														<h5>Applications</h5>
														<ul>
															{this.state.categoryfilter.map((productItem,index)=>
																<li key={index}><a href="javascript:void(0)" title={productItem.title} data-product-id={productItem.nid} onClick={this.ContractTypeProductBaseFilter}>{productItem.title}</a></li>
															)}
														</ul>

														<h5>Sort by</h5>
														<ul>
															<li><Link to={""} title="Purchase date newest" onClick={this.ContractSortByDateNew}>Purchase date newest</Link></li>
															<li><Link to={""} title="Purchase date oldest" onClick={this.ContractSortByDateOld}>Purchase date oldest</Link></li>
															<li><Link to={""} title="A-Z" onClick={this.ContractSortA_Z}>A-Z</Link></li>

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