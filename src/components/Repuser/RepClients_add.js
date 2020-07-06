import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import hydroImage from '../../images/hydro-biofilter-product.jpg';

class RepClients_add extends React.Component {
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
							<img className="svg" src={require("../../images/dashboard-nav.svg")} alt="profile-logo" /><span>Dashboard</span></a></li>
					<li><a className="active" href="#" title="Clients">
							<img className="svg" src={require("../../images/clients_ic.svg")} alt="product-logo" /><span>Clients</span></a>
							<ul>
								<li><a href="#" className="active" title="Clients">Add clients</a></li>							</ul>	
							</li>
					
						<li><a href="#" title="Products">
							<img className="svg" src={require("../../images/bell-icon-logo.svg")} alt="Announcements" />
							<span>Announcements</span></a></li>
					
					
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
							<img src={require("../../images/clients_ic_blue.svg")} alt="profile-logo" />
							<h1>Add client</h1>
						</div>

						<div className="d-flex flex-wrap user-log">
							<div className="user-image-name d-flex flex-wrap align-center">
								<img src={require("../../images/user-scond.png")} alt="Prfile image" />
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

					{/*<!--Clients main blok start-->*/}
					<div className="d-flex flex-wrap clients-add-main">
					
					{/*<!--Top filter block Start-->*/}
					<div className="details-head-block fileter-block d-flex flex-wrap border-bottom">
						<h3>Add new client details</h3>	
						<h4>Create a brand new client user and add them to this site</h4>	
					</div>
					{/*<!--Top filter block End-->*/}


					{/*<!--Top Add client block Start-->*/}
						<div className="clients-add">
							
							{/*<!--First form Start-->*/}
							<div className="first-form">
								<form>
									<div className="form-group">
									 <label>First name</label>
  									 <input type="text" name="fname" />
									</div>
<div className="form-group">
									 <label>Surname</label>
  									 <input type="text" name="sname" />
									</div>
<div className="form-group">
									 <label>Email</label>
  									 <input type="email" name="fname" />
									</div>
<div className="form-group">
									 <label>Company</label>
  									 <input type="text" name="company" />
									</div>
<div className="form-group">
									 <label>Role</label>
  									 <input type="text" name="role" />
									</div>
<div className="form-group">
									 <label>Contact number</label>
  									 <input type="number" name="contact" />
									</div>
<div className="form-group">
									 <label>Time zone</label>
  									<select name="timezone">
									  <option value="GMT">GMT</option>
									  <option value="UTC">UTC</option>
		
									</select>
									</div>
<div className="form-group">
									 <label>Password</label>
  									 <input type="password" name="password" />
									</div>
<div className="send-user-notification">
	<div class="d-flex flex-wrap notification"><h3>Send User Notifications</h3>
	<div className="checkbox-cust"><input type="checkbox" id="checkbox5" />
									<label for="checkbox5"></label></div>
	</div>
	<p>Send the new client an email about their account</p>
</div>
								</form>
							</div>
							{/*<!--First form End-->*/}

							{/*<!--Add Product client Start-->*/}
							<div className="client-add-product">
								{/*<!--Container Start-->*/}
								<div className="container">
								{/*<!--Add product Title Start-->*/}
								<div className="pro-title d-flex flex-wrap align-center">
									
									<div className="name-of-heading d-flex flex-wrap align-center">
										<img src={require("../../images/your-product-blue-logo.svg")} alt="product-logo"/>
										<h3>Add products</h3>
									</div>
												  
<div className="auto-search-box">
<form><div className="autocomplete-ss"><input placeholder="Search client" id="myInput" type="text" className="hydro" /></div></form></div>			  
									
								</div>
								{/*<!--Add product Title End-->*/}

						{/*<!--Add product List Start-->*/}
	
						<div className="list-add-product">

							{/*<!--List box Start-->*/}	
							<div className="list-box">
								<div className="top d-flex flex-wrap">
									<div className="checkbox-cust"><input type="checkbox" id="checkbox1" />
									<label for="checkbox1"></label></div>
									<div className="title">
										<h4>First Defense</h4>	
										<h5>Stormwater management</h5>	
									</div>	
									<a href="javascript:void(0);">When product was released: 02/02/2020</a>
								</div>
								<div className="bottom-details d-flex flex-wrap">
									<div className="left-prod-img" style={{backgroundImage: `url(${hydroImage})`}}>
										
									</div>

									<div className="right-prod-upload">
									<form>
									<div className="form-group">
									 <label>Seller</label>
  									 <input type="text" name="seller" />
									</div>
<div className="form-group">
									 <label>Purchase date</label>
  									 <input type="text" name="purchase-date" />
									</div>
<div className="form-group">
									 <label>Cost</label>
  									 <input type="text" name="cost" />
									</div>
<div className="form-group">
									 <label>Item ID</label>
  									 <input type="text" name="item-id" />
									</div>

						<div className="btn-block">
<div class="upload-btn-wrapper">
											<input type="file" name="Upload Document" />
											<button className="btn common-btn-blue">
												<span>Upload Document</span></button>
										</div>
						</div>

</form>
									</div>
								</div>
							</div>
							{/*<!--List box End-->*/}

							{/*<!--List box Start-->*/}	
							<div className="list-box">
								<div className="top d-flex flex-wrap">
									<div className="checkbox-cust"><input type="checkbox" id="checkbox2" />
									<label for="checkbox2"></label></div>
									<div className="title">
										<h4>Downstream Defender</h4>	
										<h5>Stormwater management</h5>	
									</div>	
									<a href="javascript:void(0);">When product was released: 02/02/2020</a>
								</div>
								<div className="bottom-details d-flex flex-wrap">
									<div className="left-prod-img" style={{backgroundImage: `url(${hydroImage})`}}>
										
									</div>

									<div className="right-prod-upload">
									<form>
									<div className="form-group">
									 <label>Seller</label>
  									 <input type="text" name="seller" />
									</div>
<div className="form-group">
									 <label>Purchase date</label>
  									 <input type="text" name="purchase-date" />
									</div>
<div className="form-group">
									 <label>Cost</label>
  									 <input type="text" name="cost" />
									</div>
<div className="form-group">
									 <label>Item ID</label>
  									 <input type="text" name="item-id" />
									</div>

						<div className="btn-block">
<div class="upload-btn-wrapper">
											<input type="file" name="Upload Document" />
											<button className="btn common-btn-blue">
												<span>Upload Document</span></button>
										</div>
						</div>

</form>
									</div>
								</div>
							</div>
							{/*<!--List box End-->*/}	

							{/*<!--List box Start-->*/}	
							<div className="list-box">
								<div className="top d-flex flex-wrap">
									<div className="checkbox-cust"><input type="checkbox" id="checkbox2" />
									<label for="checkbox2"></label></div>
									<div className="title">
										<h4>Hydro Biofilter</h4>	
										<h5>Stormwater management</h5>	
									</div>	
									<a href="javascript:void(0);">When product was released: 02/02/2020</a>
								</div>
								<div className="bottom-details d-flex flex-wrap">
									<div className="left-prod-img" style={{backgroundImage: `url(${hydroImage})`}}>
										
									</div>

									<div className="right-prod-upload">
									<form>
									<div className="form-group">
									 <label>Seller</label>
  									 <input type="text" name="seller" />
									</div>
<div className="form-group">
									 <label>Purchase date</label>
  									 <input type="text" name="purchase-date" />
									</div>
<div className="form-group">
									 <label>Cost</label>
  									 <input type="text" name="cost" />
									</div>
<div className="form-group">
									 <label>Item ID</label>
  									 <input type="text" name="item-id" />
									</div>

						<div className="btn-block">
<div class="upload-btn-wrapper">
											<input type="file" name="Upload Document" />
											<button className="btn common-btn-blue">
												<span>Upload Document</span></button>
										</div>
						</div>

</form>
									</div>
								</div>
							</div>
							{/*<!--List box End-->*/}	

							{/*<!--List box Start-->*/}	
							<div className="list-box">
								<div className="top d-flex flex-wrap">
									<div className="checkbox-cust"><input type="checkbox" id="checkbox1" />
									<label for="checkbox1"></label></div>
									<div className="title">
										<h4>First Defense</h4>	
										<h5>Stormwater management</h5>	
									</div>	
									<a href="javascript:void(0);">When product was released: 02/02/2020</a>
								</div>
								<div className="bottom-details d-flex flex-wrap">
									<div className="left-prod-img" style={{backgroundImage: `url(${hydroImage})`}}>
										
									</div>

									<div className="right-prod-upload">
									<form>
									<div className="form-group">
									 <label>Seller</label>
  									 <input type="text" name="seller" />
									</div>
<div className="form-group">
									 <label>Purchase date</label>
  									 <input type="text" name="purchase-date" />
									</div>
<div className="form-group">
									 <label>Cost</label>
  									 <input type="text" name="cost" />
									</div>
<div className="form-group">
									 <label>Item ID</label>
  									 <input type="text" name="item-id" />
									</div>

						<div className="btn-block">
<div class="upload-btn-wrapper">
											<input type="file" name="Upload Document" />
											<button className="btn common-btn-blue">
												<span>Upload Document</span></button>
										</div>
						</div>

</form>
									</div>
								</div>
							</div>
							{/*<!--List box End-->*/}

						</div>	
	
						{/*<!--Add product List End-->*/}



							</div>
							{/*<!--Container End-->*/}
							</div>
							{/*<!--Add Product client End-->*/}

							{/*<!--Add contract client Start-->*/}
							<div className="add-contract">
								{/*<!--Add Container Start-->*/}
								<div className="container">
								{/*<!--Add product Title Start-->*/}
								<div className="pro-title d-flex flex-wrap align-center">
									<div className="name-of-heading d-flex flex-wrap align-center">
										<img src={require("../../images/your-product-blue-logo.svg")} alt="product-logo"/>
										<h3>Add contract</h3>
									</div>
								</div>
								{/*<!--Add product Title End-->*/}

								{/*<!--Add contract form Start-->*/}
								<div className="form-contracts">
								<form>
									<div className="form-group">
									 <label>Title</label>
  									 <input type="text" name="Title" />
									</div>
<div className="form-group">
									 <label>Description</label>
  									 <input type="text" name="description" />
									</div>
<div className="form-group">
									 <label>Product tags</label>
  									 <input type="text" name="product-tags" />
									</div>
<div className="form-group">
									 <label>Sharepoint URL</label>
  									 <input type="text" name="sharepoint-url" />
									</div>

						<div className="btn-block">
<div class="upload-btn-wrapper">
											<input type="file" name="Upload Document" />
											<button className="btn common-btn-blue">
												<span>Upload Document</span></button>
										</div>
						</div>

</form>
								</div>
								{/*<!--Add contract form Endd-->*/}

								</div>
								{/*<!--Add Container End-->*/}
							</div>
							{/*<!--Add contract client End-->*/}

							<div className="btn-block add-client">
								<div className="upload-btn-wrapper">
											<input type="file" name="Add new client" />
											<button class="btn common-btn-blue">
												<span>Add new client</span></button>
										</div>
							</div>
	
						</div>
					{/*<!--Top Add client block Start-->*/}
						
						
					</div>
					{/*<!--Clients add main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default RepClients_add;			   