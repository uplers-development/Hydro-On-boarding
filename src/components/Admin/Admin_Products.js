import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import adminProductImage from '../../images/headcell2x.png';
import adminProductImage2 from '../../images/hydro-gritcleanse2x.png';

class Admin_Products extends React.Component {
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
							<h1>Products</h1>
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
					<div className="d-flex flex-wrap admin-products-main">
					
					{/*<!--Top filter block Start-->*/}
					<div className="fileter-block d-flex flex-wrap border-bottom">
						
							{/*<!--Select box start-->*/}
							<div className="select-box">
								<span>Product types</span>
								<ul className="list">
									<li><a href="#" title="Product types 1">Product types 1</a></li>
									<li><a href="#" title="Product types 2">Product types 2</a></li>
									<li><a href="#" title="Product types 3">Product types 3</a></li>
									
								</ul>
							</div>
							{/*<!--Select box end-->*/}	
							
							{/*<!--Right search and sort block start-->*/}
							<div className="search-sort-block d-flex flex-wrap align-center">
								
								<div className="btn-block mobile-hide">
								<button className="common-btn-blue"><span>ADD NEW</span></button>
							</div>

								{/*<!-Mobile filter box start-->*/}
								<div className="mobile-filter">
									<a href="javascript:void(0)" title="filter-btn" className="filter-open-btn">
									<img src={require("../../images/ic_filter.svg")} alt="ic_filter" />
												  
									</a>

									<div className="open-close-filter-block">
										<div className="top-head d-flex flex-wrap align-center">
											<div className="top-title d-flex flex-wrap">
							<img src={require("../../images/ic_filter-blue.svg")} alt="ic_filter" />
												<h4>Filters</h4>
											</div>
											<a href="javascript:void(0)" title="close-btn" className="filter-open-btn">
												<img src={require("../../images/ic_close.svg")} alt="ic_close" />
											</a>
										</div>

										<div className="list-filter-mobile">
											<h5>Product types</h5>
											<ul>
												<li><a href="#" title="Product types 1">Product types 1</a></li>
												<li><a href="#" title="Product types 2">Product types 2</a></li>
											</ul>
											
											<div className="btn-block">
												<button className="common-btn-blue"><span>Apply filters</span></button>
											</div>

										</div>

									</div>
								</div>
								{/*<!-Mobile filter box end-->*/}


							</div>
						
					</div>
					{/*<!--Top filter block End-->*/}


					{/*<!--Client block Start-->*/}
						<div className="admin-products-table table-outer">
							<div className="table-responsive">
							
								{/*<!--Table Start-->*/}
								<table className="table table-striped striped-gray">
   <thead>
      <tr>
         <th>
		 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox0" />
      				<label for="checkbox0"></label>	 
			 </div><span>Product</span>
		</th>
         <th>Author</th>
         <th>Data</th>
         <th>Type</th>
         <th>Last Modified</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox1" />
      				<label for="checkbox1"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c bg-cover" style={{backgroundImage: `url(${adminProductImage})`}}></div>
				 <div className="right-detail">
				 <h3>Lorem ipsum dolor</h3><a href="#" title="Draft">Draft</a>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>Simon</td>				
		 <td><span>Last Modified</span><span>3 hours ago</span></td>				
		 <td>Stormwater Management</td>				
		 <td>18th March 2020</td>				
      </tr>
	
	
         </tbody>
</table>
								{/*<!--Table End-->*/}
								
							</div>	
						</div>
					{/*<!--Top filter block Start-->*/}
						
						
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
		
export default Admin_Products;			   