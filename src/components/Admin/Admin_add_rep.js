import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import hydroImage from '../../images/hydro-biofilter-product.jpg';

class Admin_add_rep extends React.Component {
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
					<li><a href="#" title="Clients">
							<img className="svg" src={require("../../images/product-logo.svg")} alt="Products" /><span>Products</span></a>
							</li>
					
						<li><a className="active" href="#" title="Products">
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
							<img src={require("../../images/user-logo-with-round-blue .svg")} alt="resources-logo" />
							<h1>Add rep</h1>
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

					{/*<!--Add rep main blok start-->*/}
					<div className="d-flex flex-wrap add-rep-main">
						
						{/*<!--Announcements Head blok start-->*/}
						<div className="fileter-block details-head-block d-flex flex-wrap border-bottom"><h3>Add new rep details</h3>
						<h4>Create a brand new rep user and add them to this site</h4></div>
							
						{/*<!--Announcements Head blok end-->*/}	
	
						{/*<!--Container Start-->*/}
						<div className="container">
							{/*<!--First form Start-->*/}
							<div className="rep-add-form">
								<form>
									<div className="form-group">
									 <label>First name</label>
  									 <div className="input-box"><input type="text" name="fname" id="fname" /></div>
									</div>
<div className="form-group">
									 <label>Surname</label>
									 <div className="input-box"> <input type="text" name="sname" id="sname" /></div>
									</div>
<div className="form-group">
									 <label>Email</label>
									 <div className="input-box"><input type="email" name="email" id="email" /></div>
									</div>
<div className="form-group">
									 <label>Company</label>
									 <div className="input-box"><input type="text" name="company" id="company" /></div>
									</div>
<div className="form-group">
									 <label>Role</label>
									 <div className="input-box"><input type="text" name="role" id="role" /></div>
									</div>
<div className="form-group">
									 <label>Contact number</label>
									 <div className="input-box"><input type="number" name="contact" id="contact" /></div>
									</div>
<div className="form-group">
									 <label>Time zone</label>
									 <div className="input-box">
  									<select name="timezone">
									  <option value="GMT">GMT</option>
									  <option value="UTC">UTC</option>
		
									</select></div>
									</div>
<div className="form-group">
									 <label>Password</label>
									 <div className="input-box"><input type="password" name="password" id="password" /></div>
									</div>
<div className="btn-block">
<button className="btn common-btn-blue">
												<span>Add Rep</span></button>
</div>
								</form>
							</div>
							{/*<!--First form End-->*/}
						</div>	
						{/*<!--Container end-->*/}	
							
					</div>
					
					
					{/*<!--Add rep main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default Admin_add_rep;			   