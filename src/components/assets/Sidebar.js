import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl from '../Apiurl'; 
class Sidebar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<nav className="navbar white-bg-trnsparent navbar-expand-md navbar-dark bg-primary fixed-left">
				<Link to='' className="navbar-logo" href="#" title="Main white logo"><img src={require("../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>
				<ul>
					<li><Link to='' className="active" href="#" title="News Feed">
							<img className="svg" src={require("../../images/home-logo.svg")} alt="profile-logo"/>
							<span>News <span>feed</span></span></Link></li>
					<li><Link to="" title="Products">
							<img className="svg" src={require("../../images/product-logo.svg")} alt="product-logo"/>
							<span>Products</span></Link></li>
					<li><Link to="" title="Resources">
							<img className="svg" src={require("../../images/resources-logo.svg")} alt="Resource-logo"/>
							<span>Resources</span></Link></li>
					<li><Link to="" title="Contracts">
							<img className="svg" src={require("../../images/contracts-logo.svg")} alt="Contracts-logo"/>
							<span>Contracts</span></Link></li>
					<li><Link to="" title="Products">
							<img className="svg" src={require("../../images/rep-contracts.svg")} alt="rep-contracts"/>
							<span>Rep cntracts</span></Link></li>
				</ul>
				
				<div className="nav-bottom-master teal-color-bg">
					<img src={require("../../images/hydro-in-tab.png")} alt="hydro-in-tab"/>
					<p>Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit.
					</p>
					<button className="common-btn-blue"><span>Master CTA</span></button>
				</div>

				<div className="nav-copyright">© 2020 Hydro International</div>
			</nav>
			</div>
		);
	}
}

export default Sidebar;