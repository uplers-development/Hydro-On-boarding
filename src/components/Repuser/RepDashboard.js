import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';

class RepDashboard extends React.Component {
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
							<img className="svg" src={require("../../images/dashboard-nav.svg")} alt="profile-logo" /><span>Dashboard</span></a></li>
					<li><a href="#" title="Clients">
							<img className="svg" src={require("../../images/clients_ic.svg")} alt="product-logo" /><span>Clients</span></a></li>
					
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
							<img src={require("../../images/dashboard-nav-blue.svg")} alt="profile-logo" />
							<h1>Dashboard</h1>
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
				<div className="bottom-content-block">

					{/*<!--News feed main blok start-->*/}
					<div className="d-flex flex-wrap dashboard-user-main">
					
					{/*<!--Container start-->*/}	
					<div className="container">
						
						{/*<!--Dashboard user start-->*/}	
						<div className="dashboard-user">

							{/*<!--Dashboard top start-->*/}
							<div className="dashboard-top d-flex flex-wrap">
							
							{/*<!--Dashboard top left start-->*/}	
							<div className="left-dashboard-top">
									<h3 class="common-title">Activity</h3>
	
								{/*<!--activity main start-->*/}
								<div className="activity d-flex flex-wrap">
									{/*<!--activity left start-->*/}	
									<div className="activity-left d-flex flex-wrap">
										<h4>Recently published</h4>
<ul>
							<li><a href="#" title="Lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</a></li>
								<li><a href="#"  title="Lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</a></li>
									<li><a href="#"  title="Lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</a></li>
										<li><a href="#" title="Lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</a></li>
</ul>
									</div>
										{/*<!--activity left End-->*/}

			{/*<!--activity right start-->*/}	
			<div className="activity-right  d-flex flex-wrap">
			<h4>New users</h4>
				
			<ul>
				<li>
					<div className="profile-img">
						<img src={require("../../images/john-smith.png")} alt="Prfile image" />
					</div>
					<span className="username">John Smith</span>
					<small className="added-date">Added: 00/00/00</small>
				</li>
								  <li>
					<div className="profile-img">
						<img src={require("../../images/girls-profile-img.png")} alt="Prfile image" />
					</div>
					<span className="username">John Smith</span>
					<small className="added-date">Added: 00/00/00</small>
				</li>
<li>
					<div className="profile-img">
						<img src={require("../../images/jane-smith.png")} alt="Prfile image" />
					</div>
					<span className="username">John Smith</span>
					<small className="added-date">Added: 00/00/00</small>
				</li>
								  <li>
					<div className="profile-img">
						<img src={require("../../images/jane-smith2.png")} alt="Prfile image" />
					</div>
					<span className="username">John Smith</span>
					<small className="added-date">Added: 00/00/00</small>
				</li>
			</ul>
			

			</div>
			{/*<!--activity right end-->*/}	

			
	
								</div>	
									{/*<!--activity main End-->*/}

							</div>
							{/*<!--Dashboard top left End-->*/}

							{/*<!--Dashboard top right start-->*/}	
							<div className="right-dashboard-top">
								<h3 class="common-title">Overview</h3>	
								<h4>At a Glance</h4>	
								<ul>
									<li>
										
											<span>Number of products</span>
											<small>150</small>
										
									</li>
									<li>
										
											<span>Total of clients</span>
											<small>24</small>
										
									</li>
<li>
										
											<span>Total Contracts</span>
											<small>88</small>
										
									</li>
								</ul>
							</div>
							{/*<!--Dashboard top right End-->*/}	
						
						</div>
						{/*<!--Dashboard top End-->*/}	

							{/*<!--Dashboard Bottom start-->*/}
							<div className="dashboard-bottom d-flex flex-wrap">
							
								{/*<!--Latest Products start-->*/}
								<div className="latest-products">
									<h3 class="common-title">Latest Products</h3>


									<ul>
							<li><a href="#" title="Lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</a></li>
								<li><a href="#"  title="Lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</a></li>
									<li><a href="#"  title="Lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</a></li>
									
</ul>
								
								</div>
								{/*<!--Latest Products end-->*/}

								{/*<!--News end events start-->*/}
								<div className="news-and-events">
								<h3 class="common-title">News and events</h3>
									<ul>
										<li>
<div class="news-img">
<img src={require("../../images/news-feed1.jpg")} alt="News feed 1" />
</div>
<div class="details-events">
<h5>News feed</h5>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</p>
</div>
										</li>
		  										<li>
<div class="news-img">
<img src={require("../../images/news-feed2.jpg")} alt="News feed 2" />
</div>
<div class="details-events">
<h5>News feed</h5>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</p>
</div>
										</li>
									</ul>
									
								</div>	
								{/*<!--News end events end-->*/}
								
							</div>
							{/*<!--Dashboard Bottom End-->*/}

						</div>
						{/*<!--Dashboard user End-->*/}	
						
						
					</div>
					{/*<!--Container End-->*/}	

					</div>
					{/*<!--News feed main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default RepDashboard;			   