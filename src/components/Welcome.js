import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from './../images/common-bg.jpg';


class Welcome extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div><section className="main-wrapper">
		<div className="d-flex flex-wrap main-block black-overlay-transparent bg-cover" style={{backgroundImage:`url(${CommonBackground})`}}>
			
			{/*<!--Intro new user popup-->
						*/}			
			<div className="intro-new-user-popup">
				<a href="#" className="close" title="Close icon"><img className="svg" src={require("./../images/close-icon-gray.svg")} alt="close icon"/></a>
				<h1>Welcome to <br/> Hydro International <br/> On-boarding</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				<div className="list welcome-slider d-flex flex-wrap">
					
					<div className="items">
						<div>
						<h2>Products</h2>
						<div className="image-block">
							<div className="back-transp-img">
								<img className="svg" src={require("./../images/wlcome-item-bg.svg")} alt="welcome ovelay"/>
							</div>
							<img src={require("./../images/welcome-product-screen1.png")} alt="welcome-product-screen"/>
						</div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p></div>
					</div>
					
					<div className="items"><div>
						<h2>Resources</h2>
						<div className="image-block">
							<div className="back-transp-img">
								<img className="svg" src={require("./../images/wlcome-item-bg.svg")} alt="welcome ovelay"/>
							</div>
							<img src={require("./../images/welcome-resources-screen2.png")} alt="welcome-product-screen"/>
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
					</div></div>
					
					<div className="items"><div>
						<h2>Contracts</h2>
						<div className="image-block">
							<div className="back-transp-img">
								<img className="svg" src={require("./../images/wlcome-item-bg.svg")} alt="welcome ovelay"/>
							</div>
							<img src={require("./../images/welcome-contracts-screen3.png")} alt="welcome-product-screen"/>
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
					</div></div>
					
				</div>
				<div className="btn-block">
					<button className="btn common-btn-blue" type="submit">
						<span>START NOW</span></button>
				</div>
			</div>{/*<!--Intro new user popup End-->*/}

		</div>
	</section></div>
		);
	}
}


export default Welcome