import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";


class Profile extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div><section className="main-wrapper">

		{/*<!--Main block start-->*/}
		<div className="d-flex flex-wrap main-block">

			{/*<!--Nav fixed left block-->*/}
			<nav className="navbar cobalt-blue-bg navbar-expand-md navbar-dark bg-primary fixed-left">
				<a className="navbar-logo" href="#" title="Main white logo"><img src={require("./../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></a>
				<ul>
					<li><a className="active" href="#" title="News Feed">
							<img className="svg" src={require("./../images/profile-logo-blue.svg")} alt="profile-logo"/>
							<span>About <span>you</span></span></a></li>
					<li><a href="#" title="Password">
							<img className="svg" src={require("./../images/lock-logo.svg")} alt="password-logo"/>
							<span>Password</span></a></li>
				</ul>

				<div className="nav-copyright">© 2020 Hydro International</div>
			</nav>
			{/*<!--Nav fixed left block end-->*/}

			{/*<!--Main right content block start-->*/}
			<div className="d-flex flex-wrap right-content-part">

				{/*<!--Main content top heading start-->*/}
				<div className="top-heading">
					
					{/*<!--Top heading container start-->*/}
					<div className="top-heading-continer d-flex flex-wrap align-center">
						<div className="name-of-heading d-flex flex-wrap">
							<img src={require("./../images/profile-logo-blue.svg")} alt="profile-logo"/>
							<h1>Profile</h1>
						</div>
						
						{/*<!--Progressbar start-->*/}
						<div className="progressbar-block">
							<span className="percent-text">40% Complete</span>
							<div className="progress-bar-wrap">
								<progress className="p" value="0.3"></progress>
								<div className="progress-bar"  style={{"transform": "translateX(-55%)"}}></div>
							</div>
						</div>{/*<!--Progressbar end-->*/}
						
					</div>{/*<!--Top heading container end-->*/}
				</div>
				{/*<!--Main content top heading end-->*/}

				{/*<!--Main content bottom block start-->*/}
				<div className="bottom-content-block">

					{/*<!--Profile left block start-->*/}
					<div className="profile-left-content">

						{/*<!--Your Profile info start-->*/}
						<div className="your-profile-info">
							<h2>Your profile information</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
						{/*<!--Your Profile info start-->*/}


						{/*<!--Profile form block info start-->*/}
						<div className="profile-form-block">

							{/*<!--Profile photo upload start-->*/}
							<div className="upload-profile-photo">
								<h3>Upload profile photo</h3>
								<div className=" d-flex flex-wrap align-center">
									<img src={require("./../images/girls-profile-img.png")} alt="profile-img"/>
									<div className="upload-img">

										<span>JPG, GIF or PNG. Max size of 1mb</span>
										<div className="upload-btn-wrapper">
											<input type="file" name="Coose File" />
											<button className="btn common-btn-blue">
												<span>Coose File</span></button>
										</div>

									</div>
								</div>
							</div>
							{/*<!--Profile photo upload end-->*/}

							{/*<!--Profile form start-->*/}
							<div className="form-block">
								<form className="row">
									<div className="form-group one-by-two">
										<label>First Name</label>
										<input type="text" placeholder="" tabindex="1"/>
									</div>

									<div className="form-group one-by-two">
										<label>Last Name</label>
										<input type="text" placeholder="Name" tabindex="2"/>
									</div>

									<div className="form-group one-by-two">
										<label>Email*</label>
										<input type="email" placeholder="" tabindex="3"/>
									</div>

									<div className="form-group one-by-two">
										<label>Contact Number*</label>
										<input type="text" placeholder="" tabindex="4"/>
									</div>

									<div className="form-group one-by-two">
										<label>Organisation*</label>
										<input type="text" placeholder="" tabindex="5"/>
									</div>

									<div className="form-group one-by-two">
										<label>Timezone*</label>
										<select name="1" className="" tabindex="6">
											<option value="">GMT</option>
											<option data-img-src="images/16/flag(1).png" value="et">EET</option>
											<option data-img-src="images/16/flag(2).png" value="ak">EST</option>
										</select>
									</div>

									<div className="form-group one-by-two">
										<label>Location*</label>
										<input type="text" placeholder="" tabindex="7"/>
									</div>

									<div className="button-group full">
										<button className="btn common-btn-blue" type="submit" tabindex="4">
											<span>Save settings</span></button>
									</div>
								</form>

							</div>
							{/*<!--Profile form end-->*/}

						</div>
						{/*<!--Profile form block info end-->*/}

					</div>
					{/*<!--Profile left block end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block end-->*/}

		</div>
		{/*<!--Main block end-->*/}

	</section></div>
		);
	}
}

export default Profile;