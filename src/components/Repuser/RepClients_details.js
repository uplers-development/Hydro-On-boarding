import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import hydroImage from '../../images/hydro-biofilter-product.jpg';
import productImage from '../../images/first-defense.jpg';
 {/*<!--Abouve image for Product list image-->*/}


class RepClients_details extends React.Component {
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
								<li><a href="#" title="Clients">Add clients</a></li>							</ul>	
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
							<h1>Clients details</h1>
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
				<div className="bottom-content-block">

					{/*<!-Client details main start-->*/}
					<div className="d-flex flex-wrap clients-detils-main">
						
						{/*<!--Person detils box Start-->*/}
						<div className="person-detils-box sky-blue-light-2 d-flex flex-wrap">
								<div className="person-img">
<img src={require("../../images/girls-profile-img.png")} alt="Client image" />
								</div>
								<div className="person-right">
									<div className="person-title">
										<ul className="desktop-hide d-flex">
											<li><a href="https://twitter.com" title="Follow us">
<img src={require("../../images/ic_twitter_blue.svg")} alt="Twitter" />
	</a></li>
											<li><a href="https://www.linkedin.com/" title="Connect">
<img src={require("../../images/ic_linkedin.svg")} alt="Linkedin" />
		  </a></li>
										</ul>
										<h3>Jane Smith</h3>
										<h4>Job title</h4>
									</div>
									<div className="person-details">
										<div className="bottom-details d-flex flex-wrap">
											<div className="left d-flex flex-wrap">
<img src={require("../../images/ic_location_marker.svg")} alt="Map marker"/>
												<span>Address</span>
											</div>

											<div className="right">
												<ul>
													<li><a href="tel:0000007" title="+0000007">
<img src={require("../../images/ic_telephone_blue.svg")} alt="Telephone marker"/>
															<span><strong>Tel:</strong> 0000000</span></a>
													</li>

													<li><a href="mailto:+44 (0)1189 331325" title="+44 (0)1189 331325">
<img src={require("../../images/ic_mail_box_blue.svg")} alt="Mailbox marker"/>
															<span><strong>Email:</strong>example@example.com</span></a>
													</li>
												</ul>
											</div>

										</div>
									</div>
								</div>
							</div>
						{/*<!--Person detils box End-->*/}

{/*<!--Container Start-->*/}
<div className="container">

	{/*<!--Product Title Start-->*/}
		<div className="pro-title d-flex flex-wrap align-center">
									
									<div className="name-of-heading d-flex flex-wrap align-center">
										<img src={require("../../images/your-product-blue-logo.svg")} alt="product-logo"/>
										<h3>Products</h3>
									</div>
{/*<!--Search right Start-->*/}
<div className="search-right d-flex flex-wrap align-center">												  
	<div className="btn-block">
		<button className="btn common-btn-blue"><span>Add new Product</span></button>
	</div>												  
													
<div className="auto-search-box">
<form><div className="autocomplete-ss"><input type="text" placeholder="Search Products" className="hydro" /></div></form></div>
												  </div>
{/*<!--Search right End-->*/}
									
								</div>
	{/*<!--Product Title End-->*/}


{/*<!--Product list start-->*/}
<div className="your-product-list">

	<div className="your-product-box d-flex flex-wrap">
									
	<div className="product-image bg-cover" style={{backgroundImage: `url(${productImage})`}}>

									</div>
	<div className="product-content">
	<a href="#" title="First Defense">First Defense</a>
	<h4>Stormwater management</h4>
	<div className="purchase-date">Purchase Date: 02/02/2019</div>
	</div>

	<div className="btn-block">
	<a href="#" className="svg" title="Pdf download">
	<img src={require("../../images/pdf-download-logo.svg")} alt="icon" className="svg" /> 
	</a>
									</div>
	</div>

	<div className="your-product-box d-flex flex-wrap">
									
	<div className="product-image bg-cover" style={{backgroundImage: `url(${productImage})`}}>

									</div>
	<div className="product-content">
	<a href="#" title="First Defense">Downstream Defender</a>
	<h4><span>Stormwater management </span> <span>Process water treatment</span></h4>
	<div className="purchase-date">Purchase Date: 02/02/2019</div>
	</div>

	<div className="btn-block">
	<a href="#" className="svg" title="Pdf download">
	<img src={require("../../images/pdf-download-logo.svg")} alt="icon" className="svg" /> 
	</a>
									</div>
								</div>

	<div className="your-product-box d-flex flex-wrap">
									
	<div className="product-image bg-cover" style={{backgroundImage: `url(${productImage})`}}>

									</div>
	<div className="product-content">
	<a href="#" title="First Defense">Hydro Biofilter</a>
	<h4>Stormwater management</h4>
	<div className="purchase-date">Purchase Date: 02/02/2019</div>
	</div>

	<div className="btn-block">
	<a href="#" className="svg" title="Pdf download">
	<img src={require("../../images/pdf-download-logo.svg")} alt="icon" className="svg" /> 
	</a>
									</div>
								</div>

</div>
{/*<!--Product list End-->*/}

{/*<!--Contract Title Start-->*/}
<div className="pro-title contract d-flex flex-wrap align-center">
			<div className="name-of-heading d-flex flex-wrap align-center">
			<img src={require("../../images/contracts-logo-blue.svg")} alt="contract-logo"/>
				<h3>Contract</h3>
			</div>

			{/*<!--Search right Start-->*/}
			<div className="search-right d-flex flex-wrap align-center">												  
				<div className="btn-block">
						<button className="btn common-btn-blue"><span>Add new Contract</span></button>
				</div>												  
			</div>
			{/*<!--Search right End-->*/}
	</div>
{/*<!--Contract Title End-->*/}

{/*<!--Contract list Start-->*/}
<div className="contract-list">
	<div class="contract-box d-flex flex-wrap">
		<div class="contract-content">
		<a href="#" title="First Defense">Downstream Defender</a>
		<h4>Subheader</h4>
		</div>
		<div class="date"><p>20-3-2020</p></div>
	</div>		
</div>
{/*<!--Contract list End-->*/}


</div>

	{/*<!--Container End-->*/}
	</div>
		{/*<!--Clients details main start-->*/}
		</div>
{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default RepClients_details;			   