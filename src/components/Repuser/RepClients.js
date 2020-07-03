import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';

class RepClients extends React.Component {
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
							<h1>Clients</h1>
						</div>

						<div className="d-flex flex-wrap user-log">
							<div className="user-image-name d-flex flex-wrap align-center">
								<img src={require("../../images/john-smith.png")} alt="Prfile image" />
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
					<div className="d-flex flex-wrap clients-main-block">
					
					{/*<!--Top filter block Start-->*/}
					<div className="fileter-block d-flex flex-wrap border-bottom">
						
							{/*<!--Select box start-->*/}
							<div className="select-box">
								<span>Bulk Action</span>
								<ul className="list">
									<li><a href="#" title="Bulk Action 1">Bulk Action 1</a></li>
									<li><a href="#" title="Bulk Action 2">Bulk Action 2</a></li>
									<li><a href="#" title="Bulk Action 3">Bulk Action 3</a></li>
									
								</ul>
							</div>
							<div className="btn-block">
								<button className="common-btn-blue"><span>APPLY</span></button>
							</div>
							{/*<!--Select box end-->*/}	
							
							{/*<!--Right search and sort block start-->*/}
							<div className="search-sort-block d-flex flex-wrap align-center">

								{/*<!--Auto search box start-->*/}
								<div className="auto-search-box">
									<form>
										<div className="autocomplete-ss">
											<input placeholder="Search client" id="myInput" type="text" name="hydro" />
										</div>
									</form>
								</div>
								{/*<!--Auto search box end-->*/}


								{/*<!--Sort by start-->*/}
								<div className="d-flex flex-wrap sort-by">
									<div className="sort-selected d-flex flex-wrap align-center">
										<h2>Sort by</h2>
									</div>
									<div className="drop-down-menu">
										<ul>
											<li><a href="#" title="Purchase date newest">Purchase date newest</a></li>
											<li><a href="#" title="Purchase date oldest">Purchase date oldest</a></li>
											<li><a href="#" title="A-Z">A-Z</a></li>
										</ul>
									</div>
								</div>
								{/*<!--Sort by end-->*/}
							</div>
						
					</div>
					{/*<!--Top filter block End-->*/}


					{/*<!--Top filter block Start-->*/}
						<div className="clients-table">
							<div className="table-responsive">
							
								{/*<!--Table Start-->*/}
								<table className="table table-striped">
   <thead>
      <tr>
         <th><div className="checkbox-cust">
				 	<input type="checkbox" id="html" />
      				<label for="html">HTML</label>	 
			 </div>Name</th>
         <th>Email</th>
         <th>Role</th>
         <th>Last updatetd</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="html" />
      				<label for="html">HTML</label>	 
			 </div>
			 <div className="name-edit">
				 <h3></h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>		
			 </div>	 
		 </td>
		 <td>John.smith@gmail.com</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
      
         </tbody>
</table>
								{/*<!--Table End-->*/}
								
							</div>	
						</div>
					{/*<!--Top filter block Start-->*/}
						
						
					</div>
					{/*<!--Clients main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default RepClients;			   