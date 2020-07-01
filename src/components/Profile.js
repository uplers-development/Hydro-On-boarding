import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl from './Apiurl'; 

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state={
			first_name:null,
			last_name:null,
			email:null,
			contact_number:null,
			organization:null,
			time_zone:null,
			location:null,
			userPicture:[],
		}
		this.updateProfile=this.updateProfile.bind(this);
		this.updateProfilePic=this.updateProfilePic.bind(this);
	}

	componentDidMount(){
    	this.GetProfile();
	}


	GetProfile=()=>{
		fetch(Apiurl.GetProfile.url,{
				headers: {
                	"Content-Type" : "application/json",
                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                },
                method:Apiurl.GetProfile.method,
		}).then(res=>{
			return res.json();
		}).then(data=>{
			console.log(data);
			console.log(data.field_first_name);

			this.setState({first_name:data.field_first_name.length>0 ?data.field_first_name[0].value : ''
						 ,last_name:data.field_last_name.length > 0 ? data.field_last_name[0].value :'',
						 email:data.mail.length>0 ? data.mail[0].value :''
						,contact_number:data.field_contact_number.length>0 ? data.field_contact_number[0].value :''
						,organization:data.field_organisation.length>0 ? data.field_organisation[0].value :''
						,time_zone:data.timezone.length>0 ? data.timezone[0].value :''
						,location:data.field_location.length>0 ?data.field_location[0].value : '',
						userPicture:data.user_picture.length>0 ? data.user_picture[0] :''
					})
			console.log(this.state.userPicture);
		})
	}


	updateProfile = () =>{
		let updatedata={
			mail : [{ "value": document.querySelector("#email").value}],
			field_contact_number : [{ "value": document.querySelector("#contact_number").value }],
			field_first_name : [{ "value": document.querySelector("#first_name").value }],
			field_location : [{ "value":  document.querySelector("#location").value }],
			field_organisation : [{ "value": document.querySelector("#organization").value }],
			timezone : [{ "value": document.querySelector("#time_zone").value }],
			user_picture : [{ "target_id": document.querySelector("#user-pic").getAttribute("data-id")}]
		};

		fetch(Apiurl.Updateprofile.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                },
                method:Apiurl.Updateprofile.method,
                body:JSON.stringify(updatedata)
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    	})
	}

	updateProfilePic=(e)=>{
		var fullPath = document.getElementById('user-pic').value;
		var filename=''
			if (fullPath) {
			    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
			    filename = fullPath.substring(startIndex);
			    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			        filename = filename.substring(1);
			    }
		}
		const data = new FormData() 
		data.append('file', fullPath)
		fetch(Apiurl.Updateprofile.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                	"Content-Disposition" : filename,
                },
                method:Apiurl.Updateprofile.method,
                body:data         
            }).then(res=>{
           	return res.json()
           }).then(data=>{
    			console.log(data);
           })
	}


	render() {
		return (
			<div><section className="main-wrapper">

		{/*<!--Main block start-->*/}
		<div className="d-flex flex-wrap main-block right-btm-pattern-gray">

			{/*<!--Nav fixed left block-->*/}
			<nav className="navbar cobalt-blue-bg navbar-expand-md navbar-dark bg-primary fixed-left">
				<Link className="navbar-logo" to={"/Dashboard"} title="Main white logo"><img src={require("./../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>
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
									<img src={this.state.userPicture.url} alt="profile-img"/>
									<div className="upload-img">

										<span>JPG, GIF or PNG. Max size of 1mb</span>
										<div className="upload-btn-wrapper">
											<input type="file" name="CHOOSE FILE" id="user-pic" onChange={this.updateProfilePic} data-id={this.state.userPicture.target_id} />
											<button className="btn common-btn-blue">
												<span>CHOOSE FILE</span></button>
										</div>

									</div>
								</div>
							</div>
							{/*<!--Profile photo upload end-->*/}

							{/*<!--Profile form start-->*/}
							<div className="form-block">
								<form className="row">
									<div className="form-group one-by-two">
										<label>First Name*</label>
										<input type="text" id='first_name' defaultValue={this.state.first_name} placeholder="First Name" tabIndex="1"/>
									</div>

									<div className="form-group one-by-two">
										<label>Last Name*</label>
										<input type="text" id='last_name' defaultValue={this.state.last_name} placeholder="Name" tabIndex="2"/>
									</div>

									<div className="form-group one-by-two">
										<label>Email*</label>
										<input type="email" id='email' defaultValue={this.state.email} placeholder="Email" tabIndex="3"/>
									</div>

									<div className="form-group one-by-two">
										<label>Contact Number*</label>
										<input type="text" id='contact_number' defaultValue={this.state.contact_number} placeholder="Contact Number" tabIndex="4"/>
									</div>

									<div className="form-group one-by-two">
										<label>Organisation*</label>
										<input type="text" id='organization' defaultValue={this.state.organization} placeholder="Organisation" tabIndex="5"/>
									</div>

									<div className="form-group one-by-two">
										<label>Timezone*</label>
										<select name="1" className="" tabIndex="6" id="time_zone">
											<option value="GMT">GMT</option>
											<option data-img-src="images/16/flag(1).png" value="EET">EET</option>
											<option data-img-src="images/16/flag(2).png" value="EST">EST</option>
										</select>
									</div>

									<div className="form-group one-by-two">
										<label>Location*</label>
										<input type="text" id='location' defaultValue={this.state.location} placeholder="Location" tabIndex="7"/>
									</div>

									<div className="button-group full">
										<button className="btn common-btn-blue" type="submit" tabIndex="4" onClick={this.updateProfile}>
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