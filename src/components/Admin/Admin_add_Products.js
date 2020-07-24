import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import adminProductImage from '../../images/headcell2x.png';
import adminProductImage2 from '../../images/hydro-gritcleanse2x.png';
import ThumbnailImage_prod from '../../images/downstream-defender_prod.jpg';

class Admin_add_Products extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			rightSide_data:[],
		}
	}
	render(){
		return(<div>
			   
			    {/*<!--Main wrapper start-->*/}
			   <section class="main-wrapper">
			     {/*<!-- Main block start-->*/}
			   	<div class="d-flex flex-wrap main-block">
			   
			   {/*<!--Nav fixed left block start-->*/}
			<nav className="navbar teal-color-bg navbar-expand-md navbar-dark bg-primary fixed-left">
				<a className="navbar-logo" href="#" title="Main white logo"><img src={require("../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></a>

				{/*<!--List of menu start-->*/}
				<ul>
					<li><a href="#" title="Dashboard">
							<img className="svg" src={require("../../images/resources-logo.svg")} alt="Resources" /><span>Resources</span></a></li>
					<li><a className="active" href="#" title="Clients">
							<img className="svg" src={require("../../images/product-logo.svg")} alt="Products" /><span>Products</span></a>
							</li>
					
						<li><a href="#" title="Products">
							<img className="svg" src={require("../../images/user-logo-with-round.svg")} alt="Reps User" />
							<span>Reps</span></a></li>
				</ul>
				{/*<!--List of menu end-->*/}

				

				<div className="pattern-block"><img src={require("../../images/pattern-nav-bottom.svg")} alt="pattern-nav" /></div>

				<div className="nav-copyright">© 2020 Hydro International</div>
			</nav>
			{/*<!--Nav fixed left block end-->*/}

			{/*<!--Main right content block start-->*/}
			<div className="d-flex flex-wrap right-content-part">
				<div className="top-heading">
					
					{/*<!--Top heading container start-->*/}
					<div className="top-heading-continer d-flex flex-wrap align-center">
						<div className="name-of-heading d-flex flex-wrap">
							<img src={require("../../images/product-logo-blue.svg")} alt="products-logo" />
							<h1>Add product</h1>
						</div>

						<div className="d-flex flex-wrap user-log">
							<div className="user-image-name d-flex flex-wrap align-center">
								<img src={require("../../images/profile-2.png")} alt="Prfile image" />
								<h2>Username</h2>
							</div>
							<div className="drop-down-menu">
								<ul>
									<li><a href="#" title="Profile">Profile</a></li>
									<li><a href="#" title="Sign out">Sign out</a></li>
								</ul>
							</div>
						</div>
					</div> {/*<!--Top heading container end-->*/}
				</div>

				{/*<!--Main content bottom block start-->*/}
				<div className="bottom-content-block with-filter">

					{/*<!--Resources main blok start-->*/}
					<div className="d-flex flex-wrap admin-products-add">
					
					{/*<!--Product form add Start-->*/}
					<form>
						<div className="product-add-form">
							<div className="form-group d-flex flex-wrap align-center">
										<label>Product name</label>
										<div className="input-box">
											<input type="text" name="Product name" id="title" />
										</div>
									</div>
							<div className="form-group d-flex flex-wrap align-center">
										<label>Description*</label>
										<div className="input-box">
											<input type="text" name="Description" id="description" />
										</div>
									</div>

							{/*<!-Upload thumbnail block Start-->*/}
							<div className="upload-thumbnail d-flex flex-wrap">
									<div className="upload-btn-block">
										<div className="upload-btn-wrapper">
											<input type="file" name="Upload photo" />
											<button className="btn wide common-btn-blue">
											<span>Upload photo</span></button>
										</div>
									</div>
									<div className="upload-thumbnail-img bg-cover" style={{backgroundImage: `url(${ThumbnailImage_prod})`}}>
									</div>	
								</div>
							{/*<!-Upload thumbnail block End-->*/}
						</div>
						
						<div className="product-sheet-title">

						<div className="form-group d-flex flex-wrap align-center">
										<label>Product sheet title</label>
										<div className="input-box">
											<input type="text" name="Product name" id="title" />
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
							<span>Add Product</span></button>
							</div>
						</form>	
					{/*<!--Product form add End-->*/}
						
						
					</div>
					{/*<!--Resource main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default Admin_add_Products;			   