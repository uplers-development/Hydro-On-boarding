import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 
import{hasNull,isRequired,hasValidEmail,hasValidMobile,hasValidPassword} from '../../validation';
import {ValidationMsg} from'../../constants/validationmsg';

class Repaddclient extends React.Component{
	constructor(props){
		super(props);
		this.state={
	         firstnameState:false,
            SurnameState:false,
            emailstate:false,
            companyState:false,
            roleState:false,
            contactnumberState:false,
            passowrdState:false,
            checkedState:false,

		}
      this.form=React.createRef();
	}


	render(){
     
		return(
				 <div className="first-form">
                        <form >
                           <div className="form-group">
                              <label>First name</label>
                                 <input type="text" id="fname" placeholder="First name"  onBlur={(e)=>
                              hasNull(e.target.value) ? this.setState({firstnameState:true}): this.setState({firstnameState:false})}/>
                              {this.state.firstnameState ? ValidationMsg.common.default.firstname : ''}
                           </div>
                           <div className="form-group">
                              <label>Surname</label>
                              <input type="text" id="sname" placeholder="Surname"  onBlur={(e)=>
                              hasNull(e.target.value) ? this.setState({SurnameState:true}): this.setState({SurnameState:false})}/>
                              {this.state.SurnameState ? ValidationMsg.common.default.surnamefield : ''}
                           </div>
                           <div className="form-group">
                              <label>Email</label>
                              <input type="email" id="email" placeholder="Email"  onBlur={(e)=>
                              !hasValidEmail(e.target.value) ? this.setState({emailstate:true}): this.setState({emailstate:false})}/>
                              {this.state.emailstate ? ValidationMsg.common.default.email : ''}
                           </div>
                           <div className="form-group">
                              <label>Company</label>
                              <input type="text" id="company" placeholder="Company" onBlur={(e)=>
                              hasNull(e.target.value) ? this.setState({companyState:true}): this.setState({companyState:false})}/>
                              {this.state.companyState ? ValidationMsg.common.default.company : ''}
                           </div>
                           <div className="form-group">
                              <label>Role</label>
                              <input type="text" id="role" placeholder="Role"  onBlur={(e)=>
                              hasNull(e.target.value) ? this.setState({roleState:true}): this.setState({roleState:false})}/>
                              {this.state.roleState ? ValidationMsg.common.default.role : ''}
                           </div>
                           <div className="form-group">
                              <label>Contact number</label>
                              <input type="text" id="contact" placeholder="Contact number"  onBlur={(e)=>
                              !hasValidMobile(e.target.value)? this.setState({contactnumberState:true}): this.setState({contactnumberState:false})}/>
                              {this.state.contactnumberState ? ValidationMsg.common.default.contactNumber : ''}
                           </div>
                           <div className="form-group">
                              <label>Time zone</label>
                              <select id="timezone">
                                 <option value="GMT">GMT</option>
                                 <option value="UTC">UTC</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <label>Password</label>
                              <input type="password" id="password" placeholder="Password"  onBlur={(e)=>
                              !hasValidPassword(e.target.value) ? this.setState({passowrdState:true}): this.setState({passowrdState:false})}/>
                              {this.state.passowrdState ? ValidationMsg.common.default.passwordfield : ''}
                           </div>
                           <div className="send-user-notification">
                              <div class="d-flex flex-wrap notification">
                                 <h3>Send User Notifications</h3>
                                 <div className="checkbox-cust"><input type="checkbox" id="checkbox5"  onBlur={(e)=>
                                     hasNull(e.target.value) ? this.setState({checkedState:true}): this.setState({checkedState:false})}/>
                                    <label for="checkbox5"></label>
                                    {this.state.checkedState ? ValidationMsg.common.default.usernotificationcheckbox : ''}
                                 </div>
                              </div>
                              <p>Send the new client an email about their account</p>
                           </div>
                        </form>
                     </div>
			)
	}
}
export default Repaddclient;