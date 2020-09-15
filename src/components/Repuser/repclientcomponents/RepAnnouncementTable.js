import React from 'react';
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import Apiurl,{base_url,site_url,Repclient} from '../../Apiurl'; 
import {RepLogoutPopup} from'../../constants/RepConstants';
import {ValidationMsg} from'../../constants/validationmsg';

class RepAnnouncementTable extends React.Component{
	constructor(props){
		super(props);
		this.state={
			parentchecked:false,
			openPopup:false,
			setSingleDeleteId:null,
			opensubmissionpopup:false
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
		var checkboxes = document.querySelectorAll('.announcementcheck');
		var ele=document.querySelector(".parentcheck");
		var checkedCheckboxes=document.querySelectorAll('.announcementcheck:checked').length;
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
		/*let status={"status" : [{ "value":0}] }*/
		try{
			fetch(Repclient.delete_announcement_details.url+`${this.state.setSingleDeleteId}?_format=json`,{
	                method:Repclient.delete_announcement_details.method,
					headers: {
	                	"Content-Type" : "application/json",
	                	"X-CSRF-Token" : localStorage.getItem("access-token"),
	                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                },
			}).then((data)=>{
				if(data.status===204){
						console.log(data);
						this.setState({openPopup:false});
			 			this.props.recordDelete(true);
	 			}
			})
	 	}catch(err){
	 		console.log(err);
	 		alert(err);
	 		this.setState({openPopup:false});
	 	}
	}

	handleViewEvent=(e,accouncementid)=>{
		e.preventDefault();
		console.log(accouncementid);
		this.props.checkViewpageCall(true,accouncementid);
	}

	render(){
		console.log(this.props.announcementList);
		return (
			<div className="clients-table table-outer">
						   <div className="table-responsive">
						   		 <table className="table table-striped">
							         <thead>
							            <tr>
							               <th>
							                <div className="checkbox-cust"><input type="checkbox" className="parentcheck" id="checkbox" name="checkbox" onChange={this.selectAllcheckbox}/><label htmlFor="checkbox"></label></div><span>Name</span>
							                </th>
							               <th>Description</th>
							            </tr>
							         </thead>
							          <tbody>
							         { this.props.announcementList.length > 0 ?
						             	this.props.announcementList.map((item,index)=>
							            	<tr key={index}>
							               <td>
							                  <div className="checkbox-cust">
							                     <input type="checkbox" id={"checkbox"+index} className="announcementcheck" name="checkbox" onChange={this.singleSelect} defaultValue={item.nid}/>
							                     <label htmlFor={"checkbox"+index}></label>	 
							                  </div>
							                  <div className="name-edit">
							                     <div className="img-c">
							                        <img src={item.field_image!=='' ? site_url+item.field_image : require("../../../images/profile-logo-blue.svg")} alt="Profile image" />	 
							                     </div>
							                     <div className="right-detail">
							                        <h3>{ReactHtmlParser(item.title)}</h3>
							                        <div className="action d-flex flex-wrap">
							                           <Link to={""} onClick={(e)=>this.handleViewEvent(e,item.nid)} title="Edit">Edit</Link>	 
							                           <Link to={""} onClick={((e)=>
							                           	{	e.preventDefault();
							                           		this.setState({openPopup:true,setSingleDeleteId:item.nid})}
							                           	)} title="Delete">Delete</Link>	 
							                           <Link to={""} onClick={(e)=>this.handleViewEvent(e,item.nid)} title="View">View</Link>	 
							                        </div>
							                     </div>
							                  </div>
							               </td>
				               			   <td>{ReactHtmlParser(item.body)}</td>
							            </tr>
					               		)
					               	:
					               	<tr>
					               		<td className="no-desk-data" colSpan={4}>
					               			{RepLogoutPopup.default.noDatafound}
					               		</td>
					               	</tr>}
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
						   <>
						    {this.state.opensubmissionpopup ? 
											<div id="modal" className="modal-container">
												<div className="modal d-flex flex-wrap align-center justify-center">
													<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({opensubmissionpopup:false});
													})}
													className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
													
												<div>
													<img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
														<h2>Announcement published</h2>
                  										 <p>Your message was submitted successfully</p>
                  										 <div className="btn-block">
																<button className="btn common-btn-blue" onClick={((e)=>{e.preventDefault();this.setState({opensubmissionpopup:false});
																	this.props.checkCallback(false);
													})}><span>OK</span></button>	
														</div>
												</div>
												</div>
											</div>
								: <></>}
						   </>

						   {this.props.announcementPublish ? 
						   		<div className="btn-block">
									<button className="btn common-btn-blue" onClick={this.submitAnnoucement}><span>Publish announcement</span></button>	
								</div>
						: ''}

						{this.state.formempty ? 
											<>
												{ValidationMsg.common.default.fieldsEmptyAnnoucementform}
											</>
											:
											''
										}

			</div>
		);
	}
}

export default RepAnnouncementTable;