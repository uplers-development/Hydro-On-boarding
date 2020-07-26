import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import ThumbnailImage from '../../../images/thumbnail-image.png';


class Adminresourceadd extends React.Component{
   constructor(props){
      super(props);
      this.state={
      }
   }

   render(){
   		return(
   			<div className="d-flex flex-wrap admin-add-resources">
				   <div className="container">
				      <form>
				         <div className="upload-doc-block">
				            <div className="form-group d-flex flex-wrap align-center">
				               <label>Title*</label>
				               <div className="input-box">
				                  <input type="text" name="Title" id="title" />
				               </div>
				            </div>
				            <div className="form-group d-flex flex-wrap align-center">
				               <label>Description*</label>
				               <div className="input-box">
				                  <input type="text" name="Description" id="description" />
				               </div>
				            </div>
				            <div className="form-group d-flex flex-wrap align-center">
				               <label>Product tags*</label>
				               <div className="input-box">
				                  <input type="text" name="Product tags" id="product-tags" />
				               </div>
				            </div>
				            <div className="upload-btn-block">
				               <div className="upload-btn-wrapper">
				                  <input type="file" name="Upload Document" />
				                  <button className="btn wide common-btn-blue">
				                  <span>Upload Document</span></button>
				               </div>
				            </div>
				         </div>
				         <div className="upload-thumbnail d-flex flex-wrap">
					            <div className="upload-btn-block">
					               <div className="upload-btn-wrapper">
					                  <input type="file" name="Upload thumbnail" />
					                  <button className="btn wide common-btn-blue">
					                  <span>Upload thumbnail</span></button>
					               </div>
					            </div>
				            	<div className="upload-thumbnail-img bg-cover" style={{backgroundImage: `url(${ThumbnailImage})`}}></div>
				   		</div>
					   <div className="btn-block">
						   <button className="btn wide common-btn-blue">
						   <span>Add Resource</span></button>
					   </div>
				  	 </form>
				</div>
			</div>
   			)
   }
}

export default Adminresourceadd;