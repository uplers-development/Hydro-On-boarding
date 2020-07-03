import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from'../constants/common';

class Resources extends Component {
	constructor(props) {
		super(props);
		this.state={
			ResourceList:[],
			productList:[],
			ResourceTypelist:[],
			SearchList:[],
			mobileview:false,
			loader:true,

		}
		this.ListResourcesforSearch=this.ListResourcesforSearch.bind(this);
		this.SearchResourcesByTitle=this.SearchResourcesByTitle.bind(this);
		this.FiltersApplied=this.FiltersApplied.bind(this);
	}


	componentDidMount(){
		 if(localStorage.getItem("access-token")!==null){
			localStorage.removeItem("resource-id");
			localStorage.removeItem("resource-filter-type");
			this.GetFilterValues();
		}else{
			this.props.history.push("/Login")
		}
	}

	GetFilterValues=()=>{
		fetch(Apiurl.GetResourcesList.url,{
			headers: {
                	 "Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.GetResourcesList.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({ResourceList:data});
    	})

    	fetch(Apiurl.GetResourcesList.url,{
			headers: {
                	 "Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.GetResourcesList.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({ResourceList:data});
    	})

    	fetch(Apiurl.GetProductTitle.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.GetProductTitle.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({productList:data})
    	})

    	fetch(Apiurl.GetResourceTypeTitleId.url,{
			headers: {
                	 "Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.GetResourceTypeTitleId.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({ResourceTypelist:data,loader:false});
    	})
	}
	

	FiltersApplied=(e)=>{
		this.setState({loader:true})
		console.log(e.target);
		if(e.target.parentNode.parentNode.classList.contains("product-list-item")){
			document.querySelectorAll(".product-list-item > li > a").forEach((item,index)=>{
				item.classList.remove("active")	
			})
		}if(e.target.parentNode.parentNode.classList.contains("resource-filter-type")){
			document.querySelectorAll(".resource-filter-type > li > a").forEach((item,index)=>{
				item.classList.remove("active")	
			})
		} if(e.target.parentNode.parentNode.classList.contains("resource-filter-sort")){
			document.querySelectorAll(".resource-filter-sort > li > a").forEach((item,index)=>{
				item.classList.remove("active")	
			})
		}
		//console.log(e.target.classList.add("active"));
		let ProductId,resourceTypefilterId,resourceSortFilter;	
		document.querySelectorAll(".product-list-item > li > a").forEach((item,index)=>{
				if(item.classList[0]==="active"){
		 			ProductId=item.getAttribute("data-pid")
			 	}	
			})
		document.querySelectorAll(".resource-filter-type > li > a").forEach((item,index)=>{
				if(item.classList[0]==="active"){
		 			resourceTypefilterId=item.getAttribute("data-resource-id")
			 	}	
			})
		e.target.classList.add("active");
		document.querySelectorAll(".resource-filter-sort > li > a").forEach((item,index)=>{
				if(item.classList[0]==="active"){
		 			resourceSortFilter=item.getAttribute("data-get-filterindex")
			 	}	
			})		
		ProductId=ProductId!==undefined ?ProductId :'All';
		resourceTypefilterId=resourceTypefilterId!==undefined ? "&field_resource_type_target_id="+resourceTypefilterId :'';
		resourceSortFilter=resourceSortFilter!==undefined ?resourceSortFilter :'';
		console.log(ProductId);
		console.log(resourceTypefilterId);
		console.log(resourceSortFilter);

		fetch(Apiurl.FilterByResourceId.url+ProductId+"?_format=json"+resourceTypefilterId+resourceSortFilter,{
			headers: {
                	 "Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.FilterByResourceId.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({ResourceList:data,loader:false});
    	})

	}


	triggerWhilePdfOpen=(e,nid,pdf)=>{
		
		fetch(`http://staging.project-progress.net/projects/hydro/node/${nid}?_format=json`,{
                method:Apiurl.FilterByResourceId.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		window.open(site_url+pdf,"_blank");
    	})
	}
	
	ListResourcesforSearch=(e)=>{
		let resource_id;
		let resourcenameString=e.target.value;
				document.querySelectorAll(".resource-filter-type li a").forEach((item,index)=>{
					 console.log(item.classList[0]);
					 if(item.classList[0]==="active"){
					 	resource_id=item.getAttribute("data-resource-id");
					 }else{
					 	resource_id='All';
					 }
				})
		if(resourcenameString!==''){
			console.log(resourcenameString)
			fetch(Apiurl.ListResourcesforSearch.url+"&field_resource_type_target_id="+resource_id+"&title="+resourcenameString,{
				headers: {
	                	 "Content-Type" : "application/json",
	                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
	                },
	                method:Apiurl.ListResourcesforSearch.method,
	    	}).then(res=>{
	    		return res.json()
	    	}).then(data=>{	
	    		console.log(data);
	    		this.setState({SearchList:data});
	    	})
    	}else{
    		this.setState({SearchList:''});
   		}
	}

	SearchResourcesByTitle=(e)=>{
		let resource_id=localStorage.getItem("resource-id") && localStorage.getItem("resource-id")!=='' ? localStorage.getItem("resource-id") : 'All';
		let filterType=localStorage.getItem("resource-filter-type") && localStorage.getItem("resource-filter-type")!=='' ? localStorage.getItem("resource-filter-type") : '';
		let searchValue=e.target.getAttribute("data-title-name");
		fetch(Apiurl.SortResources.url+"&field_resource_type_target_id="+resource_id+filterType+"&title="+searchValue,{
			headers: {
                	 "Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.SortResources.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({ResourceList:data});
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
							<img src={require("../../images/resources-logo-blue.svg")} alt="profile-logo"/>
							<h1>Resources</h1>
						</div>
						<UserProfile/>
					</div>
					
				</div>
				

				
				<div className="bottom-content-block with-filter">

					{!this.state.loader ?
					<div className="d-flex flex-wrap resources-main">

						
						<div className="fileter-block d-flex flex-wrap border-bottom">

							
							<div className="select-box">
								<span>Products</span>
								<ul className="list product-list-item">
								{this.state.productList.map((productItem,index)=>
									<li key={index}><Link title={ReactHtmlParser(productItem.title)} data-pid={productItem.nid} onClick={this.FiltersApplied}>{ReactHtmlParser(productItem.title)}</Link></li>
								)}
								</ul>
							</div>
							

							
							<div className="select-box">
								<span>Types</span>
								<ul className="list resource-filter-type">
									{this.state.ResourceTypelist.map((resourcetitle,index)=>
										<li key={index}><Link data-resource-id={resourcetitle.tid}  title={ReactHtmlParser(resourcetitle.name)} onClick={this.FiltersApplied}>{ReactHtmlParser(resourcetitle.name)}</Link></li>
									)}
								</ul>
							</div>
							

							
							<div className="search-sort-block d-flex flex-wrap align-center">
								
								<div className="auto-search-box">
									<form>
										<div className="autocomplete">
											<input id="myInput" type="text" name="hydro" onChange={this.ListResourcesforSearch}/>
										</div>
										<ul className="list">
											{this.state.SearchList.length > 0 && this.state.SearchList.map((resourcename,index)=>
												<li key={resourcename.nid} ><Link data-title-name={ReactHtmlParser(resourcename.title)} onClick={this.SearchResourcesByTitle}>{ReactHtmlParser(resourcename.title)}</Link></li>
											)}
										</ul>
									</form>
								</div>

								<div className="d-flex flex-wrap sort-by">
									<div className="sort-selected d-flex flex-wrap align-center">
										<h2>Sort by</h2>
									</div>
									<div className="drop-down-menu">
										<ul className='resource-filter-sort'>
											<li><Link title="Recently added" data-get-filterindex="&sort_by=created&sort_order=DESC" onClick={this.FiltersApplied}>Recently added</Link></li>
											<li><Link title="Oldest-Newest"  data-get-filterindex="&sort_by=created&sort_order=ASC" onClick={this.FiltersApplied}>Oldest-Newest</Link></li>
											<li><Link title="Recently viewed" data-get-filterindex="&sort_by=timestamp&sort_order=DESC" onClick={this.FiltersApplied}>Recently viewed</Link></li>
											<li><Link title="Most viewed" data-get-filterindex="&sort_by=totalcount&sort_order=DESC" onClick={this.FiltersApplied}>Most viewed</Link></li>
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
											<a href="javascript:void(0)" title="close-btn" className="filter-open-btn" onClick={(e)=>this.setState({mobileView:false})}>
												<img src={require("../../images/ic_close.svg")} alt="ic_close"/>
											</a>
										</div>

										<div className="list-filter-mobile">
											<h5>Product</h5>
											<ul className='product-list-item'>
												{this.state.productList.map((productItem,index)=>
													<li key={index}><Link title={ReactHtmlParser(productItem.title)} data-pid={productItem.nid} onClick={this.FiltersApplied}>{ReactHtmlParser(productItem.title)}</Link></li>
												 )}
												
											</ul>

											<h5>Types</h5>
											<ul className="list resource-filter-type list-type-mobile-filter">
												{this.state.ResourceTypelist.map((resourcetitle,index)=>
													<li key={index}><Link data-resource-id={resourcetitle.tid}  title={ReactHtmlParser(resourcetitle.name)} onClick={this.FiltersApplied}>{ReactHtmlParser(resourcetitle.name)}</Link></li>
												)}
											</ul>

											<h5>Sort by</h5>
											<ul className='resource-filter-sort'>
												<li><Link title="Recently added" data-get-filterindex="&sort_by=created&sort_order=DESC" onClick={this.FiltersApplied}>Recently added</Link></li>
												<li><Link title="Oldest-Newest"  data-get-filterindex="&sort_by=created&sort_order=ASC" onClick={this.FiltersApplied}>Oldest-Newest</Link></li>
												<li><Link title="Recently viewed" data-get-filterindex="&sort_by=timestamp&sort_order=DESC" onClick={this.FiltersApplied}>Recently viewed</Link></li>
												<li><Link title="Most viewed" data-get-filterindex="&sort_by=totalcount&sort_order=DESC" onClick={this.FiltersApplied}>Most viewed</Link></li>
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
							<div className="resources-list d-flex flex-wrap">
							{this.state.ResourceList.map((resourceItem,index)=>
								<div className="resources-box" key={index} onClick={(e)=>this.triggerWhilePdfOpen(e,resourceItem.nid,resourceItem.field_resources_document)}>
									<div>
										<div className="image-block">
											<div className="bg-cover" style={{backgroundImage: `url(${site_url+resourceItem.field_resources_image})`}}></div>
											<label>{ReactHtmlParser(resourceItem.field_resource_type)}</label>		
										</div>
										<div className="res-content">
											<h3>{ReactHtmlParser(resourceItem.title)}</h3>
											<p>{ReactHtmlParser(resourceItem.field__resources_description)}</p>
											<div className="date">{resourceItem.created}</div>
										</div>
									</div>
								</div>
							)}
							</div>							
						</div>
					</div>:
					<>
						{cosmaticAsset.cosmatic.default.loader}
					</>}
				</div>
			</div>
		</div>
	</section>
			</div>
		);
	}
}

export default Resources;