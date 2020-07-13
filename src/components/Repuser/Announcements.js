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