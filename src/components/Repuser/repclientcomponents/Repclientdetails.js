import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 

class Repclientdetails extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
		return(
			<div className="person-detils-box sky-blue-light-2 d-flex flex-wrap">
			   <div className="person-img">
			      <img src={require("../../../images/girls-profile-img.png")} alt="Client image" />
			   </div>
			   <div className="person-right">
			      <div className="person-title">
			         <ul className="desktop-hide d-flex">
			            <li><a href="https://twitter.com" title="Follow us">
			               <img src={require("../../../images/ic_twitter_blue.svg")} alt="Twitter" />
			               </a>
			            </li>
			            <li><a href="https://www.linkedin.com/" title="Connect">
			               <img src={require("../../../images/ic_linkedin.svg")} alt="Linkedin" />
			               </a>
			            </li>
			         </ul>
			         <h3>Jane Smith</h3>
			         <h4>Job title</h4>
			      </div>
			      <div className="person-details">
			         <div className="bottom-details d-flex flex-wrap">
			            <div className="left d-flex flex-wrap">
			               <img src={require("../../../images/ic_location_marker.svg")} alt="Map marker"/>
			               <span>Address</span>
			            </div>
			            <div className="right">
			               <ul>
			                  <li><a href="tel:0000007" title="+0000007">
			                     <img src={require("../../../images/ic_telephone_blue.svg")} alt="Telephone marker"/>
			                     <span><strong>Tel:</strong> 0000000</span></a>
			                  </li>
			                  <li><a href="mailto:+44 (0)1189 331325" title="+44 (0)1189 331325">
			                     <img src={require("../../../images/ic_mail_box_blue.svg")} alt="Mailbox marker"/>
			                     <span><strong>Email:</strong>example@example.com</span></a>
			                  </li>
			               </ul>
			            </div>
			         </div>
			      </div>
			   </div>
			</div>
			)

	}
}


export default Repclientdetails;