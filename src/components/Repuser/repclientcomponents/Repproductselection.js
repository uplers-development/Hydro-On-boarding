import React from 'react';
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import Apiurl,{base_url,site_url} from '../../Apiurl'; 
import productImage from '../../../images/first-defense.jpg';

class Repproductselection extends React.Component{
	constructor(props){
		super(props);
		this.state={
			porductDetails:[],
			productPage:false,
			contractPage:false,
		}
		this.clientProductSearch=React.createRef();
		this.Search_client_Product_Details=this.Search_client_Product_Details.bind(this);

	}

	componentDidMount(){
			this.Get_client_Product_Details();
		}


	Get_client_Product_Details=()=>{
			fetch(`https://staging.project-progress.net/projects/hydro/jsonapi/client_products_details/${this.props.repclientuid}?_format=json`,{
			    headers:{
			            "Content-Type" : "application/json",
			            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
			    },
			    method:"GET",
  			}).then(res=>res.json()).then(data=>this.setState({porductDetails:data}));
		}


	Search_client_Product_Details=(e)=>{
		if(this.clientProductSearch.current.value!==''){
			fetch(`https://staging.project-progress.net/projects/hydro/jsonapi/client_products_details/${this.props.repclientuid}?_format=json&title=${this.clientProductSearch.current.value}`,{
			    headers:{
			            "Content-Type" : "application/json",
			            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
			    },
			    method:"GET",
  			}).then(res=>res.json()).then(data=>{
  				console.log(data);
  				if(data.length>0){
  					this.setState({porductDetails:data})
  				}else{
  					alert("sorry no records found");
  				}
  			});
  		 }else{
  		 	this.Get_client_Product_Details();
  		 }
		}

	Call_selected_repclient_product=(e,nid)=>{
		e.preventDefault();
		
	}



	render(){
		console.log(this.state.porductDetails)
		return(
			<div>
				<div className="pro-title prod d-flex flex-wrap align-center">
							<div className="name-of-heading d-flex flex-wrap align-center">
								<img src={require("../../../images/your-product-blue-logo.svg")} alt="product-logo"/>
								<h3>Products</h3>
							</div>
						{/*<!--Search right Start-->*/}
							<div className="search-right d-flex flex-wrap align-center">					  
								<div className="btn-block">
									<button className="btn common-btn-blue" onClick={((e)=>{
										this.props.historyPush.history.push({
											pathname:'/RepClients_add',
											state:{
												productPage:true,
												senduid:this.props.repclientuid	
											}
										})
									})}><span>Add new Product</span></button>
								</div>												  
								<div className="auto-search-box">
									<form>
										<div className="autocomplete-ss">
											<input type="text" placeholder="Search Products" className="hydro" ref={this.clientProductSearch} onChange={this.Search_client_Product_Details} />
										</div>
									</form>
								</div>
			  		 	   </div>									
					</div>



					<div className="your-product-list">
					   {this.state.porductDetails.map((item,index)=>
						   <div className="your-product-box d-flex flex-wrap" key={index}>							
							      <div className="product-image bg-cover" style={{backgroundImage: `url(${site_url+item.field_product_image})`}}></div>
								   <div className="product-content">
								      <Link to={""} onClick={(e)=>this.Call_selected_repclient_product(e,item.nid)}  title={ReactHtmlParser(item.title)}>{ReactHtmlParser(item.title)}</Link>
								      <h4>{ReactHtmlParser(item.field_product_category)}</h4>
								      <div className="purchase-date">Purchase Date: {item.field_purchase_date}</div>
								   </div>
								   <div className="btn-block">
								      <Link to={""} className="svg" onClick={((e)=>{
								      		e.preventDefault();
								      		window.open(site_url+item.field_product_document,"_target");
								      })} title="Pdf download">
								      <img src={require("../../../images/pdf-download-logo.svg")} alt="icon" className="svg" /> 
								      </Link>
								   </div>
							</div>
						)}
					</div>

					<div className="pro-title contract d-flex flex-wrap align-center">
						<div className="name-of-heading d-flex flex-wrap align-center">
							<img src={require("../../../images/contracts-logo-blue.svg")} alt="contract-logo"/>
							<h3>Contract</h3>
						</div>
						<div className="search-right d-flex flex-wrap align-center">  
							<div className="btn-block">
								<button className="btn common-btn-blue" onClick={((e)=>{
										this.props.historyPush.history.push({
											pathname:'/RepClients_add',
											state:{
												contractPage:true
											}
										})
									})}><span>Add new Contract</span></button>
							</div>												  
						</div>
					</div>
				</div>
			)
	}
}

export default Repproductselection;