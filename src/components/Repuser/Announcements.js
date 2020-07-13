import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import hydroImage from '../../images/hydro-biofilter-product.jpg';

class Announcements extends React.Component {
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
					<li><a href="#" title="Clients">
							<img className="svg" src={require("../../images/clients_ic.svg")} alt="product-logo" /><span>Clients</span></a>
							<ul>
								<li><a href="#" title="Clients">Add clients</a></li>							</ul>	
							</li>
					
						<li><a className="active" href="#" title="Products">
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
							<h1>Announcements</h1>
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
					</div> 
					{/*<!--Top heading container end-->*/}
				</div>

				{/*<!--Main content bottom block start-->*/}
				<div className="bottom-content-block">

					{/*<!--Announcements main blok start-->*/}
					<div className="d-flex flex-wrap announcements-main">
						
						{/*<!--Announcements Head blok start-->*/}
						<div className="fileter-block details-head-block d-flex flex-wrap border-bottom"><h3>Add an announcement</h3>
						<h4>Add an announcement</h4></div>
							
						{/*<!--Announcements Head blok end-->*/}	
	
						{/*<!--Container start-->*/}
						<div className="container">
							
						{/*<!--Announcements Top block start-->*/}
						<div className="anouncements-top-block">
							<ul className="anouncements-check d-flex flex-wrap">
								<li>
									<a href="#" alt="">
										<img src={require("../../images/setting-logo-blue.svg")} alt="setting-logo"/>
										<span>Update</span>	
									</a>
								</li>
								<li>
									<a href="#" alt="">
										<img src={require("../../images/question_mark_blue.svg")} alt="Question mark"/>
										<span>Issue</span>	
									</a>
								</li>
								<li>
									<a href="#" alt="">
										<img src={require("../../images/warning-logo-blue.svg")} alt="warning-logo"/>
										<span>Warning</span>	
									</a>
								</li>
							    <li>
									<a href="#" className="active" alt="">
										<img src={require("../../images/ic_drop_plus_white.svg")} alt="Drop plus"/>
										<span>New product</span>	
									</a>
								</li>
							</ul>
						</div>	
						{/*<!--Announcements Top block end-->*/}

						{/*<!--Announcements Form block Start-->*/}
						<div className="anouncements-form">
							<form>
								<div className="form-group">
									<label>Title</label>
									<input type="text" name="Title" /> 
								</div>
								<div className="form-group">
									<label>Subheading</label>
									<input type="text" name="Subheading" /> 
								</div>
								
								<div className="text-edit-bar">
									<label>Text edit bar</label>
									<textarea placeholder="Type the announcement here…"></textarea>
								</div>

								<div className="form-group">
									<label>Button Copy</label>
									<input type="text" name="Button Copy" /> 
								</div>
								<div className="form-group">
									<label>Button link</label>
									<input type="text" name="Button link" /> 
								</div>
								

							</form>
						</div>
						{/*<!--Announcements Form block End-->*/}

						{/*<!--Announcements Clients title start-->*/}
						<div className="pro-title d-flex flex-wrap align-center">
							<div className="name-of-heading d-flex flex-wrap align-center">
								<img src={require("../../images/clients_ic_blue.svg")} alt="Clients"/>
									<h3>Clients</h3>
							</div>
						</div>
						{/*<!--Announcements Clients title End-->*/}

						{/*<!--Filter block Start-->*/}
						<div className="pro-title d-flex flex-wrap align-center">
							<h4>Select which clients you want to see the announcements</h4>
							<div className="filter-right d-flex flex-wrap">
								<div className="select-box location">
									<span>Location</span>
									<ul className="list product-list-item">
									<li><a href="#" title="USA">USA</a></li>	
									<li><a href="#" title="UK">UK</a></li>	
									</ul>
								</div>
								<div className="select-box prod-type">
									<span>Product Types</span>
									<ul className="list product-list-item">
									<li><a href="#" title="Type 1">Type 1</a></li>	
									<li><a href="#" title="Type 2">Type 2</a></li>	
									</ul>
								</div>
								<div className="select-box bulk-action">
									<span>Bulk</span>
									<ul className="list product-list-item">
									<li><a href="#" title="Delete">Delete</a></li>	
									</ul>
								</div>
							</div>
						</div>
						{/*<!--Filter block End-->*/}


					{/*<!--Table block Start-->*/}
						<div className="clients-table table-outer">
							<div className="table-responsive">
							
								{/*<!--Table Start-->*/}
								<table className="table table-striped">
   <thead>
      <tr>
         <th>
		 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox1" />
      				<label for="checkbox1"></label>	 
			 </div><span>Name</span>
		</th>
         <th>Email</th>
         <th>Role</th>
         <th>Last updatetd</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox2" />
      				<label for="checkbox2"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/john-smith.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
							  
	<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label for="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/girls-profile-img.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>	

<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label for="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/jane-smith.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
							  
	<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label for="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/jane-smith2.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>		
<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox2" />
      				<label for="checkbox2"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/john-smith.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
							  
	<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label for="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/girls-profile-img.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>	

<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label for="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/jane-smith.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
							  
	<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label for="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/jane-smith2.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
      
         </tbody>
</table>
								{/*<!--Table End-->*/}
								
							</div>	
						</div>
					{/*<!--Table block End-->*/}
						
						
						</div>
						{/*<!--Container End-->*/}
							
					</div>
					{/*<!--Announcements main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default Announcements;			   