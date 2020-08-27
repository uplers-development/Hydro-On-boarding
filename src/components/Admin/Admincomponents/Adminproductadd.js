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
				productname:false,
				description:false,
				productsheettitle:false,
				fid:'',
				fileuploadedname:'',
				doucmentformatestate:false,
				checkdocempty:false,
				checkempty:false,
				openProductSubmission:false,
				insertedproduct:'',
				loader:true,
			}
			this.producttype=React.createRef();
			this.update_product_image=this.update_product_image.bind(this);
			this.upload_product_document=this.upload_product_document.bind(this);
			this.productsheetselection=this.productsheetselection.bind(this);
		}


		componentDidMount(){
			console.log(this.props.addstatus+"Add Stateus");
			 if(!this.props.addstatus){
		   		this.get_product_details();
		   	 }else{
		   	 	this.setState({loader:false});
		   	 }
		}

		productsheetselection=(e)=>{
			e.preventDefault();
			hasNull(e.target.value) ? this.setState({productsheettitle:true}): this.setState({productsheettitle:false});
		}


		get_product_details=()=>{
			console.log(this.props.sendproductId);
			console.log(this.producttype);
			let status;
			let productid={
				"nid":this.props.sendproductId
			}
			console.log(productid);
			fetch(Admin.adminviewproduct.url,{
	          		headers: {
	                       "Content-Type" : "application/json",
	                       "X-CSRF-Token" : localStorage.getItem("access-token"),
	                       "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                 },
	                 method:Admin.adminviewproduct.method,
	                 body:JSON.stringify(productid)
	          }).then(res=>{
	          	status=res.status;
	          	return res.json();
	          }).then(data=>{
	          	console.log(data);
	          	var filename='';
	          	var exactfile=data.node.field_document.url;
					if (exactfile) {
					    var startIndex = (exactfile.indexOf('\\') >= 0 ? exactfile.lastIndexOf('\\') : exactfile.lastIndexOf('/'));
					    filename = exactfile.substring(startIndex);
					    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
					        filename = filename.substring(1).split("%20").join(" ");
					    }
				}
				console.log(filename);
	          	this.setState({insertedproduct:data.node,loader:false,uploadedproductimage:data.node.field_product_image.url,newproductimageid:data.node.field_product_image.fid,fileuploadedname:filename,fid:data.node.field_document.fid})
	          	this.producttype.current.value=data.node.field_product_category.length > 0 ?data.node.field_product_category[0].tid:this.producttype.current[0].value
	      });
	}
		upload_product_document=(e)=>{
			var fullPath = e.target.files[0];
	      var exactfile=e.target.value;
	      var filename='';
         if (exactfile) {
             var startIndex = (exactfile.indexOf('\\') >= 0 ? exactfile.lastIndexOf('\\') : exactfile.lastIndexOf('/'));
             filename = exactfile.substring(startIndex);
             if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
             	let extension=filename.split(".")[1];
             	
             	console.log(extension);
                 filename = document.querySelector("#product-title").value!=='' ? document.querySelector("#product-title").value+"."+extension:filename.substring(1);
                 this.setState({fileuploadedname:filename})
             }
             console.log(filename);
             if(filename.includes(".docx") || filename.includes(".pptx") || filename.includes(".ppt")|| filename.includes(".doc")|| filename.includes(".pdf")|| filename.includes(".txt") || filename.includes(".csv")){
               this.setState({doucmentformatestate:false,checkdocempty:false})
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
                  fetch(Admin.adminproductAdddocument.url,requestOptions)
                  .then(res=>{return res.json()})
                  .then(data=>{
                     console.log(data);
                     this.setState({fid:data.fid[0].value});
                  })
		      }else{
		         this.setState({doucmentformatestate:true,checkdocempty:false})   
		     }
  		}
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
				this.setState({imageFormateState:false,checkempty:false})	
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
	  	this.setState({smallLoader:false,imageFormateState:true,checkempty:false})	
	  }
	}

	submitProduct=(e)=>{
		e.preventDefault();

		if(!hasNull(document.querySelector("#title").value) && !hasNull(document.querySelector("#description").value) && !hasNull(document.querySelector("#product-title").vlaue) && this.state.newproductimageid!==null && this.state.fileuploadedname!==''){
			let productadd={
			   	"title":[{value:document.querySelector("#title").value}],
		        "type":[{target_id:"products"}],        
		        "field_product_description":[{value:document.querySelector("#description").value}],
		        "field_product_image":[{target_id:document.querySelector("#product-image").getAttribute("data-id")}],
		        "field_product_category":[{target_id:this.producttype.current.value}],
		        "field_product_sheet_title":[{value:document.querySelector("#product-title").value}],
		        "field_product_document":[{target_id:document.querySelector(".document-item-product").getAttribute("get-id")}]
			}

			try{
				let status;
				let apicall=this.props.addstatus ? Admin.adminaddproduct.url : Admin.adminupdateproduct.url+`${this.props.sendproductId}?_format=json`;
					let apimethod=this.props.addstatus ? Admin.adminaddproduct.method : Admin.adminupdateproduct.method;
				fetch(apicall,{
					headers: {
		                       "Content-Type" : "application/json",
		                       "X-CSRF-Token" : localStorage.getItem("access-token"),
		                       "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                 },
             			 method:apimethod,
             			 body:JSON.stringify(productadd)
             			}).then(res=>{
             				status=res.status;
             				return res.json();
             			}).then(data=>{
             				console.log(data);
             				if(status===201 || status===200){
						  		console.log(data);
						  		this.setState({openProductSubmission:true})
				          	}else{
				          		console.log("something got wrong");
				          	}
             			})
			}catch(err){
				console.log(err)
			}
		}else{
			hasNull(document.querySelector("#title").value) ? this.setState({productname:true}): this.setState({productname:false})
			hasNull(document.querySelector("#description").value) ? this.setState({description:true}): this.setState({description:false});
			hasNull(document.querySelector("#product-title").value) ? this.setState({productsheettitle:true}): this.setState({productsheettitle:false})

			this.state.newproductimageid===null ? this.setState({checkempty :true,imageFormateState:false}) : this.setState({checkempty :false,imageFormateState:false});
			this.state.fileuploadedname==='' ? this.setState({checkdocempty :true,doucmentformatestate:false}) : this.setState({checkdocempty :false,doucmentformatestate:false});
		}

	}


		render(){
			return(
					<div className="d-flex flex-wrap admin-products-add">
					{!this.state.loader ? 
					<form onSubmit={this.submitProduct}>
						<div className="product-add-form">
							<div className="form-group d-flex flex-wrap align-center">
										<label>Product name*</label>
										<div className="input-box">
											<input type="text" name="Product name" id="title" placeholder="Product name"  onBlur={(e)=>hasNull(e.target.value) ? this.setState({productname:true}): this.setState({productname:false})} defaultValue={this.state.insertedproduct!=='' ? this.state.insertedproduct.title : ''}/>
											{this.state.productname ? ValidationMsg.common.default.productnamefield : ''}
										</div>
									</div>
							<div className="form-group d-flex flex-wrap align-center">
										<label>Product category*</label>
										<div className="input-box">
											<select name="1" className="" tabIndex="0" id="product_type" ref={this.producttype} >
						              		{this.props.sendproducttitle && this.props.sendproducttitle.map((item,index)=>
												<option key={index} value={item.tid}>{ReactHtmlParser(item.name)}</option>
						              		)}
									</select>
										</div>
									</div>
							<div className="form-group d-flex flex-wrap align-center">
										<label>Description*</label>
										<div className="input-box">
											<input type="text" name="Description" id="description" placeholder="Description" onBlur={(e)=>hasNull(e.target.value) ? this.setState({description:true}): this.setState({description:false})} defaultValue={this.state.insertedproduct!=='' ? this.state.insertedproduct.field_product_description : ''}/>
											{this.state.description ? ValidationMsg.common.default.productdescriptionfield : ''}
										</div>
									</div>
							<div className="upload-thumbnail d-flex flex-wrap">
									<div className="upload-btn-block">
						            <span className='suggestion-file-name'>JPG, GIF or PNG.</span>

										<div className="upload-btn-wrapper">
											<input type="file" name="Upload photo" id="product-image" onChange={this.update_product_image} data-id={this.state.newproductimageid}/>
											<button className="btn wide common-btn-blue">
											<span>Upload photo</span></button>
										</div>
										{this.state.imageFormateState ? ValidationMsg.common.default.imageformate : ''}
										{this.state.checkempty ? ValidationMsg.common.default.checkimageempty : ''}
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
											<input type="text" name="Product name" id="product-title" placeholder="Product sheet title" onBlur={this.productsheetselection} defaultValue={this.state.insertedproduct!=='' ? this.state.insertedproduct.field_product_sheet_title : ''}/>
											{this.state.productsheettitle ? ValidationMsg.common.default.productsheettitlefield : ''}
										</div>
						</div>
						
							<div className="upload-prod-sheet">
							<div className="upload-btn-block">
				            <span className='suggestion-file-name'>txt, pdf, doc, ppt, pptx, docx, csv.</span>

											<div className="upload-btn-wrapper">
												<input type="file" name="Upload product sheet"  id="product-shet-upload"onChange={this.upload_product_document}/>
												<button className="btn wide common-btn-blue">
												<span>Upload product sheet</span></button>
											</div>
											<span className='document-item document-item-product' get-id={this.state.fid}>{this.state.fileuploadedname}</span>
				                  			{this.state.doucmentformatestate ? ValidationMsg.common.default.imageformate : ''}
				                  			{this.state.checkdocempty ? ValidationMsg.common.default.checkdocumentempty : ''}
										</div>
							</div>
						</div>
						<div className="btn-block">
							<button className="btn wide common-btn-blue">
							<span>{!this.props.readmode ? "Update Product":"Add Product"}</span></button>
								<Link to={""} onClick={((e)=>{e.preventDefault();this.props.updatedTheproductresponse(false)})} className="back-dashboard btn common-btn-blue"><span>Back</span></Link>
							</div>
						</div>
						</form>
						 :<>
				  	 	{cosmaticAsset.cosmatic.default.loader}
				  	 </>}	
						{this.state.openProductSubmission ? 
							<div id="modal" className="modal-container">
								<div className="modal d-flex flex-wrap align-center justify-center">
											<Link to={""} onClick={((e)=>{e.preventDefault();
												this.setState({openProductSubmission:false});
												this.props.updatedTheproductresponse(false);
											})}
											className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
											
										<div>
											<img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
												<h2>Product uploaded</h2>
												<p>Product was submitted successfully</p>
												<div className="btn-block">
													<button className="btn wide common-btn-blue" onClick={((e)=>{e.preventDefault();
												this.setState({openProductSubmission:false});
												this.props.updatedTheproductresponse(false);
											})}>
													<span>OK</span></button>
													</div>
										</div>
								</div>
						</div>
						:
						<></>	
						}
					</div>		
				)
		}

}

export default Adminproductadd;