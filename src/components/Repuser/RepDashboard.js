import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';

class RepDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			rightSide_data:[],
		}
	}
	render(){
		return(<div id="modal" className="modal-container">
				<div className="modal d-flex flex-wrap align-center justify-center">
					<a href="#" className="close" title="Close">
					<img src={require("../../images/close-icon-gray.svg")} alt="Close icon"/>
					</a>
					<div>
						<img src={require("../../images/round-correct.svg")} alt="Right icon"/>
						<h2>Thank You</h2>
						<p>Your message was submitted successfully</p>
					</div>
				</div>
					
			</div>)
	}
}
		
export default RepDashboard;			   