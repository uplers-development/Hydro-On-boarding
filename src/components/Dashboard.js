import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from './../images/common-bg.jpg';
import Sidebar from './assets/Sidebar';
import UserProfile from './assets/UserProfile';
 class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div><section className="main-wrapper">
		<div className="d-flex flex-wrap main-block dashboard-main black-overlay-transparent bg-cover" style={{backgroundImage:`url(${CommonBackground})`}} >
			<Sidebar/>
			
			{/*<!--Dashboard switch user block start-->*/}
			<div className="dashboard-switch-user">
				<div className="top-switch-user d-flex flex-wrap">
					<h1>Switch user - Demo only</h1>
					<UserProfile/>
				</div>
				
				{/*<!--Dashboard list start-->*/}
				<div className="list-of-view">
					<div className="d-flex flex-wrap boxes two-ipad">
						<div className="left-details">
							<img src={require("./../images/book-logo.svg")} alt="Book logo"/>
							<h3>Find your how to guides</h3>
							<p>Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua.</p>
							<a href="#" title="View your resources">View your resources</a>
						</div>
						<div className="right-image">
							<img src={require("./../images/hydro-in-tab.png")} alt="hydro-in-tab"/>
							<img src={require("./../images/hydro-in-tab.png")} alt="hydro-in-tab"/>
						</div>
					</div>
					<div className="d-flex flex-wrap boxes editor-letter">
						<div className="left-details">
							<img src={require("./../images/edit-text.svg")} alt="Edit text logo"/>
							<h3>View your contract agreements</h3>
							<p>Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua.</p>
							<a href="#" title="View your resources">View your resources</a>
						</div>
						<div className="right-image">
							<img src={require("./../images/dashboard-aggrement.png")} alt="contract agreements"/>
						</div>
					</div>
					<div className="d-flex flex-wrap boxes user-rounded">
						<div className="left-details">
							<img src={require("./../images/at the rate-logo.svg")} alt="@ logo"/>
							<h3>Your point of contact</h3>
							<p>Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua.</p>
							<a href="#" title="View your resources">View your resources</a>
						</div>
						<div className="right-image">
							<img src={require("./../images/user-scond.png")} alt="hydro-in-tab"/>
						</div>
					</div>
				</div>{/*<!--Dashboard list end-->*/}
				
			</div>{/*<!--Dashboard switch user block end-->*/}
			
		</div>
	</section></div>
		);
	}
}


export default Dashboard