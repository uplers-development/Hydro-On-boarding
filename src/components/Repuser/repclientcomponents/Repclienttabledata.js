import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 

class Repclienttabledata extends React.Component{
	constructor(props){
		super(props);
		this.state={
			parentchecked:false,

		}
	this.handleChecked=this.handleChecked.bind(this);
	this.handleViewEvent=this.handleViewEvent.bind(this);
	}

	handleChecked=()=>{
		this.setState({parentchecked:true});
	}

	handleViewEvent=(e,uid)=>{
		e.preventDefault();
		console.log(uid);
		this.props.checkViewpageCall(true,uid);
	}

	render(){
		return (
			<div className="clients-table table-outer">
						   <div className="table-responsive">
						   		 <table className="table table-striped">
							         <thead>
							            <tr>
							               <th>
							                  <div className="checkbox-cust">
							                     <input type="checkbox" id="checkbox" name="checkbox" onChange={this.handleChecked} />
							                     <label htmlFor="checkbox"></label>	 
							                  </div>
							                  <span>Name</span>
							               </th>
							               <th>Email</th>
							               <th>Role</th>
							               <th>Last updatetd</th>
							            </tr>
							         </thead>
							          <tbody>
						             {this.props.clientdataTable.map((item,index)=>
							            <tr key={index}>
							               <td>
							                  <div className="checkbox-cust">
							                     <input type="checkbox" id={"checkbox"+index} className="clientchecked" checked={this.state.parentchecked ? true : false} name="checkbox" onChange={this.singleChecked} />
							                     <label htmlFor={"checkbox"+index}></label>	 
							                  </div>
							                  <div className="name-edit">
							                     <div className="img-c">
							                        <img src={item.user_picture!=='' ? site_url+item.user_picture : require("../../../images/john-smith.png")} alt="Profile image" />	 
							                     </div>
							                     <div className="right-detail">
							                        <h3>{item.name}</h3>
							                        <div className="action d-flex flex-wrap">
							                           <Link to={"/RepClients_details"} title="Edit">Edit</Link>	 
							                           <a href="#" title="Delete">Delete</a>	 
							                           <Link to={""} onClick={(e)=>this.handleViewEvent(e,item.uid)} title="View">View</Link>	 
							                        </div>
							                     </div>
							                  </div>
							               </td>
				               			   <td>{item.mail}</td>
				               			   <td>{item.roles_target_id}</td>
					               		   <td><span>{item.changed}</span></td>
							            </tr>
					               	)}
						          	 </tbody>
							      </table>
						   </div>
			</div>
		);
	}
}

export default Repclienttabledata;