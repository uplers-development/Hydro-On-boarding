import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Admin} from '../../Apiurl'; 
import {cosmaticAsset} from '../../constants/common'

let newrepdata,noDatacall;
class Adminreptable extends React.Component{
	constructor(props){
		super(props)
		this.state={
			adminreptabledata:[],
			loader:true,
			noDatacall:true,
			openDeletepopup:false,
			setSingleDeleteId:null,
		}
		this.singleSelect=this.singleSelect.bind(this);
      	this.selectAllcheckbox=this.selectAllcheckbox.bind(this);
	}

	componentDidMount(){
		this.get_admin_rep_table_data();
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
		var checkboxes = document.querySelectorAll('.repchecked');
		var ele=document.querySelector(".repparent");
		var checkedCheckboxes=document.querySelectorAll('.repchecked:checked').length;
		console.log(checkedCheckboxes);
		if(e.target.checked===false){
			document.querySelector(".repparent").checked=false
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

	delete_single_resource=(e)=>{
		e.preventDefault();
		fetch(Admin.adminrepdeletesingle.url+`${this.state.setSingleDeleteId}?_format=json`,{
	   	 		 headers:{
	                  "Content-Type" : "application/json",
	                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
	            },
	            method:Admin.adminrepdeletesingle.method,
		   	 }).then(data=>{
		   	 		console.log(data);
		   	 		if(data.status===204){
		   	 			this.setState({openDeletepopup:false,isDeleted:true})
		   	 			this.get_resource_table();
		   	 		}
		   	 });
	}	

	get_admin_rep_table_data=()=>{
		let status;
		console.log(this.props.getsorteddata);
		if(this.props.getsorteddata.length<=0){
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
					this.setState({loader:false,noDatacall:false,adminreptabledata:data});
				}else{
					this.setState({loader:false,noDatacall:true});
				}
			})
		}catch(err){
			console.log(err);
			this.setState({loader:false});
		}
	}else{
		 this.setState({loader:false,adminreptabledata:this.props.getsorteddata});

	}

	
}
	
	
	render(){
		let checkloading=this.props.getsorteddata ? this.state.loader : !this.state.loader;
	 	if(document.getElementById("admin-rep-search") && document.querySelector("#admin-rep-search").value!==''){
	 		newrepdata=this.props.filteredserachedstatus ? this.props.filterbyserach : ''; 
	        noDatacall=this.props.filteredserachedstatus ? !this.state.noDatacall :this.state.noDatacall;
	 	}else{
		 	if(this.props.checkifselected && this.props.getsorteddata.length > 0){
		        noDatacall=!this.state.noDatacall;
		        newrepdata=this.props.getsorteddata;
		      }
		      else if(this.props.checkifselected && this.props.getsorteddata.length <= 0){
		        newrepdata='';
		        noDatacall=this.state.noDatacall;
		      }
		      else if(!this.props.checkifselected){
		        newrepdata=this.state.adminreptabledata;
		        noDatacall=!this.state.noDatacall;
		      }
		}

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
                                    <input type="checkbox" id="chheckbox" className="repparent" onChange={this.selectAllcheckbox}/>
                                    <label htmlFor="chheckbox"></label>	 
                                 </div>
                                 <span>Name</span>
                              </th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Last updatetd</th>
                           </tr>
                        </thead>
                        <tbody>
                         {noDatacall ?
					       newrepdata.map((item,index)=>
                           <tr key={index}>
                              <td>
                                 <div className="checkbox-cust">
                                    <input type="checkbox" id={"checkbox"+index} className="repchecked" name="checkbox" onChange={this.singleSelect} defaultValue={item.uid} />
                                    <label htmlFor={"checkbox"+index}></label>	 
                                 </div>
                                 <div className="name-edit">
                                    <div className="img-c">
                                       <img src={item.user_picture!=='' ? site_url+item.user_picture : require("../../../images/profile-logo-blue.svg")} alt="Prfile image" />	 
                                    </div>
                                    <div className="right-detail">
                                       <h3>{item.name_1}</h3>
                                       <div className="action d-flex flex-wrap">
                                          <Link to={""} onClick={((e)=>{e.preventDefault();this.props.checktheviewcalled(false,false,true,item.uid)})} title="Edit">Edit</Link>
                                          <Link to={""} onClick={((e)=>
							                           	{		e.preventDefault();
							                           			this.setState({openDeletepopup:true,setSingleDeleteId:item.uid})}
							                           	)} title="Delete">
                                          Delete</Link>	 
                                          <Link to={""} onClick={((e)=>{e.preventDefault();this.props.checktheviewcalled(false,false,true,item.uid)})} title="View">View</Link>  
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
                  {this.state.openDeletepopup ? 

				   		<div id="modal" className="modal-container">
												<div className="modal d-flex flex-wrap align-center justify-center">
													<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openDeletepopup:false})})}
													className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
													
												<div>
													<img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
														<p>Are you sure you want to delete records?</p>

													<div className="btn-blok">
														<button onClick={((e)=>{e.preventDefault();this.setState({openDeletepopup:false})})} className="btn common-btn-blue"><span>CANCEL</span></button>
														<button className="btn common-btn-blue" onClick={this.delete_single_resource}><span>YES</span></button>	
													</div>
													
												</div>
												</div>
											</div>
								: <></>
				   }
           	  </div>
			)
	}
}

export default Adminreptable;