import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 
import {cosmaticAsset} from'../../constants/common';
import {Twitter,Linkdin} from'../assets/Repsocialmediaicons';

class Repclientdetails extends React.Component{
	constructor(props){
		super(props);
		this.state={
			clientDetails:'',
			loader:true
		}
		console.log(this.props.repclientuid);
	}


		componentDidMount(){
			this.Get_client_Details();
		}


		Get_client_Details=()=>{
			fetch(`https://staging.project-progress.net/projects/hydro/jsonapi/client_details/${this.props.repclientuid}?_format=json`,{
			    headers:{
			            "Content-Type" : "application/json",
			            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
			    },
			    method:"GET",
  			}).then(res=>res.json()).then(data=>{
  					console.log(data);
  					if(data.length>0){
  						this.setState({clientDetails:data[0],loader:false})
  					}else{  	
  						this.setState({loader:false,clientDetails:''})
  					}
  			});
		}

	render(){
		return(
			<div className="person-detils-box sky-blue-light-2 d-flex flex-wrap">
			  {!this.state.loader ? 
			   <>
			  {this.state.clientDetails!=='' ? 
			   <>
			   <div className="person-img">
			      <img src={this.state.clientDetails!=='' && this.state.clientDetails.user_picture!==''  ? site_url+this.state.clientDetails.user_picture : require("../../../images/profile-logo-blue.svg")} alt="Client image" />
			   </div>
				   <div className="person-right">
				      <div className="person-title">
				         <ul className="desktop-hide d-flex">
				           	<Twitter/>
				           	<Linkdin/>
				         </ul>
				         {this.state.clientDetails.field_first_name!=='' || this.state.clientDetails.field_last_nam!=='' ?
				        		 <>
				        		 <h3>{this.state.clientDetails.field_first_name} {this.state.clientDetails.field_last_name}</h3>
				         		<h4>{this.state.clientDetails.field_job_title!=='' ? this.state.clientDetails.field_job_title : 'Job title'}</h4>
				         		</>
				         		:''
				         	}
				      </div>
				      <div className="person-details">
				         <div className="bottom-details d-flex flex-wrap">

				            <div className="left d-flex flex-wrap">
				            {this.state.clientDetails.field_location!=='' ?
				               <>
				               <img src={require("../../../images/ic_location_marker.svg")} alt="Map marker"/>
				               <span>{this.state.clientDetails.field_location}</span></>:''}
				            </div>
				            <div className="right">
				               <ul>
				               {this.state.clientDetails.field_contact_number!=='' ? 
				                  <li><Link to={`tel:${this.state.clientDetails.field_contact_number}`} title={this.state.clientDetails.field_contact_number}>
				                     <img src={require("../../../images/ic_telephone_blue.svg")} alt="Telephone marker"/>
				                     <span><strong>Tel:</strong> {this.state.clientDetails.field_contact_number}</span></Link>
				                  </li>
				                  :''}
				                  {this.state.clientDetails.mail!=='' ? 
				                  <li><Link to={`mailto:${this.state.clientDetails.mail}`} title={this.state.clientDetails.mail}>
				                     <img src={require("../../../images/ic_mail_box_blue.svg")} alt="Mailbox marker"/>
				                     <span><strong>Email:</strong>{this.state.clientDetails.mail}</span></Link>
				                  </li>:''}
				               </ul>
				            </div>
				         </div>
				      </div>
				   </div>
				   </>
				   :
				   <>
				   	<div className='no-client-details'>No client details provided.</div>
				   </>
				}
			   </>:
			   <>
					{cosmaticAsset.cosmatic.default.loader}
				</>
			}
			</div>
			)

	}
}


export default Repclientdetails;