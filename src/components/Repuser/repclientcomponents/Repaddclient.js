import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 

class Repaddclient extends React.Component{
	constructor(props){
		super(props);
		this.state={
	

		}
	}

	render(){
		return(
				 <div className="first-form">
                        <form>
                           <div className="form-group">
                              <label>First name</label>
                              <input type="text" name="fname" />
                           </div>
                           <div className="form-group">
                              <label>Surname</label>
                              <input type="text" name="sname" />
                           </div>
                           <div className="form-group">
                              <label>Email</label>
                              <input type="email" name="fname" />
                           </div>
                           <div className="form-group">
                              <label>Company</label>
                              <input type="text" name="company" />
                           </div>
                           <div className="form-group">
                              <label>Role</label>
                              <input type="text" name="role" />
                           </div>
                           <div className="form-group">
                              <label>Contact number</label>
                              <input type="number" name="contact" />
                           </div>
                           <div className="form-group">
                              <label>Time zone</label>
                              <select name="timezone">
                                 <option value="GMT">GMT</option>
                                 <option value="UTC">UTC</option>
                              </select>
                           </div>
                           <div className="form-group">
                              <label>Password</label>
                              <input type="password" name="password" />
                           </div>
                           <div className="send-user-notification">
                              <div class="d-flex flex-wrap notification">
                                 <h3>Send User Notifications</h3>
                                 <div className="checkbox-cust"><input type="checkbox" id="checkbox5" />
                                    <label for="checkbox5"></label>
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