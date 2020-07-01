import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
//import {cosmaticAsset} from'../constants/common';
import{hasNull,isRequired} from '../validation';
import {ValidationMsg} from'../constants/validationmsg';

class Repcontact extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			repContactDetails:null,
			repcontactRendered:false,
			showPop:false,
			textareaState:false,
		}
		this.textArea = React.createRef();
		this.SendRepContactQuery=this.SendRepContactQuery.bind(this);
	}

	componentDidMount(){
		this.GetRepContactDetails();
	}

	GetRepContactDetails=()=>{
		fetch(Apiurl.GetRepContactDetails.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
                method:Apiurl.GetRepContactDetails.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({repContactDetails:data,repcontactRendered:true})
    		console.log(this.state.repContactDetails.user_picture.url);

    	})
	}


	SendRepContactQuery=(e)=>{
		e.preventDefault();
		let QueryObj={
				message:this.textArea.current.value
		}
		if(!hasNull(QueryObj.message)){
		fetch(Apiurl.SendRepContactQuery.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
                method:Apiurl.SendRepContactQuery.method,
                body:JSON.stringify(QueryObj)
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		if(data.response!==''){
    			this.setState({showPop:true,textareaState:false})
    		}else{
    			this.setState({showPop:false,textareaState:false})
    		}
    	})
    }else{
    	hasNull(QueryObj.message) ? this.setState({textareaState:true}): this.setState({textareaState:false})
    }
	}


 
	render() {
		return (

				<section className="main-wrapper">
					{!this.state.showPop ? 
					<div className="d-flex flex-wrap main-block right-btm-pattern-gray">
						<Sidebar/>
						<div className="d-flex flex-wrap right-content-part">
							<div className="top-heading">
								<div className="top-heading-continer d-flex flex-wrap align-center">
									<div className="name-of-heading d-flex flex-wrap">
										<img src={require("../../images/ic_down_arrow_blue.svg")} alt="profile-logo"/>
										<h1>Rep contacts</h1>
									</div>

									<UserProfile/>
								</div>
								
							</div>
							{this.state.repcontactRendered ? 
							<div className="bottom-content-block">	
								<div className="d-flex flex-wrap rep-contacts-main">
									<div className="rep-contracts-left">
										<div className="person-detils-box sky-blue-light-2 d-flex flex-wrap">
											<div className="person-img">
												<img src={this.state.repContactDetails.user_picture!=='' ? this.state.repContactDetails.user_picture :require("../../images/hydro-in-tab.png")} alt="User image"/>
											</div>
											<div className="person-right">
												<div className="person-title">
													<ul className="desktop-hide d-flex">
														<li><a href="https://twitter.com" title="Follow us"><img src={require("../../images/ic_twitter_blue.svg")} alt="Twitter" /></a></li>
														<li><a href="https://www.linkedin.com/" title="Connect"><img src={require("../../images/ic_linkedin.svg")} alt="Linkedin" /></a></li>
													</ul>
													<h3>{this.state.repContactDetails.field_first_name[0].value} {this.state.repContactDetails.field_last_name[0].value}</h3>
													<h4>Job title</h4>
												</div>
												<div className="person-details">
													<div className="bottom-details d-flex flex-wrap">
														<div className="left d-flex flex-wrap">
															<img src={require("../../images/ic_location_marker.svg")} alt="Map marker"/>
															<span>{this.state.repContactDetails.field_organisation[0].value}, {this.state.repContactDetails.field_location[0].value}</span>
														</div>

														<div className="right">
															<ul>
																<li><a href={`tel:${this.state.repContactDetails.field_contact_number[0].value}`} title={this.state.repContactDetails.field_contact_number[0].value}><img src={require("../../images/ic_telephone_blue.svg")} alt="Telephone marker" />
																		<span><strong>Tel:</strong> {this.state.repContactDetails.field_contact_number[0].value}</span></a>
																</li>

																<li><a href={`mailto:${this.state.repContactDetails.email}`} title= {this.state.repContactDetails.email}><img src={require("../../images/ic_mail_box_blue.svg")} alt="Mailbox marker" />
																		<span><strong>Email:</strong> {this.state.repContactDetails.email}</span></a>
																</li>
															</ul>
														</div>

													</div>
												</div>
											</div>
										</div>
										

										<div className="get-in-touch">
											<h5>Get in touch with your rep</h5>
											<form action="#">
												<textarea placeholder="Type your message here…" ref={this.textArea}/>
												{this.state.textareaState ? ValidationMsg.common.default.mailTextarea : ''}
												<div className="btn-block">
													<button className="btn common-btn-blue" type="button" tabIndex="4" onClick={this.SendRepContactQuery}>
														<span>SUBMIT QUERY</span></button>
												</div>
											</form>
										</div>
									</div>
									
									<div className="rep-contracts-right mobile-hide">
										<h6>Hydro on Social</h6>
										<ul>
											<li><a href="https://twitter.com" title="Follow us"><img src={require("../../images/ic_twitter_blue.svg")} alt="Twitter" /> <span>Follow us</span></a></li>
											<li><a href="https://www.linkedin.com/" title="Connect"><img src={require("../../images/ic_linkedin.svg")} alt="Linkedin" /><span>Connect</span></a></li>
										</ul>
									</div>
								</div>
							</div>
							:""}
						</div>
					</div>:
					
						<div id="modal" className="modal-container">
							<div className="modal d-flex flex-wrap align-center justify-center">
								<Link to={"./rep-contact"} className="close" title="Close" onClick={(e)=>this.setState({showPop:false})}>
									<img src={require("../../images/close-icon-gray.svg")} alt="Close icon" />
								</Link>
								<div>
								<img src={require("../../images/round-correct.svg")} alt="Right icon"/><h2>Thank you</h2><p>Your message was submitted successfully</p>
								</div>
							</div>
						</div>
				}
				</section>
		);
	}
}

export default Repcontact;
