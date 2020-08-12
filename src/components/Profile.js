import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url} from './Apiurl'; 
import{hasNull,isRequired,hasValidPassword} from './validation';
import {ValidationMsg} from'./constants/validationmsg';
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from'./constants/common';


let setdefaultroute,timezonetimer;
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
			userPicture:null,
			firstnameState:false,
			lastnameState:false,
			emailState:false,
			contactNumberState:false,
			OrganisationState:false,
			locationState:false,
			imageFormateState:false,
			timeZone:null,
			newuserPic_id:null,
			loader:true,
			smallLoader:false,
			checkempty:false,
			addClass: false,
			checktablist1:true,
			checktablist2:false,
			currentpasswordcheck:false,
			newapsswordcheck:false,
			confirmpasswordcheck:false,
			confirmpasswordmsg:'',
			dataLoaded:false,
		}
		this.updateProfile=this.updateProfile.bind(this);
		this.updateProfilePic=this.updateProfilePic.bind(this);
		this.timeZoneref=React.createRef();
		this.showScreen=this.showScreen.bind(this);
		this.update_password=this.update_password.bind(this);
		console.log(this.props.location.state);
	}

	componentDidMount(){
		if(localStorage.getItem("access-token")!==null){
    		this.GetProfile();	
			this.GetTimeZone();
     	}else{
     		this.props.history.push("/Login")
     	}

	}

	GetTimeZone=()=>{
		fetch(Apiurl.ProfiletimeZone.url,{
				headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                },
                method:Apiurl.ProfiletimeZone.method,
		}).then(res=>{
			return res.json();
		}).then(data=>{
			console.log(data);
			this.setState({timeZone:data.timezonehtml})
			this.timeZoneref.current.value=this.state.time_zone;
			this.setState({dataLoaded:true})
		})
	}

	GetProfile=()=>{
		 let target_id=JSON.parse(localStorage.getItem("user-type")).uid;
		fetch(Apiurl.GetProfile.url+`${target_id}?_format=json`,{
				headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
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
						,time_zone:data.timezone!=='' ? data.timezone[0].value :''
						,location:data.field_location.length>0 ?data.field_location[0].value : '',
						userPicture:data.user_picture.length>0 ? data.user_picture[0].url :'',
						newuserPic_id:data.user_picture.length>0 ? data.user_picture[0].target_id:'',
						loader:false
					})
			console.log(this.state.time_zone);
			console.log(this.state.userPicture);
			let self=this;
			if(this.props.location.state===undefined){
				setTimeout(function(){
					self.setState({addClass:true})
				},800)
			}
		})


	}


	updateProfile = (e) =>{
		e.preventDefault();
		console.log(this.timeZoneref.current.value);
		console.log(this.state.newuserPic_id);
		let updatedata={
			mail : [{ "value": document.querySelector("#email").value}],
			field_contact_number : [{ "value": document.querySelector("#contact_number").value }],
			field_first_name : [{ "value": document.querySelector("#first_name").value }],
			field_last_name : [{ "value": document.querySelector("#last_name").value }],
			field_location : [{ "value":  document.querySelector("#location").value }],
			field_organisation : [{ "value": document.querySelector("#organization").value }],
			timezone : [{ "value": this.timeZoneref.current.value}],
			user_picture : [{ "target_id":this.state.newuserPic_id}]
		};
		console.log(hasNull(updatedata.user_picture[0].target_id));
		if(!hasNull(updatedata.mail[0].value) && !hasNull(updatedata.field_last_name[0].value) && !hasNull(updatedata.field_contact_number[0].value) && !hasNull(updatedata.field_first_name[0].value) && !hasNull(updatedata.field_location[0].value) && !hasNull(updatedata.field_organisation[0].value) && !hasNull(updatedata.user_picture[0].target_id)){
		fetch(Apiurl.Updateprofile.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                },
                method:Apiurl.Updateprofile.method,
                body:JSON.stringify(updatedata)
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    		//this.GetProfile();
    		if(data.roles[0].target_id==="rep"){
    			this.props.history.push("/RepDashboard");	
    		}
    		if(data.roles[0].target_id==="client"){
    			this.props.history.push("/Dashboard");
    		}if(data.roles[0].target_id==="admin"){
    			this.props.history.push("/admin-resources");
    		}else{
    			return false;
    		}
    	})
    }else{
		hasNull(updatedata.field_first_name[0].value) ? this.setState({firstnameState:true}): this.setState({firstnameState:false})
		hasNull(updatedata.field_last_name[0].value) ? this.setState({lastnameState:true}): this.setState({lastnameState:false})
		hasNull(updatedata.mail[0].value) ? this.setState({emailState:true}): this.setState({emailState:false})
		hasNull(updatedata.field_contact_number[0].value) ? this.setState({contactNumberState:true}): this.setState({contactNumberState:false})
		hasNull(updatedata.field_organisation[0].value) ? this.setState({OrganisationState:true}): this.setState({OrganisationState:false})
		hasNull(updatedata.field_location[0].value) ? this.setState({locationState:true}): this.setState({locationState:false})
		hasNull(updatedata.user_picture[0].target_id) ? this.setState({checkempty:true}) :this.setState({checkempty:false})

     }
	}

	updateProfilePic=(e)=>{
		console.log(e.target.value)
		this.setState({smallLoader:true});
		var fullPath = e.target.files[0];
		var exactfile=e.target.value;
		var filename='';
			if (exactfile) {
			    var startIndex = (exactfile.indexOf('\\') >= 0 ? exactfile.lastIndexOf('\\') : exactfile.lastIndexOf('/'));
			    filename = exactfile.substring(startIndex);
			    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			        filename = filename.substring(1);
			    }
		}

		if(filename.includes(".jpg") || filename.includes(".gif") || filename.includes(".png")){
				this.setState({imageFormateState:false,checkempty:false})	
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/octet-stream");
				myHeaders.append("X-CSRF-Token", localStorage.getItem("access-token"));
				myHeaders.append("Content-Disposition", "file;filename=\""+filename+"\"");
				myHeaders.append("Authorization", "Basic "+localStorage.getItem("basic-auth"));
				var file = filename;
				console.log(file);
				var requestOptions = {
				  method: 'POST',
				  headers: myHeaders,
				  body: fullPath,
				};
				fetch(Apiurl.UpdateprofilePic.url,requestOptions)
				.then(res=>{return res.json()})
				.then(data=>{console.log(data);
					this.setState({smallLoader:false,newuserPic_id:data.fid[0]['value'],userPicture:site_url+data.uri[0].url,checkempty:false})
					console.log(this.state.newuserPic_id);
					console.log(this.state.userPicture);
				})
	  }else{
	  	this.setState({smallLoader:false,imageFormateState:true,checkempty:false})	
	  }
	}



	showScreen=(e)=>{
		e.preventDefault();
		if(e.target.classList.contains("about-you")){
			this.setState({checktablist1:true,checktablist2:false})
			this.GetProfile();
			this.GetTimeZone();
		}
		else if(e.target.classList.contains("password")){
			this.setState({checktablist1:false,checktablist2:true,confirmpasswordcheck:false,currentpasswordcheck:false,newapsswordcheck:false})
		}
	}


	update_password=(e)=>{
		e.preventDefault();
		let passwordreset={
			"pass" : [{"existing":document.querySelector("#currenpassword").value, "value":document.querySelector("#newpassword").value }]
		}
		console.log(passwordreset);
		if(this.comparePassword(document.querySelector("#rpassword").value) && hasValidPassword(passwordreset.pass[0].existing) && hasValidPassword(passwordreset.pass[0].value)){
		this.setState({loader:true});	
		let target_id=JSON.parse(localStorage.getItem("user-type")).uid;
		console.log(passwordreset);
		try{
		let status;
		fetch(Apiurl.updatePassword.url+`${target_id}?_format=json`,{
			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                },
                method:Apiurl.updatePassword.method,
                body:JSON.stringify(passwordreset)
		}).then(res=>{
			status=res.status;
			return res.json()
		}).then(data=>{
			if(status===200){
				console.log(data);
				this.setState({loader:false});
				fetch(Apiurl.LogoutCall.url,{
					headers: {
	                	"Content-Type" : "application/json",
	                	"X-CSRF-Token" : localStorage.getItem("access-token"),
	                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                },
					method:Apiurl.LogoutCall.method
				}).then(res=>{
					return res.json()
				}).then(data=>{
					localStorage.clear();
					this.props.history.push("/");
				})
			}else{
				alert(data.message);
				!hasValidPassword(passwordreset.pass[0].existing) ? this.setState({currentpasswordcheck:true}) : this.setState({currentpasswordcheck:true});
				this.setState({loader:false});
			}
		})
		}
		catch(err){
			console.log(err);
		}
	}else{
		!this.comparePassword(document.querySelector("#rpassword").value) ? this.setState({confirmpasswordcheck:true}) : this.setState({confirmpasswordcheck:true});
		!hasValidPassword(passwordreset.pass[0].existing) ? this.setState({currentpasswordcheck:true}) : this.setState({currentpasswordcheck:true});
		!hasValidPassword(passwordreset.pass[0].value) ? this.setState({newapsswordcheck:true}) : this.setState({newapsswordcheck:true})
	}
	}

	comparePassword = (value) => {
        // event.preventDefault();
        if (!isRequired(value)) {
            if (value !== document.querySelector("#newpassword").value) {
            	let invalidArgument=ReactHtmlParser('<span class="empty-field">New password and confirm password are not same.</span>');
                this.setState({confirmpasswordcheck:true,confirmpasswordmsg:invalidArgument })
                return false;
            }
            else {
                this.setState({ confirmpasswordcheck:false,confirmpasswordmsg:'' })
                return true
            }
        } else {
        	let invalidArgument=ReactHtmlParser('<span class="empty-field">Please enter your valid confirm password.</span>');
            this.setState({confirmpasswordcheck: true,confirmpasswordmsg:invalidArgument })
            return false;
        }
    }

	render() {

		if(this.props.location.state!==undefined){
			if(this.props.location.state.admin){
				setdefaultroute="/admin-resources";
			}
			if(this.props.location.state.Repclient){
				setdefaultroute="/RepDashboard";
			}
		}else{
				setdefaultroute="/Dashboard";
			}
		return (
			<div className={this.props.location.state===undefined ? "animation-container" :''}>
			<section className={this.props.location.state!==undefined && this.props.location.state.admin ? "main-wrapper off-white-bg" : "main-wrapper"}>

		{/*<!--Main block start-->*/}
		<div className={this.props.location.state===undefined && this.state.addClass  ? "d-flex profile-cust flex-wrap main-block right-btm-pattern-gray animation-bottom":"d-flex profile-cust flex-wrap main-block right-btm-pattern-gray"}>

			{/*<!--Nav fixed left block-->*/}
			<nav className="navbar cobalt-blue-bg navbar-expand-md navbar-dark bg-primary fixed-left">
				<Link className="navbar-logo" to={setdefaultroute} title="Main white logo"><img src={require("./../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>
				{this.state.dataLoaded ? 
					<ul>
					<li><Link to={""} onClick={this.showScreen} className={this.state.checktablist1 ? "about-you active":"about-you"}  title="News Feed">
							<img className="svg" src={require("./../images/profile-logo-blue.svg")} alt="profile-logo"/>
							<span>About <span>you</span></span></Link></li>
					<li><Link  to={""} onClick={this.showScreen} className={this.state.checktablist2 ? "password active" : "password"} title="Password">
							<img className="svg" src={require("./../images/lock-logo.svg")} alt="password-logo"/>
							<span>Password</span></Link></li>
				</ul>:
				<></>}
				<div className="nav-copyright">© 2020 Hydro International</div>
			</nav>
			{/*<!--Nav fixed left block end-->*/}

			{/*<!--Main right content block start-->*/}
			<div className={this.props.location.state!==undefined && this.props.location.state.admin ? "d-flex flex-wrap right-content-part admin-profile" : "d-flex flex-wrap right-content-part"}>

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
							<span className="percent-text"><strong>40%</strong> Complete</span>
							<div className="progress-bar-wrap">
								<progress className="p" value="0.3"></progress>
								<div className="progress-bar"  style={{"transform": "translateX(-55%)"}}></div>
							</div>
						</div>{/*<!--Progressbar end-->*/}
						
					</div>{/*<!--Top heading container end-->*/}
				</div>
				{/*<!--Main content top heading end-->*/}

				{/*<!--Main content bottom block start-->*/}
				{!this.state.loader ?
				<div className="bottom-content-block">

					{/*<!--Profile left block start-->*/}
					<div className="profile-left-content">

						{/*<!--Your Profile info start-->*/}
						<div className="your-profile-info">
							<h2>{this.state.first_name} profile information</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
						{/*<!--Your Profile info start-->*/}


						{/*<!--Profile form block info start-->*/}
						{this.state.checktablist1 ? 
						<div className="profile-form-block">

							{/*<!--Profile photo upload start-->*/}
							<div className="upload-profile-photo">
								<h3>Upload profile photo</h3>
								<div className=" d-flex flex-wrap align-center">
								{this.state.smallLoader ? 
								<div className="loader"></div>
									:
								<div className="prof-user-img bg-cover" style={{backgroundImage:`url(${this.state.userPicture!=='' ? this.state.userPicture : "./../images/profile-logo-blue.svg"})`}}>
								</div>  
							}
									<div className="upload-img">

										<span>JPG, GIF or PNG. Max size of 1mb</span>
										<div className="upload-btn-wrapper">
											<input type="file" name="CHOOSE FILE" id="user-pic" onChange={this.updateProfilePic} data-id={this.state.newuserPic_id} />
											<button className="btn common-btn-blue">
												<span>CHOOSE FILE</span></button>
										</div>
										{this.state.imageFormateState ? ValidationMsg.common.default.imageformate : ''}
										{this.state.checkempty ? ValidationMsg.common.default.checkimageempty : ''}
									</div>
								</div>
							</div>
							{/*<!--Profile photo upload end-->*/}

							{/*<!--Profile form start-->*/}
							<div className="form-block">
								<form className="row" onSubmit={this.updateProfile}>
									<div className="form-group one-by-two">
										<label>First Name*</label>
										<input type="text" id='first_name' defaultValue={this.state.first_name} placeholder="First Name" tabIndex="1" onBlur={(e)=>
												hasNull(e.target.value) ? this.setState({firstnameState:true}): this.setState({firstnameState:false})
									}/>
									{this.state.firstnameState ? ValidationMsg.common.default.firstname : ''}
									</div>

									<div className="form-group one-by-two">
										<label>Last Name*</label>
										<input type="text" id='last_name' defaultValue={this.state.last_name} placeholder="Name" tabIndex="2" onBlur={(e)=>
												hasNull(e.target.value) ? this.setState({lastnameState:true}): this.setState({lastnameState:false})
									}/>
									{this.state.lastnameState ? ValidationMsg.common.default.lastname : ''}
									</div>

									<div className="form-group one-by-two">
										<label>Email*</label>
										<input type="email" id='email' defaultValue={this.state.email} placeholder="Email" tabIndex="3" readOnly  onBlur={(e)=>
												hasNull(e.target.value) ? this.setState({emailState:true}): this.setState({emailState:false})
									}/>
									{this.state.emailState ? ValidationMsg.common.default.email : ''}
									</div>

									<div className="form-group one-by-two">
										<label>Contact Number*</label>
										<input type="text" id='contact_number' defaultValue={this.state.contact_number} placeholder="Contact Number" tabIndex="4" onBlur={(e)=>
												hasNull(e.target.value) ? this.setState({contactNumberState:true}): this.setState({contactNumberState:false})
									}/>
									{this.state.contactNumberState ? ValidationMsg.common.default.contactNumber : ''}
									</div>

									<div className="form-group one-by-two">
										<label>Organisation*</label>
										<input type="text" id='organization' defaultValue={this.state.organization} placeholder="Organisation" tabIndex="5" onBlur={(e)=>
												hasNull(e.target.value) ? this.setState({OrganisationState:true}): this.setState({OrganisationState:false})
									}/>
									{this.state.OrganisationState ? ValidationMsg.common.default.Organisation : ''}
									</div>

									<div className="form-group one-by-two">
										<label>Timezone*</label>
										<select name="1" className="" tabIndex="6" id="time_zone" ref={this.timeZoneref} >
											{this.state.timeZone!==null ? ReactHtmlParser(this.state.timeZone) : '' }
										</select>
									</div>

									<div className="form-group one-by-two">
										<label>Location*</label>
										<input type="text" id='location' defaultValue={this.state.location} placeholder="Location" tabIndex="7" onBlur={(e)=>
												hasNull(e.target.value) ? this.setState({locationState:true}): this.setState({locationState:false})
									}/>
									{this.state.locationState ? ValidationMsg.common.default.location : ''}
									</div>

									<div className="button-group full">
										<button className="btn common-btn-blue" type="submit" tabIndex="4">
											<span>Save settings</span></button>
									</div>
								</form>

							</div>
							{/*<!--Profile form end-->*/}
						</div>

						:
						<div>
						 <form onSubmit={this.update_password}>
							<div className="form-group" tabIndex="1">
								<label>Current password</label>
								<input type="password" name='currenpassword' id='currenpassword' onBlur={(e)=>!hasValidPassword(e.target.value) ? this.setState({currentpasswordcheck:true}): this.setState({currentpasswordcheck:false})}/>
								{this.state.currentpasswordcheck ? ValidationMsg.common.default.currentpasswordfield  : ''}
								</div>
							<div className="form-group" tabIndex="2">
															<label>New password</label>
															<input type="password" name='newpassword' id='newpassword' onBlur={(e)=>!hasValidPassword(e.target.value) ? this.setState({newapsswordcheck:true}): this.setState({newapsswordcheck:false})}/>
															{this.state.newapsswordcheck ? ValidationMsg.common.default.newpasswordfield : ''}
															</div>

								<div className="form-group" tabIndex="3">
								<label>Confirm password</label>
								<input type="password" name='rpassword' id='rpassword' className="no-cpoy-cpass" onPaste={(e)=>e.preventDefault()}  onBlur={((e)=>this.comparePassword(e.target.value))}/>
								{this.state.confirmpasswordcheck ? this.state.confirmpasswordmsg : ''}
								</div>
								
								<div className="button-group">
							<button className="btn common-btn-blue" type="submit" tabIndex="4"><span>submit</span></button></div>

							</form>
						</div>
						}
						{/*<!--Profile form block info end-->*/}

					</div>
					{/*<!--Profile left block end-->*/}

				</div>:
				<>
					{cosmaticAsset.cosmatic.default.loader}
				</>}
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