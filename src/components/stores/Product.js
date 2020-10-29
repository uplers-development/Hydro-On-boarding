import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url,Client} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from'../constants/common';
import {productmsg} from'../constants/products';
class Product extends Component {
	constructor(props) {
		super(props);
		this.state={
			productList:[],
			categoryfilter:[],
			getTileListforSearch:[],
			mobileView:false,
			loader:true,
			noDataFound:productmsg.product.productListEmpty,
			noData:false,
			showCancelicon:false,
		}

		this.filterProductCategoryById=this.filterProductCategoryById.bind(this);
		this.MobfilterProductCategoryById=this.MobfilterProductCategoryById.bind(this);
		this.SortProductByType=this.SortProductByType.bind(this);
		this.ProductListTitleSearch=this.ProductListTitleSearch.bind(this);
		this.GetProductTitleForSearch=this.GetProductTitleForSearch.bind(this);
		this.selectedIdforResource=this.selectedIdforResource.bind(this);

	}


	componentDidMount(){
		if(localStorage.getItem("access-token")!==null){
			this.productList();
			this.ProductCategory();
		}else{
			this.props.history.push("/Login")
		}
	}

	productList=()=>{
		fetch(Client.ProductListEnduser.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.ProductListEnduser.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({productList:data,loader:false})
    	})
	}

	ProductCategory=()=>{
		fetch(Client.ProductCategoryId.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.ProductCategoryId.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({categoryfilter:data})
    	})
	}

	filterProductCategoryById =(e) =>{
		e.preventDefault();
		let sortByType=document.querySelectorAll(".drop-down-menu ul li a.active").length > 0 ? 
		document.querySelector(".drop-down-menu ul li a.active").getAttribute("sortby") : '';

		if(!e.target.classList.contains("active")){
		document.querySelectorAll(".product-filter-desktop li a").forEach((item,index)=>{
			if(item.classList.contains("active")){item.classList.remove("active")}
		})
		e.target.classList.add("active");
		;
		fetch(Client.FilterProductCategoryById.url+"&field_product_category_target_id="+e.target.getAttribute("data-cat-id")+sortByType+"&title="+document.querySelector("#myInput").value,{
				headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.FilterProductCategoryById.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    			this.setState({productList:data,loader:false})
    			if(document.querySelectorAll(".your-product-box") && document.querySelectorAll(".your-product-box").length <= 0){
    				this.setState({noData:true});
    			}else{
    				this.setState({noData:false});
    			}	
	    	})
        }else{
				e.target.classList.remove("active");
				fetch(Client.FilterProductCategoryById.url+"&field_product_category_target_id=All"+sortByType+"&title="+document.querySelector("#myInput").value,{
						headers: {
		                	"Content-Type" : "application/json",
		                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
		                },
		                method:Client.FilterProductCategoryById.method,
		    	}).then(res=>{
		    		return res.json()
		    	}).then(data=>{	
		    		console.log(data);
		    			this.setState({productList:data,loader:false})
		    			if(document.querySelectorAll(".your-product-box") && document.querySelectorAll(".your-product-box").length <= 0){
		    				this.setState({noData:true});
		    			}else{
		    				this.setState({noData:false});
		    			}	
			    	})

        }
	}

	MobfilterProductCategoryById =(e) =>{
		e.preventDefault();
		let sortByType;
		if(!e.target.classList.contains("active")){
		document.querySelectorAll(".product-sort-by > li > a").forEach((item,index)=>{
				 if(item.parentNode.classList[0]==="active"){
					console.log(item);
				 	sortByType=item.getAttribute("sortby");
                    console.log(sortByType)
				 }
			})
		document.querySelectorAll(".product-filter-mob li").forEach((item,index)=>{
				console.log(item)
				if(item.classList.contains("active")){item.classList.remove("active")}
		})
		document.querySelectorAll(".product-filter-mob li > a").forEach((item,index)=>{
				console.log(item)
				if(item.classList.contains("active")){item.classList.remove("active")}
		})

		if(sortByType===undefined){
			sortByType='';
		}
		//alert(sortByType);
		e.target.parentNode.classList.add("active");
		e.target.classList.add("active");
		let pid=e.target.getAttribute("data-cat-id");
		localStorage.setItem("product_id",pid);
		fetch(Client.FilterProductCategoryById.url+"&field_product_category_target_id="+pid+sortByType+"&title="+document.querySelector("#myInput").value,{
				headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.FilterProductCategoryById.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    			this.setState({productList:data,loader:false})
    			if(document.querySelectorAll(".your-product-box") && document.querySelectorAll(".your-product-box").length <= 0){
    					this.setState({noData:true});
    			}else{
    					this.setState({noData:false});
    			}	
    	})
    	}
    	else{
		e.target.parentNode.classList.remove("active")
		e.target.classList.remove("active");
		document.querySelectorAll(".product-sort-by > li > a").forEach((item,index)=>{
				 if(item.parentNode.classList[0]==="active"){
					console.log(item);
				 	sortByType=item.getAttribute("sortby");
                    console.log(sortByType)
				 }
			})
		document.querySelectorAll(".product-filter-mob li").forEach((item,index)=>{
				console.log(item)
				if(item.classList.contains("active")){item.classList.remove("active")}
		})
		document.querySelectorAll(".product-filter-mob li > a").forEach((item,index)=>{
				console.log(item)
				if(item.classList.contains("active")){item.classList.remove("active")}
		})

		if(sortByType===undefined){
			sortByType='';
		}
		//alert(sortByType);
		let pid='All';
		localStorage.setItem("product_id",pid);
		fetch(Client.FilterProductCategoryById.url+"&field_product_category_target_id="+pid+sortByType+"&title="+document.querySelector("#myInput").value,{
				headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.FilterProductCategoryById.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    			this.setState({productList:data,loader:false})
    			if(document.querySelectorAll(".your-product-box") && document.querySelectorAll(".your-product-box").length <= 0){
    					this.setState({noData:true});
    			}else{
    					this.setState({noData:false});
    			}	
    	})
    	}
	}

	SortProductByType=(e)=>{
		e.preventDefault();
		let productSelectedvalue,productSearchValue;
		if(window.innerWidth > 767){
		if(!e.target.classList.contains("active")){
		document.querySelectorAll(".drop-down-menu > ul > li").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
		document.querySelectorAll(".drop-down-menu > ul > li > a").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
		document.querySelectorAll(".product-filter-desktop li a").forEach((item,index)=>{
				 console.log(item.classList[0]);
				 if(item.classList[0]==="active"){
				 	productSelectedvalue=item.getAttribute("data-cat-id");
				 }
				productSearchValue=document.querySelector("#myInput").value!=='' ? document.querySelector("#myInput").value : ''
		})
			e.target.parentNode.classList.add("active");
			e.target.classList.add("active")

			if(productSelectedvalue===undefined){
			productSelectedvalue="All";
			}	
			let sortByType=e.target.getAttribute("sortby")
			fetch(Client.SortProduct.url+"&field_product_category_target_id="+productSelectedvalue+sortByType+"&title="+productSearchValue,{
				headers: {
	                	"Content-Type" : "application/json",
	                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
	                },
	                method:Client.SortProduct.method,
	    	}).then(res=>{
	    		return res.json()
	    	}).then(data=>{
	    		console.log(data);
	    			this.setState({productList:data,loader:false})
	    			if(document.querySelectorAll(".your-product-box") && document.querySelectorAll(".your-product-box").length <= 0){
	    				this.setState({noData:true});
	    			}else{
	    				this.setState({noData:false});
	    			}	
    		})
	    }else{
	    	document.querySelectorAll(".drop-down-menu > ul > li").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
		document.querySelectorAll(".drop-down-menu > ul > li > a").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
		document.querySelectorAll(".product-filter-desktop li a").forEach((item,index)=>{
				 console.log(item.classList[0]);
				 if(item.classList[0]==="active"){
				 	productSelectedvalue=item.getAttribute("data-cat-id");
				 }
				productSearchValue=document.querySelector("#myInput").value!=='' ? document.querySelector("#myInput").value : ''
		})
			e.target.parentNode.classList.remove("active");
			e.target.classList.remove("active")

			if(productSelectedvalue===undefined){
			productSelectedvalue="All";
			}	
			let sortByType=''
			fetch(Client.SortProduct.url+"&field_product_category_target_id="+productSelectedvalue+sortByType+"&title="+productSearchValue,{
				headers: {
	                	"Content-Type" : "application/json",
	                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
	                },
	                method:Client.SortProduct.method,
	    	}).then(res=>{
	    		return res.json()
	    	}).then(data=>{
	    		console.log(data);
	    			this.setState({productList:data,loader:false})
	    			if(document.querySelectorAll(".your-product-box") && document.querySelectorAll(".your-product-box").length <= 0){
	    				this.setState({noData:true});
	    			}else{
	    				this.setState({noData:false});
	    			}	
    		})
	    }


		}else{
				if(!e.target.classList.contains("active")){
						document.querySelectorAll(".product-sort-by > li").forEach((item,index)=>{
								if(item.classList.contains("active")){item.classList.remove("active")}
							})
							document.querySelectorAll(".product-sort-by > li > a").forEach((item,index)=>{
								if(item.classList.contains("active")){item.classList.remove("active")}
							})
							document.querySelectorAll(".product-filter-mob li a").forEach((item,index)=>{
								console.log(item)
								 if(item.parentNode.classList[0]==="active"){
								 	productSelectedvalue=item.getAttribute("data-cat-id");
								 }
								 productSearchValue=document.querySelector("#myInput").value!=='' ? document.querySelector("#myInput").value : ''
							})
							e.target.parentNode.classList.add("active");
							e.target.classList.add("active");
							if(productSelectedvalue===undefined){
								productSelectedvalue="All";
								}	
								let sortByType=e.target.getAttribute("sortby")
								fetch(Client.SortProduct.url+"&field_product_category_target_id="+productSelectedvalue+sortByType+"&title="+productSearchValue,{
									headers: {
						                	"Content-Type" : "application/json",
						                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
						                },
						                method:Client.SortProduct.method,
						    	}).then(res=>{
						    		return res.json()
						    	}).then(data=>{
						    		console.log(data);
						    			this.setState({productList:data,loader:false})
						    			if(document.querySelectorAll(".your-product-box") && document.querySelectorAll(".your-product-box").length <= 0){
						    				this.setState({noData:true});
						    			}else{
						    				this.setState({noData:false});
						    			}	
					    		})
						}else{
							document.querySelectorAll(".product-sort-by > li").forEach((item,index)=>{
								if(item.classList.contains("active")){item.classList.remove("active")}
							})
							document.querySelectorAll(".product-sort-by > li > a").forEach((item,index)=>{
								if(item.classList.contains("active")){item.classList.remove("active")}
							})
							document.querySelectorAll(".product-filter-mob li a").forEach((item,index)=>{
								console.log(item)
								 if(item.parentNode.classList[0]==="active"){
								 	productSelectedvalue=item.getAttribute("data-cat-id");
								 }
								 productSearchValue=document.querySelector("#myInput").value!=='' ? document.querySelector("#myInput").value : ''
								 
							})
							e.target.parentNode.classList.remove("active");
							e.target.classList.remove("active");
							if(productSelectedvalue===undefined){
								productSelectedvalue="All";
								}	
								let sortByType='';
								fetch(Client.SortProduct.url+"&field_product_category_target_id="+productSelectedvalue+sortByType+"&title="+productSearchValue,{
									headers: {
						                	"Content-Type" : "application/json",
						                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
						                },
						                method:Client.SortProduct.method,
						    	}).then(res=>{
						    		return res.json()
						    	}).then(data=>{
						    		console.log(data);
						    			this.setState({productList:data,loader:false})
						    			if(document.querySelectorAll(".your-product-box") && document.querySelectorAll(".your-product-box").length <= 0){
						    				this.setState({noData:true});
						    			}else{
						    				this.setState({noData:false});
						    			}	
					    		})
				}
			}


	}

	GetProductTitleForSearch=(e)=>{
		console.log("eys");
		let productnamestring=e.target.value;
		let productSelectedvalue;
		console.log(productnamestring)
		if(productnamestring!==''){
		if(window.innerWidth>767){
			document.querySelectorAll(".product-filter-desktop li a").forEach((item,index)=>{
				 console.log(item.classList[0]);
				 if(item.classList[0]==="active"){
				 	productSelectedvalue=item.getAttribute("data-cat-id");
				 }
			})
		}else{
			document.querySelectorAll(".product-filter-mob li a").forEach((item,index)=>{
				console.log(item)
				 if(item.parentNode.classList[0]==="active"){
				 	productSelectedvalue=item.getAttribute("data-cat-id");
				 }
			})
		}
		if(productSelectedvalue===undefined){
			productSelectedvalue="All";
		}		

		console.log(productSelectedvalue);
		//return false;	
		this.setState({showCancelicon:true});
		fetch(Client.GetProductTitle.url+"&field_product_category_target_id="+productSelectedvalue+"&title="+productnamestring,{
			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.GetProductTitle.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({getTileListforSearch:data});
    	})
     }else{
    		let self=this;
    		setTimeout(()=>{
    			self.setState({getTileListforSearch:''});
    			this.setState({showCancelicon:false});
    			self.callProductListAfterSearchEmpty();
    		},800)
        }
	}

	callProductListAfterSearchEmpty=()=>{
		let ProductId=document.querySelectorAll(".product-filter-desktop li a.active").length>0 ? document.querySelector(".product-filter-desktop li a.active").getAttribute("data-cat-id") : "All";
		let SortBy=document.querySelectorAll(".drop-down-menu ul li a.active").length > 0 ? 
		document.querySelector(".drop-down-menu ul li a.active").getAttribute("sortby") : '';

		fetch(Client.FilterProductCategoryById.url+"&field_product_category_target_id="+ProductId+SortBy,{
						headers: {
		                	"Content-Type" : "application/json",
		                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
		                },
		                method:Client.FilterProductCategoryById.method,
		    	}).then(res=>{
		    		return res.json()
		    	}).then(data=>{	
		    		console.log(data);
		    			this.setState({productList:data,loader:false})
		    			if(document.querySelectorAll(".your-product-box") && document.querySelectorAll(".your-product-box").length <= 0){
		    				this.setState({noData:true});
		    			}else{
		    				this.setState({noData:false});
		    			}	
			    	})

	}

	ProductListTitleSearch =(e) =>{
		e.preventDefault();
		let productnamestring=e.target.getAttribute("data-title-name");
		document.querySelector("#myInput").value=productnamestring;
		fetch(Client.ProductListTitleSearch.url+"&title="+productnamestring,{
			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Client.ProductListTitleSearch.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    			this.setState({productList:data,getTileListforSearch:'',loader:false})
    			if(document.querySelectorAll(".your-product-box") && document.querySelectorAll(".your-product-box").length <= 0){
    				this.setState({noData:true});
    			}else{
    				this.setState({noData:false});
    			}	
    	})
	}

	callPDF=(e,value)=>{
		e.preventDefault();
		window.open(site_url+value,"_target")
	}

	selectedIdforResource=(e,productid)=>{
		e.preventDefault();
		localStorage.setItem("for-resources",productid);
		this.props.history.push('/Resources')
	}

	render() {
		return (
			<section className="main-wrapper">
			
			<div className="d-flex flex-wrap main-block">
				<Sidebar historyPush={this.props}/>
			<div className="d-flex flex-wrap right-content-part">
				<div className="top-heading">
						<div className="top-heading-continer d-flex flex-wrap align-center">
							<div className="name-of-heading d-flex flex-wrap align-center">
								<img src={require("../../images/your-product-blue-logo.svg")} alt="product-logo"/>
								<h1>Your products</h1>
							</div>

							<UserProfile historyPush={this.props}/>
						</div>
				</div>

				
				<div className="bottom-content-block with-filter">

					
					<div className="d-flex flex-wrap your-product">

						
						<div className="fileter-block d-flex flex-wrap">

							
							<div className="select-box">
								<span>Applications</span>
									<ul className="list product-filter-desktop">
										{this.state.categoryfilter.map((catname,index)=>
										<li key={catname.tid}><Link to={""} data-cat-id={catname.tid} onClick={this.filterProductCategoryById}>{ReactHtmlParser(catname.name)}</Link></li>
									)}
								</ul>
							</div>
							

							
							<div className="search-sort-block d-flex flex-wrap align-center">

								
								<div className="auto-search-box">
									<form>
										<div className="autocomplete">
											<input id="myInput" type="text" name="hydro" onChange={this.GetProductTitleForSearch}/>
											{this.state.showCancelicon ?<Link to={""} onClick={((e)=>{e.preventDefault(); document.querySelector("#myInput").value='' ; this.setState({showCancelicon:false}); this.callProductListAfterSearchEmpty();})} className="clear-search-value"><img src={require("../../images/close-icon-gray.svg")} alt="Close icon" /></Link> : ""}
										</div>
										<ul className="list">
											{this.state.getTileListforSearch.length > 0 && this.state.getTileListforSearch.map((titlename,index)=>
												<li key={titlename.nid} ><Link to={""} data-title-name={ReactHtmlParser(titlename.title)} onClick={this.ProductListTitleSearch}>{titlename.title}</Link></li>
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
											<li><Link to={""} title="Purchase date newest" sortby="&sort_by=field_purchase_date_value&sort_order=ASC" onClick={this.SortProductByType}>Purchase date newest</Link></li>
											<li><Link to={""} title="Purchase date oldest" sortby="&sort_by=field_purchase_date_value&sort_order=DESC" onClick={this.SortProductByType}>Purchase date oldest</Link></li>
											<li><Link to={""} sortby="&sort_by=title&sort_order=ASC" title="A-Z" onClick={this.SortProductByType}>A-Z</Link></li>
											<li><Link to={""} sortby="&sort_by=title&sort_order=DESC" title="Z-A" onClick={this.SortProductByType}>Z-A</Link></li>
										</ul>
									</div>
								</div>
								

								
								<div className={this.state.mobileView ? "mobile-filter filter-active" : "mobile-filter"} >
										<Link to={""} title="filter-btn" className="filter-open-btn" onClick={((e)=>{e.preventDefault();this.setState({mobileView:true})})}>
											<img src={require("../../images/ic_filter.svg")} alt="ic_filter"/>
										</Link>
	
										<div className="open-close-filter-block">
											<div className="top-head d-flex flex-wrap align-center">
												<div className="top-title d-flex flex-wrap">
													<img src={require("../../images/ic_filter-blue.svg")} alt="ic_filter"/>
													<h4>Filters</h4>
												</div>
												<Link to={""}  title="close-btn" className="filter-open-btn" onClick={((e)=>{e.preventDefault();this.setState({mobileView:false})})}>
													<img src={require("../../images/ic_close.svg")} alt="ic_close"/>
												</Link>
											</div>
	
											<div className="list-filter-mobile">
												<h5>Applications</h5>
												<ul className='product-filter-mob'>

													{this.state.categoryfilter.map((catname,index)=>
															<li key={catname.tid}><Link to={""} onClick={this.MobfilterProductCategoryById} data-cat-id={catname.tid}>{ReactHtmlParser(catname.name)}</Link></li>
													)}
												</ul>
												
												<h5>Sort by</h5>
												<ul className='product-sort-by'>
													<li><Link to={""} title="Purchase date newest" sortby="&sort_by=field_purchase_date_value&sort_order=ASC" onClick={this.SortProductByType}>Purchase date newest</Link></li>
													<li><Link to={""} title="Purchase date oldest" sortby="&sort_by=field_purchase_date_value&sort_order=DESC" onClick={this.SortProductByType}>Purchase date oldest</Link></li>
													<li><Link to={""} sortby="&sort_by=title&sort_order=ASC" title="A-Z" onClick={this.SortProductByType}>A-Z</Link></li>
													<li><Link to={""} sortby="&sort_by=title&sort_order=DESC" title="Z-A" onClick={this.SortProductByType}>Z-A</Link></li>
												</ul>

												<div className="btn-block">
													<button className="common-btn-blue" onClick={(e)=>this.setState({mobileView:false})}><span>Apply filters</span></button>
												</div>
												<div className="btn-block">
													<button className="common-btn-blue" onClick={((e)=>{
															e.preventDefault();
															document.querySelectorAll(".product-filter-mob li a").forEach((item,index)=>{
																item.parentNode.classList.remove("active");
																item.classList.remove("active")
															});
															document.querySelectorAll(".product-sort-by li a").forEach((item,index)=>{
																item.parentNode.classList.remove("active");
																item.classList.remove("active")
															});	
															this.callProductListAfterSearchEmpty()
													})}><span>Clear filters</span></button>
												</div>

											</div>
	
										</div>
									</div>
							</div>
						</div>
						

						<div className="your-product-list">
						{!this.state.loader ?
							<>
							{this.state.productList.map((item,index)=>
								<div className="your-product-box d-flex flex-wrap" key={index} >
									<div className="product-image bg-cover" style={{backgroundImage: `url(${site_url+item.field_product_image})`}}>

									</div>
									<div className="product-content">
										<Link to={""} onClick={((e)=>this.callPDF(e,item.field_product_document))} title={ReactHtmlParser(item.title)}>{ReactHtmlParser(item.title)}</Link>
										<h4>
										{item.field_product_category.split(',').map((cat,cat_index)=>
											<span key={cat_index}>{ReactHtmlParser(cat)}</span>
										)}
										</h4>
										<p>{ReactHtmlParser(item.field_product_description)}</p>
										<div className="purchase-date">Purchase Date: {item.field_purchase_date}</div>
									</div>
									<div className="btn-block">
										<Link to={"/Resources"} title="Resources logo blue"><img src={require("../../images/resources-logo-blue-round.svg")} alt="icon" className="svg" onClick={((e)=>this.selectedIdforResource(e,item.nid))}/> </Link>
										<Link to={""} className="svg" title="Pdf download" onClick={((e)=>this.callPDF(e,item.field_product_document))}><img src={require("../../images/pdf-download-logo.svg")} alt="icon" className="svg" /> </Link>
									</div>
								</div>
							)}
							</>:
							<>
								{cosmaticAsset.cosmatic.default.loader}
							</>
							}
							<>
								{this.state.noData ? this.state.noDataFound: ''}
							</>
						
						</div>


					</div>
					

				</div>
				

			</div>

		</div>
		
	</section>
		);
	}
}


export default Product;