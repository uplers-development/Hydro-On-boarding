import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url,Repclient} from '../../Apiurl'; 
import {RepLogoutPopup} from'../../constants/RepConstants';
import {ValidationMsg} from'../../constants/validationmsg';

class Repclienttabledata extends React.Component{
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
	this.submitAnnoucement=this.submitAnnoucement.bind(this);
	}

	componentWillMount(){
		let self=this;
		setTimeout(()=>{
		if(this.props.forUpdateClient!==undefined && this.props.forUpdateClient.length>0){
	       	this.props.forUpdateClient.map((item,index)=>{
				document.querySelectorAll('.clientchecked').forEach((checked,index)=>{
		       		if(checked.value===item){
		       			checked.click();
		       		}
				})
	       	})  
	    }
	  },2000)
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
		let status={"status" : [{ "value":0}] }
		try{
			fetch(Repclient.Repclientsingledelete.url+`${this.state.setSingleDeleteId}?_format=json`,{
					headers: {
	                	"Content-Type" : "application/json",
	                	"X-CSRF-Token" : localStorage.getItem("access-token"),
	                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                },
	                method:Repclient.Repclientsingledelete.method,
	                body:JSON.stringify(status)
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

	submitAnnoucement=(e)=>{
		e.preventDefault();
		console.log(this.props.summernoteData);
		let singlecheckedArray=[];
		document.querySelectorAll(".clientchecked:checked").forEach((item,index)=>{
				singlecheckedArray.push({"target_id":item.value});
		});

		console.log(singlecheckedArray);
		if(this.props.summernoteData!==null){
			let options;
			if(document.getElementById("announcement-image") && document.querySelector("#announcement-image").getAttribute("data-id")!==''){
				options={
				    "title":[{"value":document.querySelector("#Title").value}],
			        "body":[{"value":this.props.summernoteData,
			        		 "format": "basic_html"}],
			        "type":[{"target_id":"article"}],
			        "field_news_feed_button":[{"uri":document.querySelector("#Button_link").value,"title":document.querySelector("#Button_Copy").value ,"options": []}],
			        "field_news_feed_type":[{"target_id":document.querySelector(".announcment-type.active").getAttribute("id")}],
			        "field_image":[{"target_id":document.querySelector("#announcement-image").getAttribute("data-id")}],
			        "field_client":singlecheckedArray
			}
			}else{
				options={
				    "title":[{"value":document.querySelector("#Title").value}],
			        "body":[{"value":this.props.summernoteData,
			        		 "format": "basic_html"}],
			        "type":[{"target_id":"article"}],
			        "field_news_feed_button":[{"uri":document.querySelector("#Button_link").value,"title":document.querySelector("#Button_Copy").value ,"options": []}],
			        "field_news_feed_type":[{"target_id":document.querySelector(".announcment-type.active").getAttribute("id")}],
			        "field_client":singlecheckedArray
				}
			}
			console.log(options);
			fetch(Repclient.Repclientdetailssubmissionproductlist.url,{
		         method:Repclient.Repclientdetailssubmissionproductlist.method,
				headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                body:JSON.stringify(options)
		            }).then(res=>{
		            	return res.json();
		            }).then(data=>{
		            	console.log(data);
		            	//if(data.length){
		            		this.setState({opensubmissionpopup:true,formempty:false})
		            	//}
		            })
		    }else{
		    	this.setState({formempty:true})
		    }
		}


	render(){
		console.log(this.props.forUpdateClient);
		return (
			<div className="clients-table table-outer client-for-only-details">
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
							               <th>Last updated</th>
							            </tr>
							         </thead>
							          <tbody>
							         { this.props.clientdataTable.length > 0 ?
						             	this.props.clientdataTable.map((item,index)=>
							            	<tr key={index}>
							               <td>
							                  <div className="checkbox-cust">
							                     <input type="checkbox" id={"checkbox"+index} className="clientchecked" name="checkbox" onChange={this.singleSelect} defaultValue={item.uid}/>
							                     <label htmlFor={"checkbox"+index}></label>	 
							                  </div>
							                  <div className="name-edit">
							                     <div className="img-c">
							                        <img src={item.user_picture!=='' ? site_url+item.user_picture : require("../../../images/profile-logo-blue.svg")} alt="Profile image" />	 
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
														this.props.historyPush.history.push("/announcement-list");

													})}
													className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
													
												<div>
													<img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
														<h2>Announcement published</h2>
                  										 <p>Your message was submitted successfully</p>
                  										 <div className="btn-block">
																<button className="btn common-btn-blue" onClick={((e)=>{e.preventDefault();this.setState({opensubmissionpopup:false});
														this.props.historyPush.history.push("/announcement-list");

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

export default Repclienttabledata;