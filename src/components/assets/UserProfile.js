import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state={}
	}

	render() {
		return (
			<div>
				<div className="d-flex flex-wrap user-log">
						<div className="user-image-name d-flex flex-wrap align-center">
							<img src={require("../../images/girls-profile-img.png")} alt="Prfile image"/>
							<h2>Username</h2>
						</div>
						<div className="drop-down-menu">
							<ul>
								<li><Link to="./Profile" title="Profile">Profile</Link></li>
								<li><a href="#" title="Sign out">Sign out</a></li>
							</ul>
						</div>
				</div>
			</div>
		);
	}
}

export default UserProfile;