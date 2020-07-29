import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from '../../constants/common'
import {ValidationMsg} from'../../constants/validationmsg';
import{hasNull,isRequired} from '../../validation';
import ThumbnailImage_prod from '../../../images/downstream-defender_prod.jpg';


class Adminproductadd extends React.Component{
		constructor(props){
			super(props);
			this.state={
				smallLoader:false,
				newproductimageid:null,
				uploadedproductimage:'',
				imageFormateState:false,
			}
			this.update_product_image=this.update_product_image.bind(this);
		}

		update_product_image=(e)=>{
		console.log(e.target.value)
		this.setState({smallLoader:true});
		var fullPath = e.target.files[0];
		var exactfile=e.target.value;
		var filename='';
			if (exactfile) {
			    var startIndex = (exactfile.indexOf('\\') >= 0 ? exactfile.lastIndexOf('\\') : exactfile.lastIndexOf('/'));
			    filename = exactfile.substring(startIndex);
			    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			        filename = filename.substring(1);
			    }
		}

		if(filename.includes(".jpg") || filename.includes(".gif") || filename.includes(".png")){
				this.setState({imageFormateState:false})	
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/octet-stream");
				myHeaders.append("X-CSRF-Token", localStorage.getItem("access-token"));
				myHeaders.append("Content-Disposition", "file;filename=\""+filename+"\"");
				myHeaders.append("Authorization", "Basic "+localStorage.getItem("basic-auth"));
				var file = filename;
				console.log(file);
				var requestOptions = {
				  method: 'POST',
				  headers: myHeaders,
				  body: fullPath,
				};
				fetch(Admin.adminproductAddimage.url,requestOptions)
				.then(res=>{return res.json()})
				.then(data=>{console.log(data);
					this.setState({smallLoader:false,newproductimageid:data.fid[0]['value'],uploadedproductimage:site_url+data.uri[0].url})
					console.log(this.state.newproductimageid);
					console.log(this.state.uploadedproductimage);
				})
	  }else{
	  	this.setState({smallLoader:false,imageFormateState:true})	
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
											<input type="file" name="Upload photo" id="product-image" onChange={this.update_product_image} data-id={this.state.newproductimageid}/>
											<button className="btn wide common-btn-blue">
											<span>Upload photo</span></button>
										</div>
										{this.state.imageFormateState ? ValidationMsg.common.default.imageformate : ''}
									</div>
				
								<div className="upload-thumbnail-right">
									{this.state.smallLoader ? 
										<div className="loader"></div>
						            	:
										<div className="upload-thumbnail-img bg-cover" style={{backgroundImage: `url(${this.state.uploadedproductimage!=='' ? this.state.uploadedproductimage : ThumbnailImage_prod})`}}>
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