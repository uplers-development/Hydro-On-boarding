import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 
import hydroImage from '../../../images/hydro-biofilter-product.jpg';
import scrollToComponent from 'react-scroll-to-component';

class Repaddcontract extends React.Component{
	constructor(props){
		super(props);
		this.state={
	

		}
	}

	componentDidMount(){

	}

	render(){
		return(
			   <div className="add-contract">
		            <div className="container">
		               <div className="pro-title d-flex flex-wrap align-center">
		                  <div className="name-of-heading d-flex flex-wrap align-center">
		                     <img src={require("../../../images/contracts-logo-blue.svg")} alt="contract-logo"/>
		                     <h3>Add contract</h3>
		                  </div>
		               </div>
		               <div className="form-contracts">
		                  <form>
		                     <div className="form-group">
		                        <label>Title</label>
		                        <input type="text" name="Title" placeholder="Title" />
		                     </div>
		                     <div className="form-group">
		                        <label>Description</label>
		                        <input type="text" name="description" placeholder="Description" />
		                     </div>
		                     <div className="form-group">
		                        <label>Product tags</label>
		                        <input type="text" name="product-tags" placeholder="Product tags"/>
		                     </div>
		                     <div className="form-group">
		                        <label>Sharepoint URL</label>
		                        <input type="text" name="sharepoint-url"  placeholder="Sharepoint URL"/>
		                     </div>
		                     <div className="btn-block">
		                        <label>Or</label>
		                        <div className="upload-btn-wrapper">
		                           <input type="file" name="Upload Document" />
		                           <button className="btn common-btn-blue">
		                           <span>Upload Document</span></button>
		                        </div>
		                     </div>
		                  </form>
		               </div>
		            </div>
		           {this.props.callforproduct ? 
		            <div className="btn-block add-client">
                        <div className="upload-btn-wrapper">
                           <input type="file" name="Add new client" />
                           <button className="btn common-btn-blue">
                           <span>Add new contract</span></button>
                        </div>
                     </div>:
                     ""}
        	 </div>
			)
	}
}

export default Repaddcontract;