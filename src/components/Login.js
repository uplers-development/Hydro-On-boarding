import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl from './Apiurl'; 
import loginScreeImg from "./../images/login-screen.jpg";
import {ValidationMsg} from'./constants/validationmsg';
import{hasNull,isRequired} from './validation';
import {cosmaticAsset} from'./constants/common';
import $ from "jquery";

class Login extends Component{
	constructor() {
    	super();
    	this.state={
    		login_data_loaded:false,
    		login_admin_button:null,
    		login_background:null,
    		login_email_title:null,
    		login_logo:null,
    		login_password_title:null,
    		login_rep_button:null,
    		login_sign_button:null,
    		usernameState:false,
    		passwordState:false,
    		loader:false,
    		loginError:true,
    		showHidePasswordfield:false,
    		showresetpassworderror:false,
    		showresetpassworderrormsg:'',
    	}
    	this.Login=this.Login.bind(this);
    	this.updateresetpassword=this.updateresetpassword.bind(this);
    }
    componentDidMount(){
    	this.getLoginPageContent();
    }

    getLoginPageContent =() =>{
    	this.setState({loader:true})
    	if(localStorage.getItem("user-type")){
	    	if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="admin"){
				this.props.history.push({pathname:"/admin-resources"});
			}
			if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="client"){
				this.props.history.push({pathname:"/Dashboard"});
			}
			if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="rep"){
				this.props.history.push({pathname:"/RepDashboard"});
			}if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="administrator"){
				this.props.history.push({pathname:"/user"});
			}
		}



    	fetch(Apiurl.Loginpagecontent.url,{
    			headers: {
                	"Content-Type" : "application/json",
                },
                method:Apiurl.Loginpagecontent.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({loader:false,login_data_loaded:true,login_admin_button:data.login_admin_button,login_background:data.login_background,login_email_title:data.login_email_title,login_logo:data.login_logo,login_password_title:data.login_password_title,login_rep_button:data.login_rep_button,login_sign_button:data.login_sign_button})
    		$('img.svg').each(function () {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');
			$.get(imgURL, function (data) {
				var $svg = $(data).find('svg');
				if (typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				$svg = $svg.removeAttr('xmlns:a');
				$img.replaceWith($svg);
			}, 'xml');
		});
    	})
    }


    Login = (e) =>{
    	e.preventDefault();
    	var logindata={
    		name:document.querySelector('#email').value,
    		pass:document.querySelector('#password').value,
    	}
    	console.log(logindata);
    	if(!hasNull(logindata.name) && !hasNull(logindata.password)){
    	fetch(Apiurl.Loginaction.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                },
                method:Apiurl.Loginaction.method,
                body: JSON.stringify(logindata),
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    		if(data.message){
    			this.setState({loginError:false})
    		}else{
    			localStorage.setItem("access-token",data.csrf_token);
    			localStorage.setItem("basic-auth",btoa(data.current_user.name+':'+logindata.pass));
    			localStorage.setItem("user-type",JSON.stringify(data.current_user));
    			if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="admin"){
    				this.props.history.push({pathname:"/admin-resources"});
    			}
    			if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="client"){
    				this.props.history.push({pathname:"/Welcome"});
    			}
    			if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="rep"){
    				this.props.history.push({pathname:"/RepDashboard"});
    			}if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="administrator"){
    				this.props.history.push({pathname:"/user"});
    			}

    		}
    	})
      }else{
      	hasNull(logindata.name) ? this.setState({usernameState:true}): this.setState({usernameState:false})
		hasNull(logindata.pass) ? this.setState({passwordState:true}): this.setState({passwordState:false})
      }
	}

	updateresetpassword=(e)=>{
		e.preventDefault();
		var resetPassworddata={
    		mail:document.querySelector('#email').value,
    	}
		if(!hasNull(resetPassworddata.mail)){
		try{
			var status;
			fetch(Apiurl.forgotPassword.url,{
                method:Apiurl.forgotPassword.method,
                body: JSON.stringify(resetPassworddata),
    	}).then(res=>{
    		status=res.status;
    		if(status!==200){
    			return res.json(); 
    		}
    	}).then(data=>{
    		console.log(data);
    		if(status===200){
    			this.setState({showresetpassworderror:false,showresetpassworderrormsg:'Email is sent to you registered emailid.'});
    			let self=this;
    			setTimeout(()=>{
    				self.setState({showHidePasswordfield:false,showresetpassworderrormsg:''})
    				document.querySelector("#email").value='';
    			},5000)
    		}else{    			
    			this.setState({showresetpassworderror:true,showresetpassworderrormsg:data.message});
    		}
    	});
		}catch(err){
			console.log(err);
		}
	}else{
			hasNull(resetPassworddata.mail) ? this.setState({usernameState:true}): this.setState({usernameState:false})
	}
	}

	resetPassword=(e)=>{
		e.preventDefault();
		this.setState({showHidePasswordfield:true});
	}

   render(){
   		return(
   		<section className="main-wrapper">
   			{this.state.login_data_loaded ? 
				<div className="d-flex flex-wrap login-main">
			
					{/*<!--Login form block start-->*/}
					<div className="login-form d-flex flex-wraps">
						<img src={require("./../images/login-screen-pattern-grey.svg")} alt="login screen pattern"/>
						
						{/*<!--Login top details start-->*/}
						<div className="top-details">
							<a className="logo" href="#"><img src={this.state.login_logo}/></a>
							
							{/*<!--Login form start-->*/}
							<form onSubmit={!this.state.showHidePasswordfield ? this.Login : this.updateresetpassword}>
								<div className="form-group">
									<label>{this.state.login_email_title}</label>
									<input type="email" placeholder={this.state.login_email_title} id='email' name='email' tabIndex="1" onBlur={(e)=>
										hasNull(e.target.value) ? this.setState({usernameState:true}): this.setState({usernameState:false})
									}/>
									{this.state.usernameState ? ValidationMsg.common.default.userfield : ''}
								</div>
								{!this.state.showHidePasswordfield ? 
								<div className="form-group">
									<label>{this.state.login_password_title}</label>
									<input type="password" placeholder="******" id='password' name='password' tabIndex="2" onBlur={(e)=>
										hasNull(e.target.value) ? this.setState({passwordState:true}): this.setState({passwordState:false})
									}/>
									{this.state.passwordState ? ValidationMsg.common.default.passwordfield : ''}
									<Link to={""} onClick={this.resetPassword} title="Reset your password" tabIndex="3">Reset your password</Link>
								</div>
								:<></>}
								{!this.state.showHidePasswordfield ? 
								<div className="button-group">
									<button className="btn common-btn-blue"  tabIndex="4">
										<span>{this.state.login_sign_button}</span></button>
									{this.state.login_rep_button!=='' ? <button className="btn common-btn-blue" type="submit"><span>{this.state.login_rep_button}</span></button>:''}
									{this.state.login_admin_button!=='' ? <button className="btn common-btn-blue" type="submit"><span>{this.state.login_admin_button}</span></button>:''}

								</div>
								:
								<div className="button-group">
									<button className="btn common-btn-blue"  tabIndex="4">
										<span>Submit</span></button>
									</div>
								}
								{!this.state.loginError ? cosmaticAsset.cosmatic.default.loginErrorMsg : ''}
								{this.state.showresetpassworderror ? <h5><span className="empty-field">{this.state.showresetpassworderrormsg}</span></h5> :  <h5><span className="empty-field">{this.state.showresetpassworderrormsg}</span></h5>}
							</form>{/*<!--Login form end-->*/}
							
						</div>{/*<!--Login top details end-->*/}
						
						{/*<!--Login footer start-->*/}
						<div className="login-footer d-flex flex-wrap">
							<ul className="links d-flex flex-wrap">
								<li><Link to={""} onClick={e=>e.preventDefault()} title="Contact">Contact</Link></li>
								<li><Link to={""} onClick={e=>e.preventDefault()} title="Privacy">Privacy</Link></li>
							</ul>
							<div className="copyright"> &copy; 2020 Hydro International</div>
						</div>{/*<!--Login footer end-->*/}
					</div>
					{/*<!--Login form block end-->*/}

					{/*<!--Login right block start-->*/}
					<div className="login-right-img bg-cover" style={{backgroundImage: `url(${this.state.login_background})`}}>
						<img className="svg" src={require("./../images/login-screen-pattern-white-r.svg")} alt="login screen pattern"/>
					</div>
					{/*<!--Login right block end-->*/}
				</div>
				:
				<div className='Loading'>
				{cosmaticAsset.cosmatic.default.loader}
				</div>}
			</section>
		);
	}

}

export default Login;
