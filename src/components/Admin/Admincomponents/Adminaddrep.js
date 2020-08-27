import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {ValidationMsg} from'../../constants/validationmsg';
import{hasNull,isRequired,hasValidEmail,hasValidMobile,hasValidPassword} from '../../validation';
import {cosmaticAsset} from '../../constants/common'

class Adminaddrep extends React.Component{
   constructor(props){
      super(props);
   	  this.state={
   	  		timeZone:null,
   	  		firstnamestate:false,
   	  		lastnamestate:false,
   	  		emailstate:false,
   	  		companystate:false,
   	  		rolestate:false,
   	  		contactnumberstate:false,
   	  		passwordstate:false,
   	  		openRepsubmission:false,
   	  		repdetails:'',
   	  		loader:true,
   	  		popupmsg:''
   		}   

   		this.timeZoneref=React.createRef();
   		this.onSubmit=this.onSubmit.bind(this);
   }

   componentDidMount(){
   		this.GetTimeZone();
   		 if(!this.props.addstatus){
		   		this.get_rep_client_details();
		   	 }else{
		   	 	this.setState({loader:false});
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
		})
	}

	onSubmit=(e)=>{
		e.preventDefault();
		if(!hasNull(document.querySelector("#fname").value) && !hasNull(document.querySelector("#sname").value) && hasValidEmail(document.querySelector("#email").value) && !hasNull(document.querySelector("#company").value) && !hasNull(document.querySelector("#role").value) && hasValidMobile(document.querySelector("#contact").value) && hasValidPassword(document.querySelector("#password").value)){

			let addrepoptions={
				"field_first_name" : [{ "value": document.querySelector("#fname").value}],
		        "field_last_name" : [{ "value": document.querySelector("#sname").value}],
		        "mail" : [{ "value": document.querySelector("#email").value}],
		        "field_organisation": [{ "value": document.querySelector("#company").value}],
		        "field_job_title" : [{ "value": document.querySelector("#role").value}],
		        "field_contact_number" : [{ "value": document.querySelector("#contact").value}],
		        "timezone" : [{ "value": this.timeZoneref.current.value}],
		        "name" : [{ "value": document.querySelector("#email").value}],
		        "pass" : [{ "value": document.querySelector("#password").value}],
		        "roles" : [{  target_id: "rep" }],
		        "status": [{ "value":1}]
			}
			console.log(addrepoptions);
			let apicall=this.props.addstatus ? Admin.adminaddrepclient.url+`?_format=json` : Admin.adminaddupdaterepclient.url+`${this.props.sendrepId}?_format=json`;
			let apimethod=this.props.addstatus ? Admin.adminaddrepclient.method : Admin.adminaddupdaterepclient.method;
			try{
				let status;
				fetch(apicall,{
					headers:{
		                  "Content-Type" : "application/json",
		                  "X-CSRF-Token" : localStorage.getItem("access-token"),
		                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
		            	},
		            method:apimethod,
		            body:JSON.stringify(addrepoptions)
				}).then(res=>{
					status=res.status;
					return res.json();
				}).then(data=>{
					if(status===201){
						this.setState({openRepsubmission:true,popupmsg:"Rep added"});
					}else if(status===200){
						this.setState({openRepsubmission:true,popupmsg:"Rep updated"});
					}
					console.log(data);
				})
			}catch(err){
				console.log(err);
			}

		}else{
			hasNull(document.querySelector("#fname").value) ? this.setState({firstnamestate:true}): this.setState({firstnamestate:false})
			hasNull(document.querySelector("#sname").value) ? this.setState({lastnamestate:true}): this.setState({lastnamestate:false})
			!hasValidEmail(document.querySelector("#email").value) ? this.setState({emailstate:true}): this.setState({emailstate:false})
			hasNull(document.querySelector("#company").value) ? this.setState({companystate:true}): this.setState({companystate:false})
			hasNull(document.querySelector("#role").value) ? this.setState({rolestate:true}): this.setState({rolestate:false})
			!hasValidMobile(document.querySelector("#contact").value) ? this.setState({contactnumberstate:true}): this.setState({contactnumberstate:false})
			!hasValidPassword(document.querySelector("#password").value) ? this.setState({passwordstate:true}): this.setState({passwordstate:false})
		} 
	}

	get_rep_client_details=(e)=>{
		let status;
		fetch(Admin.adminviewrepclient.url+`${this.props.sendrepId}?_format=json`,{
			headers:{
		                  "Content-Type" : "application/json",
		                  "X-CSRF-Token" : localStorage.getItem("access-token"),
		                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
		            	},
            method:Admin.adminviewrepclient.method,
		}).then(res=>{
			status=res.status;
			return res.json();
		}).then(data=>{
			if(status===200){
				this.setState({repdetails:data,loader:false});
				let self=this;
				setTimeout(()=>{
					self.timeZoneref.current.value=self.state.repdetails.timezone[0].value;
				},800)
			}
		})
	}
//
   render(){
   		return(
   			<>
	   			<div className="fileter-block details-head-block d-flex flex-wrap border-bottom"><h3>Add new rep details</h3>
					<h4>Create a brand new rep user and add them to this site</h4>
				</div>
   				<div className="container">
				   <div className="rep-add-form">
				   {!this.state.loader ? 
				      <form onSubmit={this.onSubmit}>
				         <div className="form-group">
				            <label>First name*</label>
				            <div className="input-box"><input type="text" name="fname" id="fname" onBlur={(e)=>hasNull(e.target.value) ? this.setState({firstnamestate:true}): this.setState({firstnamestate:false})} defaultValue={this.state.repdetails!=='' ? this.state.repdetails.field_first_name[0].value : '' }/>
				            {this.state.firstnamestate ? ValidationMsg.common.default.firstname : ''}
				            </div>
				         </div>
				         <div className="form-group">
				            <label>Surname*</label>
				            <div className="input-box"> <input type="text" name="sname" id="sname" onBlur={(e)=>hasNull(e.target.value) ? this.setState({lastnamestate:true}): this.setState({lastnamestate:false})} defaultValue={this.state.repdetails!=='' ? this.state.repdetails.field_last_name[0].value : '' }/>
				             	{this.state.lastnamestate ? ValidationMsg.common.default.lastname : ''}
				            </div>
				         </div>
				         <div className="form-group">
				            <label>Email*</label>
				            <div className="input-box"><input type="email" name="email" id="email" onBlur={(e)=>!hasValidEmail(e.target.value) ? this.setState({emailstate:true}): this.setState({emailstate:false})} defaultValue={this.state.repdetails!=='' ? this.state.repdetails.mail[0].value : '' }/>
				             	{this.state.emailstate ? ValidationMsg.common.default.email : ''}
				            </div>
				         </div>
				         <div className="form-group">
				            <label>Company*</label>
				            <div className="input-box"><input type="text" name="company" id="company" onBlur={(e)=>hasNull(e.target.value) ? this.setState({companystate:true}): this.setState({companystate:false})} defaultValue={this.state.repdetails!=='' ? this.state.repdetails.field_organisation[0].value : '' }/>
				             	{this.state.companystate ? ValidationMsg.common.default.company : ''}
				            </div>
				         </div>
				         <div className="form-group">
				            <label>Role*</label>
				            <div className="input-box"><input type="text" name="role" id="role" onBlur={(e)=>hasNull(e.target.value) ? this.setState({rolestate:true}): this.setState({rolestate:false})} defaultValue={this.state.repdetails!=='' ? this.state.repdetails.field_job_title[0].value : '' }/>
				             	{this.state.rolestate ? ValidationMsg.common.default.role : ''}
				            </div>
				         </div>
				         <div className="form-group">
				            <label>Contact number*</label>
				            <div className="input-box"><input type="number" name="contact" id="contact" onBlur={(e)=>!hasValidMobile(e.target.value) ? this.setState({contactnumberstate:true}): this.setState({contactnumberstate:false})} defaultValue={this.state.repdetails!=='' ? this.state.repdetails.field_contact_number[0].value : '' }/>
				             	{this.state.contactnumberstate ? ValidationMsg.common.default.contactNumber : ''}
				            </div>
				         </div>
				         <div className="form-group">
				            <label>Time zone*</label>
				            <div className="input-box">
							<select name="1" className="" tabIndex="6" id="time_zone" ref={this.timeZoneref} >
								{this.state.timeZone!==null ? ReactHtmlParser(this.state.timeZone) : '' }
							</select>
				            </div>
				         </div>
				         <div className="form-group">
				            <label>Password*</label>
				            <div className="input-box"><input type="password" name="password" id="password" onBlur={(e)=>!hasValidPassword(e.target.value) ? this.setState({passwordstate:true}): this.setState({passwordstate:false})} />
				             	{this.state.passwordstate ? ValidationMsg.common.default.passwordfield : ''}
				            </div>
				         </div>
				         <div className="btn-block">
				            <button className="btn common-btn-blue">
				            <span>{!this.props.readmode ? "Update Rep":"Add Rep"}</span></button>
				            	<Link to={""} onClick={((e)=>{e.preventDefault();this.props.updatedThereresponse(false)})} className="back-dashboard btn common-btn-blue"><span>Back</span></Link>
				         </div>
				      </form>
				      :<>
				  	 	{cosmaticAsset.cosmatic.default.loader}
				  	 </>}	
				   </div>
				   {this.state.openRepsubmission ? 
							<div id="modal" className="modal-container">
								<div className="modal d-flex flex-wrap align-center justify-center">
											<Link to={""} onClick={((e)=>{e.preventDefault();
												this.setState({openRepsubmission:false});
												this.props.updatedThereresponse(false);
											})}
											className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
											
										<div>
											<img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
												<h2>{this.state.popupmsg}</h2>
												<p>Rep was submitted successfully</p>
												<div className="btn-block">
										            <button className="btn common-btn-blue" onClick={((e)=>{e.preventDefault();
												this.setState({openRepsubmission:false});
												this.props.updatedThereresponse(false);
											})}>
										            <span>OK</span></button>
										         </div>
										</div>
								</div>
						</div>
						:
						<></>	
						}
				</div>
			</>
   			)
   		}
}

export default Adminaddrep;
