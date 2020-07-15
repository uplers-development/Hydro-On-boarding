import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 

class Repclienttabledata extends React.Component{
	constructor(props){
		super(props);
		this.state={
			parentchecked:false,
			openPopup:false,
			setSingleDeleteId:null
		}
	this.selectAllcheckbox=this.selectAllcheckbox.bind(this);
	this.singleSelect=this.singleSelect.bind(this);
	this.handleViewEvent=this.handleViewEvent.bind(this);
	}

	selectAllcheckbox=(e)=>{
		 var ele=e.target;
		 var checkboxes = document.getElementsByTagName('input');
	     if (ele.checked) {
	         for (var i = 0; i < checkboxes.length; i++) {
	             if (checkboxes[i].type == 'checkbox') {
	                 checkboxes[i].checked = true;
	             }
	         }
	     }else {
	         for (var i = 0; i < checkboxes.length; i++) {
	             console.log(i)
	             if (checkboxes[i].type == 'checkbox') {
	                 checkboxes[i].checked = false;
	             }
	         }
	      }
	}

	singleSelect=(e)=>{
		var checkboxes = document.querySelectorAll('.clientchecked');
		var ele=document.querySelector(".parentcheck");
		var checkedCheckboxes=document.querySelectorAll('.clientchecked:checked').length;
		console.log(checkedCheckboxes);
		if(e.target.checked===false){
			document.querySelector(".parentcheck").checked=false
		}else{
			for(var i=1;i<=checkboxes.length ; i++){
				if(checkedCheckboxes===checkboxes.length){
					ele.checked=true;
				}else{
					ele.checked=false;
				}
			}
		}	
	}



	deleteRecord = (e) =>{
		e.preventDefault();
		alert(this.state.setSingleDeleteId);
		try{
			fetch(`${base_url}user/${this.state.setSingleDeleteId}?_format=json`,{
					headers: {
	                	"Content-Type" : "application/json",
	                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                },
	                method:'PATCH',
			}).then(res=>{
				return res.json();
			}).then(data=>{
				console.log(data);
				this.setState({openPopup:false});
	 			this.props.recordDelete(true);

			})
	 	}catch(err){
	 		console.log(err);
	 		alert(err);
	 		this.setState({openPopup:false});
	 	}
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
							                     <input type="checkbox" className="parentcheck" id="checkbox" name="checkbox" onChange={this.selectAllcheckbox}/>
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
							                     <input type="checkbox" id={"checkbox"+index} className="clientchecked" name="checkbox" onChange={this.singleSelect} defaultValue={item.uid}/>
							                     <label htmlFor={"checkbox"+index}></label>	 
							                  </div>
							                  <div className="name-edit">
							                     <div className="img-c">
							                        <img src={item.user_picture!=='' ? site_url+item.user_picture : require("../../../images/john-smith.png")} alt="Profile image" />	 
							                     </div>
							                     <div className="right-detail">
							                        <h3>{item.name}</h3>
							                        <div className="action d-flex flex-wrap">
							                           <Link to={""} onClick={(e)=>this.handleViewEvent(e,item.uid)} title="Edit">Edit</Link>	 
							                           <Link to={""} onClick={((e)=>
							                           	{	e.preventDefault();
							                           		this.setState({openPopup:true,setSingleDeleteId:item.uid})}
							                           	)} title="Delete">Delete</Link>	 
							                           <Link to={""} onClick={(e)=>this.handleViewEvent(e,item.uid)} title="View">View</Link>	 
							                        </div>
							                     </div>
							                  </div>
							               </td>
				               			   <td>{item.mail}</td>
				               			   <td>{item.field_job_title}</td>
					               		   <td><span>{item.changed}</span></td>
							            </tr>
					               	)}
						          	 </tbody>
							      </table>

							      {this.state.openPopup ? 
											<div id="modal" className="modal-container">
												<div className="modal d-flex flex-wrap align-center justify-center">
													<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})})}
													className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
													
												<div>
													<img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
														<p>Are you sure you want to delete records?</p>

													<div className="btn-blok">
														<button onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})})} className="btn common-btn-blue"><span>CANCEL</span></button>
														<button className="btn common-btn-blue" onClick={this.deleteRecord}><span>YES</span></button>	
													</div>
													
												</div>
												</div>
											</div>
								: <></>}
						   </div>
			</div>
		);
	}
}

export default Repclienttabledata;