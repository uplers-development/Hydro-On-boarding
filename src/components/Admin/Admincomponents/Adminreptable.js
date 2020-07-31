import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Admin} from '../../Apiurl'; 
import {cosmaticAsset} from '../../constants/common'

class Adminreptable extends React.Component{
	constructor(props){
		super(props)
		this.state={
			adminreptabledata:[],
			loader:true,
			noDatacall:false,
		}
	}

	componentDidMount(){
		this.get_admin_rep_table_data();
	}

	get_admin_rep_table_data=()=>{
		let status;
		try{
			fetch(Admin.adminreptablelisting.url,{
				headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            	},
            	method:Admin.adminreptablelisting.method
			}).then(res=>{
				status=res.status;
				return res.json()
			}).then(data=>{
				if(status===200){
					console.log(data);
					this.setState({loader:false,noDatafound:false,adminreptabledata:data});
				}else{
					this.setState({loader:false,noDatafound:true});
				}
			})
		}catch(err){
			console.log(err);
			this.setState({loader:false});
		}
	}


	render(){
		let checkloading=this.state.loader;
		let newrepdata=this.state.adminreptabledata;
		let noDatacall=this.state.noDatacall;
		return(
			  <div className="reps-table table-outer">
                  <div className="table-responsive">
                     {/*<!--Table Start-->*/}
                    {!checkloading ? 
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
                         {!noDatacall ?
					       newrepdata.map((item,index)=>
                           <tr key={index}>
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
                                          <Link to={""} onClick={e=>e.preventDefault()} title="Edit">
                                          Edit</Link>	 
                                          <Link to={""} onClick={e=>e.preventDefault()} title="Delete">
                                          Delete</Link>	 
                                          <Link to={""} onClick={e=>e.preventDefault()} title="View">
                                          View</Link>	 
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td>John.smith@example.co.uk</td>
                              <td>Project manager</td>
                              <td><span>22th Jan 2020</span><span>11.00 am</span></td>
                           </tr>
                           )
                           :
                           <tr> 
					          	<td className="no-desk-data" >
					          		{cosmaticAsset.cosmatic.default.noDatafound}
					          	</td>
					          </tr>
					      }
                        </tbody>
                     </table>
                     :
					      <>
					      	{cosmaticAsset.cosmatic.default.loader}
					   	  </>
					 }
                     {/*<!--Table End-->*/}
                  </div>
           	  </div>
			)
	}
}

export default Adminreptable;