import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';

class Product extends Component {
	constructor(props) {
		super(props);
		this.state={
			productList:[],
			categoryfilter:[],
			getTileListforSearch:[],
			mobileView:false,
		}

		this.filterProductCategoryById=this.filterProductCategoryById.bind(this);
		this.MobfilterProductCategoryById=this.MobfilterProductCategoryById.bind(this);
		this.SortProductByType=this.SortProductByType.bind(this);
		/*this.SortProductCategoryByPurchaseDateNew=this.SortProductCategoryByPurchaseDateNew.bind(this);
		this.SortProductCategoryByPurchaseDateOld=this.SortProductCategoryByPurchaseDateOld.bind(this);
		this.SortProductCategoryById=this.SortProductCategoryById.bind(this);*/
		this.ProductListTitleSearch=this.ProductListTitleSearch.bind(this);
		this.GetProductTitleForSearch=this.GetProductTitleForSearch.bind(this);

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
		fetch(Apiurl.ProductListEnduser.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.ProductListEnduser.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({productList:data})
    	})
	}

	ProductCategory=()=>{
		fetch(Apiurl.ProductCategoryId.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.ProductCategoryId.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({categoryfilter:data})
    	})
	}

	filterProductCategoryById =(e) =>{
		e.preventDefault();
		document.querySelectorAll(".product-filter-desktop li a").forEach((item,index)=>{
			if(item.classList.contains("active")){item.classList.remove("active")}
		})
		e.target.classList.add("active");
		let pid=e.target.getAttribute("data-cat-id");
		localStorage.setItem("product_id",pid);

		fetch(Apiurl.FilterProductCategoryById.url+"&field_product_category_target_id="+pid,{
				headers: {
                	"Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.FilterProductCategoryById.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({productList:data})
    	})
	}

	MobfilterProductCategoryById =(e) =>{
		console.log(e.target);
		document.querySelectorAll(".product-filter li").forEach((item,index)=>{
				console.log(item)
				if(item.classList.contains("active")){item.classList.remove("active")}
		})
		e.target.parentNode.classList.add("active");
		let pid=e.target.getAttribute("data-cat-id");
		localStorage.setItem("product_id",pid);
		fetch(Apiurl.FilterProductCategoryById.url+"&field_product_category_target_id="+pid,{
				headers: {
                	"Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.FilterProductCategoryById.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({productList:data})
    	})
	}

	SortProductByType=(e)=>{
		e.preventDefault();
		if(window.innerWidth > 767){
		document.querySelectorAll(".drop-down-menu > ul > li").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
			e.target.parentNode.classList.add("active");
		}else{
			document.querySelectorAll(".product-sort-by > li").forEach((item,index)=>{
				if(item.classList.contains("active")){item.classList.remove("active")}
			})
			e.target.parentNode.classList.add("active");
		}	
		let sortByType=e.target.getAttribute("sortby")
		fetch(Apiurl.SortProduct.url+sortByType,{
			headers: {
                	"Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.SortProduct.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    		this.setState({productList:data})
    	})
	}

	GetProductTitleForSearch=(e)=>{
		let productnamestring=e.target.value;
		console.log(productnamestring)
		if(productnamestring!==''){
		fetch(Apiurl.GetProductTitle.url+"&title="+productnamestring,{
			headers: {
                	"Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.GetProductTitle.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({getTileListforSearch:data});
    	})
     }else{
    		this.setState({getTileListforSearch:''});
    		this.productList();
     }
	}

	ProductListTitleSearch =(e) =>{
		e.preventDefault();
		let productnamestring=e.target.getAttribute("data-title-name");
		console.log(productnamestring)
		fetch(Apiurl.ProductListTitleSearch.url+"&title="+productnamestring,{
			headers: {
                	"Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },
                method:Apiurl.ProductListTitleSearch.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({productList:data})
    	})
	}

	render() {
		return (
			<section className="main-wrapper">
			<div className="d-flex flex-wrap main-block">
				<Sidebar/>
			<div className="d-flex flex-wrap right-content-part">
				<div className="top-heading">
						<div className="top-heading-continer d-flex flex-wrap align-center">
							<div className="name-of-heading d-flex flex-wrap align-center">
								<img src={require("../../images/your-product-blue-logo.svg")} alt="product-logo"/>
								<h1>Your products</h1>
							</div>

							<UserProfile/>
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
										<a title="filter-btn" className="filter-open-btn" onClick={(e)=>this.setState({mobileView:true})}>
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
												<h5>Applications</h5>
												<ul className='product-filter'>

													{this.state.categoryfilter.map((catname,index)=>
															<li key={catname.tid}><a href="#" onClick={this.MobfilterProductCategoryById} data-cat-id={catname.tid}>{ReactHtmlParser(catname.name)}</a></li>
													)}
												</ul>
												
												<h5>Sort by</h5>
												<ul className='product-sort-by'>
													<li><Link to={""} title="Purchase date newest" sortby="&sort_by=field_purchase_date_value&sort_order=ASC" onClick={this.SortProductByType}>Purchase date newest</Link></li>
													<li><Link to={""} title="Purchase date oldest" sortby="&sort_by=field_purchase_date_value&sort_order=DESC" onClick={this.SortProductByType}>Purchase date oldest</Link></li>
													<li><Link to={""} sortby="&sort_by=title&sort_order=ASC" title="A-Z" onClick={this.SortProductByType}>A-Z</Link></li>
													<li><Link to={""} sortby="&sort_by=title&sort_order=DESC" title="Z-A" onClick={this.SortProductByType}>Z-A</Link></li>
												</ul>
											</div>
	
										</div>
									</div>
							</div>
						</div>
						

						<div className="your-product-list">
							{this.state.productList.map((item,index)=>
								<div className="your-product-box d-flex flex-wrap" key={index} >
									<div className="product-image bg-cover" style={{backgroundImage: `url(${site_url+item.field_product_image})`}}>

									</div>
									<div className="product-content">
										<Link to="#" title={ReactHtmlParser(item.title)}>{ReactHtmlParser(item.title)}</Link>
										<h4>
										{item.field_product_category.split(',').map((cat,cat_index)=>
											<span key={cat_index}>{ReactHtmlParser(cat)}</span>
										)}
										</h4>
										<p>{ReactHtmlParser(item.field_product_description)}</p>
										<div className="purchase-date">Purchase Date: {item.field_purchase_date}</div>
									</div>
									<div className="btn-block">
										<Link to="#" title="Resources logo blue"><img src={require("../../images/resources-logo-blue-round.svg")} alt="icon" className="svg"/> </Link>
										<Link to={site_url+item.field_product_document} className="svg" title="Pdf download"><img src={require("../../images/pdf-download-logo.svg")} alt="icon" className="svg"/> </Link>
									</div>
								</div>
							)}

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