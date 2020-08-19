import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url,Client} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from'../constants/common';
import {resourcesmsg} from'../constants/resources';


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
			noDatafound:resourcesmsg.resources.resourcesListEmpty,
			noData:false,
			showCancelicon:false,

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
		fetch(Client.GetResourcesList.url,{
			headers: {
                	 "Content-Type" : "application/json",
                	 "X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.GetResourcesList.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    			this.setState({ResourceList:data});
    	})

    	fetch(Client.GetProductTitle.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.GetProductTitle.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({productList:data})
    		document.querySelectorAll(".product-list-item li a").forEach((item,index)=>{
    			if(item.getAttribute("data-pid")===localStorage.getItem("for-resources")){
    				item.click();
    				setTimeout(()=>{
    					item.classList.add("active");
    				},1000)
    			}
    		})

    	})

    	fetch(Client.GetResourceTypeTitleId.url,{
			headers: {
                	 "Content-Type" : "application/json",
                	 "X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.GetResourceTypeTitleId.method,
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
		if(localStorage.getItem("for-resources")!=='' && localStorage.getItem("for-resources")!==null && localStorage.getItem("for-resources")){
			localStorage.removeItem("for-resources")
		}
		if(e.target.parentNode.parentNode.classList.contains("product-list-item")){
			if(!e.target.classList.contains("active")){
				document.querySelectorAll(".product-list-item > li > a").forEach((item,index)=>{
					item.classList.remove("active")	
				})
		     }
		}if(e.target.parentNode.parentNode.classList.contains("resource-filter-type")){
			if(!e.target.classList.contains("active")){
				document.querySelectorAll(".resource-filter-type > li > a").forEach((item,index)=>{
					item.classList.remove("active")	
				})
			}
		} if(e.target.parentNode.parentNode.classList.contains("resource-filter-sort")){
			if(!e.target.classList.contains("active")){
				document.querySelectorAll(".resource-filter-sort > li > a").forEach((item,index)=>{
					item.classList.remove("active")	
			  })
			}
		}
		e.target.classList.toggle("active");
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
		document.querySelectorAll(".resource-filter-sort > li > a").forEach((item,index)=>{
				if(item.classList[0]==="active"){
		 			resourceSortFilter=item.getAttribute("data-get-filterindex")
			 	}	
			})		
		if(ProductId!==undefined){
			ProductId=ProductId;
		}else{
			localStorage.removeItem("for-resources")
			ProductId='';
		}
		resourceTypefilterId=resourceTypefilterId!==undefined ? "&field_resource_type_target_id="+resourceTypefilterId :'';
		resourceSortFilter=resourceSortFilter!==undefined ?resourceSortFilter :'';
		console.log(ProductId);
		console.log(resourceTypefilterId);
		console.log(resourceSortFilter);

		fetch(Client.FilterByResourceId.url+ProductId+"?_format=json"+resourceTypefilterId+resourceSortFilter+"&title="+document.querySelector("#myInput").value,{
			headers: {
                	 "Content-Type" : "application/json",
                	 "X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.FilterByResourceId.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({ResourceList:data,loader:false});
    		if(document.querySelectorAll(".resources-box") && document.querySelectorAll(".resources-box").length <= 0){
    			this.setState({noData:true});
    		}else{
    			this.setState({noData:false});
    		}	
    	})

	}


	triggerWhilePdfOpen=(e,nid,pdf)=>{
		let bodyparam={"nid":nid};
		fetch(Client.tirggerResourcedf.url,{
				headers: {
                	 "Content-Type" : "application/json",
                	 "X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.tirggerResourcedf.method,
                body:JSON.stringify(bodyparam),
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		window.open(site_url+pdf,"_blank");
    	})
	}
	
	ListResourcesforSearch=(e)=>{
		let resourcenameString=e.target.value;
			/*	document.querySelectorAll(".resource-filter-type li a").forEach((item,index)=>{
					 console.log(item.classList[0]);
					 if(item.classList[0]==="active"){
					 	resource_id=item.getAttribute("data-resource-id");
					 }else{
					 	resource_id='All';
					 }
				})*/
		let resource_id=document.querySelectorAll(".product-list-item li a.active").length > 0 ? document.querySelector(".product-list-item li a.active").getAttribute("data-pid") : 'All';
		let filterType=document.querySelectorAll(".resource-filter-type li a.active").length > 0 ? document.querySelector(".resource-filter-type li a.active").getAttribute("data-resource-id") : 'All';

		if(resourcenameString!==''){
			console.log(resourcenameString)
			this.setState({showCancelicon:true})
			fetch(Client.ListResourcesforSearch.url+"&field_resource_type_target_id="+filterType+"&field_product_category_target_id="+resource_id+"&title="+resourcenameString,{
				headers: {
	                	 "Content-Type" : "application/json",
	                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
	                },
	                method:Client.ListResourcesforSearch.method,
	    	}).then(res=>{
	    		return res.json()
	    	}).then(data=>{	
	    		console.log(data);
	    		this.setState({SearchList:data});
	    	})
    	}else{
    		let self=this;
    		setTimeout(()=>{
    			self.setState({showCancelicon:false,SearchList:''});
    			self.callResourceListAfterSearchEmpty();
    		},800);

   		}
	}


	callResourceListAfterSearchEmpty=()=>{
		let resource_id=document.querySelectorAll(".product-list-item li a.active").length > 0 ? document.querySelector(".product-list-item li a.active").getAttribute("data-pid") : 'All';
		let filterType=document.querySelectorAll(".resource-filter-type li a.active").length > 0 ? document.querySelector(".resource-filter-type li a.active").getAttribute("data-resource-id") : 'All';

		fetch(Client.SortResources.url+"&field_resource_type_target_id="+filterType+"&field_product_category_target_id="+resource_id+"&title=",{
			headers: {
                	 "Content-Type" : "application/json",
                	 "X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.SortResources.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({ResourceList:data});
    		if(document.querySelectorAll(".resources-box") && document.querySelectorAll(".resources-box").length <= 0){
    			this.setState({noData:true,SearchList:''});

    		}else{
    			this.setState({noData:false,SearchList:''});
    		}	
    	})
	}

	SearchResourcesByTitle=(e)=>{
		/*let resource_id=localStorage.getItem("resource-id") && localStorage.getItem("resource-id")!=='' ? localStorage.getItem("resource-id") : 'All';
		let filterType=localStorage.getItem("resource-filter-type") && localStorage.getItem("resource-filter-type")!=='' ? localStorage.getItem("resource-filter-type") : '';*/
		let resource_id=document.querySelectorAll(".product-list-item li a.active").length > 0 ? document.querySelector(".product-list-item li a.active").getAttribute("data-pid") : 'All';
		let filterType=document.querySelectorAll(".resource-filter-type li a.active").length > 0 ? document.querySelector(".resource-filter-type li a.active").getAttribute("data-resource-id") : 'All';
		let searchValue=e.target.getAttribute("data-title-name");
		document.querySelector("#myInput").value=searchValue;

		fetch(Client.SortResources.url+"&field_resource_type_target_id="+filterType+"&field_product_category_target_id="+resource_id+"&title="+searchValue,{
			headers: {
                	 "Content-Type" : "application/json",
                	 "X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.SortResources.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({ResourceList:data});
    		if(document.querySelectorAll(".resources-box") && document.querySelectorAll(".resources-box").length <= 0){
    			this.setState({noData:true,SearchList:''});

    		}else{
    			this.setState({noData:false,SearchList:''});
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
							<img src={require("../../images/resources-logo-blue.svg")} alt="profile-logo"/>
							<h1>Resources</h1>
						</div>
						<UserProfile historyPush={this.props}/>
					</div>
					
				</div>
				

				
				<div className="bottom-content-block with-filter">
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
											{this.state.showCancelicon ?<Link to={""} onClick={((e)=>{e.preventDefault(); document.querySelector("#myInput").value='' ; this.setState({showCancelicon:false}); this.callResourceListAfterSearchEmpty();})} className="clear-search-value"><img src={require("../../images/close-icon-gray.svg")} alt="Close icon" /></Link> : ""}
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
						{!this.state.loader ?
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
							:
							<>
								{cosmaticAsset.cosmatic.default.loader}
							</>
						}

						<>
						{this.state.noData ? this.state.noDatafound :''}
						</>
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

export default Resources;