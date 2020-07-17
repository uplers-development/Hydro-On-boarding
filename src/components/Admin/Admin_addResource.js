import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import ThumbnailImage from '../../images/thumbnail-image.png';

class Admin_addResource extends React.Component {
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
					<li><a className="active" href="#" title="Dashboard">
							<img className="svg" src={require("../../images/resources-logo.svg")} alt="Resources" /><span>Resources</span></a></li>
					<li><a href="#" title="Clients">
							<img className="svg" src={require("../../images/ic_drop_plus_white.svg")} alt="Products" /><span>Products</span></a>
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
							<img src={require("../../images/resources-logo-blue.svg")} alt="resources-logo" />
							<h1>Add resources</h1>
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

					{/*<!--Add Resources main blok Start-->*/}
					<div className="d-flex flex-wrap admin-add-resources">
						<div className="container">
							{/*<!-Upload document block Start-->*/}
							<div className="upload-doc-block">
								<form>
									<div className="form-group d-flex flex-wrap align-center">
										<label>Title*</label>
										<div className="input-box">
											<input type="text" name="Title" />
										</div>
									</div>
									<div className="form-group d-flex flex-wrap align-center">
										<label>Description*</label>
										<div className="input-box">
											<input type="text" name="Description" />
										</div>
									</div>
									<div className="form-group d-flex flex-wrap align-center">
										<label>Product tags*</label>
										<div className="input-box">
											<input type="text" name="Product tags" />
										</div>
									</div>
									<div className="upload-btn-block">
											<div class="upload-btn-wrapper">
												<input type="file" name="Upload Document" />
												<button className="btn wide common-btn-blue">
													<span>Upload Document</span></button>
											</div>
									</div>
								</form>
							</div>
							{/*<!-Upload document block End-->*/}

							{/*<!-Upload thumbnail block Start-->*/}
							<div className="upload-thumbnail d-flex flex-wrap">

								<div className="upload-btn-block">
									<div class="upload-btn-wrapper">
										<input type="file" name="Upload thumbnail" />
										<button className="btn wide common-btn-blue">
										<span>Upload thumbnail</span></button>
									</div>
								</div>
								<div className="upload-thumbnail-img bg-cover" style={{backgroundImage: `url(${ThumbnailImage})`}}>
								</div>	
							</div>
							{/*<!-Upload thumbnail block End-->*/}

							{/*<!-Button block Start-->*/}
							<div className="btn-block">
								<button className="btn wide common-btn-blue">
								<span>Add Resource</span></button>
							</div>
							{/*<!-Button block End-->*/}

						</div>
					</div>
					{/*<!--Add Resources main blok End-->*/}
	
				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default Admin_addResource;			   