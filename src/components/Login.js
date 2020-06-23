import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl from './Apiurl'; 
import loginScreeImg from "./../images/login-screen.jpg";
import $ from "jquery";

class Login extends Component{
	constructor() {
    	super();
    	this.state={

    	}
    	this.Login=this.Login.bind(this);
    }
    componentDidMount(){
    	//this.createSvg()
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


    }

    Login = () =>{
    	var logindata={
    		name:document.querySelector('#email').value,
    		pass:document.querySelector('#password').value,
    	}
    	console.log(logindata);
    	fetch(Apiurl.Loginaction.url,{
    			headers: {
                	"Content-Type" : "application/json",
                },
                method:Apiurl.Loginaction.method,
                body: JSON.stringify(logindata),
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    		this.props.history.push({pathname:"/components/Dashboard"});
    	})

}

   render(){
   		return(<section className="main-wrapper">
		<div className="d-flex flex-wrap login-main">
			
			{/*<!--Login form block start-->*/}
			<div className="login-form d-flex flex-wraps">
				<img src={require("./../images/login-screen-pattern-grey.svg")} alt="login screen pattern"/>
				
				{/*<!--Login top details start-->*/}
				<div className="top-details">
					<a className="logo" href="#"><img src={require("./../images/logo-main-blue.svg")}/></a>
					
					{/*<!--Login form start-->*/}
					<form>
						<div className="form-group">
							<label>Email</label>
							<input type="email" placeholder="Email" id='email' tabIndex="1"/>
						</div>

						<div className="form-group">
							<label>Password</label>
							<input type="password" placeholder="Password" id='password' tabIndex="2"/>
							<a href="#" title="Reset your password" tabIndex="3">Reset your password</a>
						</div>

						<div className="button-group">
							<button className="btn common-btn-blue" type="button"  onClick={this.Login}  tabIndex="4">
								<span>SIGN IN</span></button>
							<button className="btn common-btn-blue" type="submit"><span>REP USER</span></button>
							<button className="btn common-btn-blue" type="submit"><span>ADMIN</span></button>
						</div>
					</form>{/*<!--Login form end-->*/}
					
				</div>{/*<!--Login top details end-->*/}
				
				{/*<!--Login footer start-->*/}
				<div className="login-footer d-flex flex-wrap">
					<ul className="links d-flex flex-wrap">
						<li><a href="#" title="Contact">Contact</a></li>
						<li><a href="#" title="Privacy">Privacy</a></li>
					</ul>
					<div className="copyright"> &copy; 2020 Hydro International</div>
				</div>{/*<!--Login footer end-->*/}
			</div>
			{/*<!--Login form block end-->*/}

			{/*<!--Login right block start-->*/}
			<div className="login-right-img bg-cover" style={{backgroundImage: `url(${loginScreeImg})`}}>
				<img className="svg" src={require("./../images/login-screen-pattern-white-r.svg")} alt="login screen pattern"/>
			</div>
			{/*<!--Login right block end-->*/}
		</div>
	</section>);
   }
}

export default Login;
