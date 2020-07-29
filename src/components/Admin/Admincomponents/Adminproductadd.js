import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from '../../constants/common'
import ThumbnailImage_prod from '../../../images/downstream-defender_prod.jpg';


class Adminproductadd extends React.Component{
		constructor(props){
			super(props);
			this.state={
				smallLoader:false,
			}
		}

		render(){
			return(
					<div className="d-flex flex-wrap admin-products-add">
					<form>
						<div className="product-add-form">
							<div className="form-group d-flex flex-wrap align-center">
										<label>Product name*</label>
										<div className="input-box">
											<input type="text" name="Product name" id="title" placeholder="Product name"/>
										</div>
									</div>
							<div className="form-group d-flex flex-wrap align-center">
										<label>Description*</label>
										<div className="input-box">
											<input type="text" name="Description" id="description" placeholder="Description"/>
										</div>
									</div>
							<div className="upload-thumbnail d-flex flex-wrap">
									<div className="upload-btn-block">
										<div className="upload-btn-wrapper">
											<input type="file" name="Upload photo" />
											<button className="btn wide common-btn-blue">
											<span>Upload photo</span></button>
										</div>
									</div>
									{this.state.smallLoader ? 
										<div className="loader"></div>
						            	:
										<div className="upload-thumbnail-img bg-cover" style={{backgroundImage: `url(${ThumbnailImage_prod})`}}>
										</div>	
								    }
								</div>
						</div>
						
						<div className="product-sheet-title">

						<div className="form-group d-flex flex-wrap align-center">
										<label>Product sheet title*</label>
										<div className="input-box">
											<input type="text" name="Product name" id="title" placeholder="Product sheet title" />
										</div>
						</div>
						
							<div className="upload-prod-sheet">
							<div className="upload-btn-block">
											<div className="upload-btn-wrapper">
												<input type="file" name="Upload product sheet" />
												<button className="btn wide common-btn-blue">
												<span>Upload product sheet</span></button>
											</div>
										</div>
							</div>
						</div>
						<div className="btn-block">
							<button className="btn wide common-btn-blue">
							<span>{!this.props.readmode ? "Update Product":"Add Product"}</span></button>
							</div>
						</form>	
					</div>		
				)
		}

}

export default Adminproductadd;