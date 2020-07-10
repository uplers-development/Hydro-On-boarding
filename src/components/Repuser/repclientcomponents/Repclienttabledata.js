import React from 'react';
import Apiurl,{base_url,site_url} from '../../Apiurl'; 

const  Repclienttabledata=(props)=>{
		return (
			<div className="clients-table table-outer">
						   <div className="table-responsive">
						   		 <table className="table table-striped">
							         <thead>
							            <tr>
							               <th>
							                  <div className="checkbox-cust">
							                     <input type="checkbox" id="checkbox" name="checkbox[]" />
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
						             {props.clientdataTable.map((item,index)=>
							            <tr key={index}>
							               <td>
							                  <div className="checkbox-cust">
							                     <input type="checkbox" id="checkbox" name="checkbox" />
							                     <label htmlFor="checkbox2"></label>	 
							                  </div>
							                  <div className="name-edit">
							                     <div className="img-c">
							                        <img src={item.user_picture!=='' ? site_url+item.user_picture : require("../../../images/john-smith.png")} alt="Prfile image" />	 
							                     </div>
							                     <div className="right-detail">
							                        <h3>{item.name}</h3>
							                        <div className="action d-flex flex-wrap">
							                           <a href="#" title="Edit">Edit</a>	 
							                           <a href="#" title="Delete">Delete</a>	 
							                           <a href="#" title="View">View</a>	 
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

export default Repclienttabledata;