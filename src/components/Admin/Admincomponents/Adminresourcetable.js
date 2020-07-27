import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from '../../constants/common'

class Adminresourcetable extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	adminresourcetabledata:[],
      	loader:true,
      	noDatacall:true,
      	setSingleDeleteId:null,
      	checkdraftStatus:false,
      	openDraftPopup:false,
      	openDeletepopup:false,
      	draftstatus:''
      }
	  console.log();
      this.singleSelect=this.singleSelect.bind(this);
      this.selectAllcheckbox=this.selectAllcheckbox.bind(this);
   }

   componentDidMount(){
   		this.get_resource_table();
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
		var checkboxes = document.querySelectorAll('.resourceschecked');
		var ele=document.querySelector(".resourcesparentcheck");
		var checkedCheckboxes=document.querySelectorAll('.resourceschecked:checked').length;
		console.log(checkedCheckboxes);
		if(e.target.checked===false){
			document.querySelector(".resourcesparentcheck").checked=false
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
	fetch(Admin.adminresourcedelete.url+`${this.state.setSingleDeleteId}?_format=json`,{
   	 		 headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminresourcedelete.method,
	   	 }).then(data=>{
	   	 		console.log(data);
	   	 		if(data.status===204){
	   	 			this.setState({openDeletepopup:false})
	   	 			this.get_resource_table();
	   	 		}
	   	 });
}	

   get_resource_table=()=>{
   	if(this.props.getdatafromfilter.length <= 0 ){
   		fetch(Admin.adminresourcelisting.url,{
   	 		 headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminresourcelisting.method,
	   	 }).then(res=>{return res.json()}).then(data=>{
	   	 		if(data.length>0){
	   	 			this.setState({noDatacall:false,adminresourcetabledata:data,loader:false})
	   	 		}else{
	   	 			this.setState({loader:false,noDatacall:true})
	   	 		}
	   	 });
   	}else{
   		this.setState({loader:false,adminresourcetabledata:this.props.getdatafromfilter});
   	}
   }

   draft_resource=(e,draftid)=>{
   		e.preventDefault();
   		let target_=e.target;
   		let target_value=e.target.textContent==="Draft" ? false : true;
   		console.log(target_value);
   		let options={
   			"type":[{target_id:"resources"}],
   			"status": [{value: target_value}]
   		};
   		console.log(options);
   		fetch(Admin.adminresourcedraft.url+`${draftid}?_format=json`,{
   	 		 headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminresourcedraft.method,
            body:JSON.stringify(options)
	   	 }).then(data=>{
	   	 	console.log(data);
	   	 	if(data.status===204){
	   	 		this.setState({openDraftPopup:true});
	   	 		target_.textContent='Published';
	   	 		target_.setAttribute("title","Published");
	   	 	}
	   	 });
   }

   render(){
   		let newresourcedata=this.props.getdatafromfilter.length > 0 ? this.props.getdatafromfilter :this.state.adminresourcetabledata;	
   		return(
   				<div className="resources-table table-outer">
				   <div className="table-responsive">
				      {/*<!--Table Start-->*/}
				      {!this.state.loader ? 
					      <table className="table table-striped">
					         <thead>
					            <tr>
					               <th>
					                  <div className="checkbox-cust">
					                     <input type="checkbox" className="resourcesparentcheck" id="checkbox" onChange={this.selectAllcheckbox}/>
					                     <label htmlFor="checkbox"></label>	 
					                  </div>
					                  <span>Title</span>
					               </th>
					               <th>Author</th>
					               <th>Data</th>
					               <th>Type</th>
					               <th>Last Modified</th>
					            </tr>
					         </thead>
					         <tbody>
					         {!this.state.noDatacall ?
					         	newresourcedata.map((item,index)=>
					            <tr key={index}>
					               <td>
					                  <div className="checkbox-cust">
					                     <input type="checkbox" id={"checkbox"+index} className="resourceschecked" name="checkbox" onChange={this.singleSelect} defaultValue={item.nid}/>
					                     <label htmlFor={"checkbox"+index}></label>	  
					                  </div>
					                  <div className="name-edit">
					                     <div className="right-detail">
					                        <h3>{item.title}</h3>
					                        <Link to={""} onClick={((e)=>this.draft_resource(e,item.nid))} title={item.status==="true" ? "Published" : "Draft"}>{item.status==="true" ? "Published" : "Draft"}</Link>
					                        <div className="action d-flex flex-wrap">
					                           <Link to={""} onClick={((e)=>{e.preventDefault();this.props.checktheviewcalled(false,true,item.nid)})} title="Edit">Edit</Link>	 
					                           <Link to={""} onClick={((e)=>
							                           	{		e.preventDefault();
							                           			this.setState({openDeletepopup:true,setSingleDeleteId:item.nid})}
							                           	)} title="Delete">Delete</Link>	 
					                           <Link to={""} onClick={((e)=>{e.preventDefault();this.props.checktheviewcalled(true,true,item.nid)})} title="View">View</Link>	 
					                        </div>
					                     </div>
					                  </div>
					               </td>
					               <td>{item.uid}</td>
					               <td><span>Last Modified</span><span>{item.changed}</span></td>
					               <td>{item.field_resource_type}</td>
					               <td>{item.changed_1}</td>
					            </tr>
					          )
					          :
					          <>
					          	{cosmaticAsset.cosmatic.default.noDatafound}
					          </>
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
				   {this.state.openDraftPopup ? 

				   		<div id="modal" className="modal-container">
												<div className="modal d-flex flex-wrap align-center justify-center">
													<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openDraftPopup:false});
													})}
													className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
													
												<div>
													<img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
														<h2>Resource draft published.</h2>
												</div>
												</div>
											</div>
								: <></>
				   }

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

export default Adminresourcetable;
