import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Repclient} from '../../Apiurl'; 

class Adminreptable extends React.Component{
	constructor(props){
		super(props)
		this.state={

		}
	}

	render(){
		return(
			  <div className="reps-table table-outer">
                  <div className="table-responsive">
                     {/*<!--Table Start-->*/}
                     <table className="table table-striped">
                        <thead>
                           <tr>
                              <th>
                                 <div className="checkbox-cust">
                                    <input type="checkbox" id="checkbox1" />
                                    <label htmlFor="checkbox1"></label>	 
                                 </div>
                                 <span>Name</span>
                              </th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Last updatetd</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>
                                 <div className="checkbox-cust">
                                    <input type="checkbox" id="checkbox2" />
                                    <label htmlFor="checkbox2"></label>	 
                                 </div>
                                 <div className="name-edit">
                                    <div className="img-c">
                                       <img src={require("../../../images/userrep_user2x.png")} alt="Prfile image" />	 
                                    </div>
                                    <div className="right-detail">
                                       <h3>John Smith</h3>
                                       <div className="action d-flex flex-wrap">
                                          <Link to={""} title="Edit">
                                          Edit</Link>	 
                                          <Link to={""} title="Delete">
                                          Delete</Link>	 
                                          <Link to={""} title="View">
                                          View</Link>	 
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td>John.smith@example.co.uk</td>
                              <td>Project manager</td>
                              <td><span>22th Jan 2020</span><span>11.00 am</span></td>
                           </tr>
                        </tbody>
                     </table>
                     {/*<!--Table End-->*/}
                  </div>
           	  </div>
			)
	}
}

export default Adminreptable;