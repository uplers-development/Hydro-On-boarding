import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 
import productImage from '../../../images/first-defense.jpg';

class Repproductselection extends React.Component{
	constructor(props){
		super(props);
		this.state={
			parentchecked:false,

		}
	}

	render(){
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
									<button className="btn common-btn-blue"><span>Add new Product</span></button>
								</div>												  
								<div className="auto-search-box">
									<form>
										<div className="autocomplete-ss">
											<input type="text" placeholder="Search Products" className="hydro" />
										</div>
									</form>
								</div>
			  		 	   </div>									
					</div>



					<div className="your-product-list">
					   <div className="your-product-box d-flex flex-wrap">							
					      <div className="product-image bg-cover" style={{backgroundImage: `url(${productImage})`}}></div>
						   <div className="product-content">
						      <a href="#" title="First Defense">First Defense</a>
						      <h4>Stormwater management</h4>
						      <div className="purchase-date">Purchase Date: 02/02/2019</div>
						   </div>
						   <div className="btn-block">
						      <a href="#" className="svg" title="Pdf download">
						      <img src={require("../../../images/pdf-download-logo.svg")} alt="icon" className="svg" /> 
						      </a>
						   </div>
						</div>
						<div className="your-product-box d-flex flex-wrap">
						    <div className="product-image bg-cover" style={{backgroundImage: `url(${productImage})`}}></div>
							<div className="product-content">
							   <a href="#" title="First Defense">Downstream Defender</a>
							   <h4><span>Stormwater management </span> <span>Process water treatment</span></h4>
							   <div className="purchase-date">Purchase Date: 02/02/2019</div>
							</div>
							<div className="btn-block">
							   <a href="#" className="svg" title="Pdf download">
							   <img src={require("../../../images/pdf-download-logo.svg")} alt="icon" className="svg" /> 
							   </a>
							</div>
						</div>
						<div className="your-product-box d-flex flex-wrap">
						   <div className="product-image bg-cover" style={{backgroundImage: `url(${productImage})`}}></div>
							<div className="product-content">
							   <a href="#" title="First Defense">Hydro Biofilter</a>
							   <h4>Stormwater management</h4>
							   <div className="purchase-date">Purchase Date: 02/02/2019</div>
							</div>
							<div className="btn-block">
							   <a href="#" className="svg" title="Pdf download">
							   <img src={require("../../../images/pdf-download-logo.svg")} alt="icon" className="svg" /> 
							   </a>
							</div>
						</div>
					</div>

					<div className="pro-title contract d-flex flex-wrap align-center">
						<div className="name-of-heading d-flex flex-wrap align-center">
							<img src={require("../../../images/contracts-logo-blue.svg")} alt="contract-logo"/>
							<h3>Contract</h3>
						</div>
						<div className="search-right d-flex flex-wrap align-center">  
							<div className="btn-block">
								<button className="btn common-btn-blue"><span>Add new Contract</span></button>
							</div>												  
						</div>
					</div>
				</div>
			)
	}
}

export default Repproductselection;