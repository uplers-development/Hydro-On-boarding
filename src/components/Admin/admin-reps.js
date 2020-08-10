import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Adminnavbar from './assets/Adminnavbar'
import Adminheader from './assets/Adminheader'
import Adminrepbulkdelete from './Admincomponents/Adminrepbulkdelete'
import Adminrepsearch from './Admincomponents/Adminrepsearch'
import Adminrepmobilefilter from './Admincomponents/Adminrepmobilefilter'
import Adminrepsort from './Admincomponents/Adminrepsort'
import Adminreptable from './Admincomponents/Adminreptable'
import Adminaddrep from './Admincomponents/Adminaddrep'
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';

class AdminRep extends React.Component {
	constructor(props) {
		super(props);
		this.state={	
			sortedrepdata:[],
			checkifselesctedropdown:false,
			statusfiltered:false,
			getSearchedvalue:'',
			searchedstatus:null,
			addStatus:null,
			checkcallfrom:null,
			viewcaller:false,
			repchangedid:null,
			pageTitleChange:false,
			mulitdeleteSuccess:false,
		}
		this.getadmindetail=this.getadmindetail.bind(this);
		this.checkloadingfordata=this.checkloadingfordata.bind(this);
		this.getSortedfilterdata=this.getSortedfilterdata.bind(this);
		this.returnserachedItem=this.returnserachedItem.bind(this);
		this.updatedrepstatus=this.updatedrepstatus.bind(this);
	}

	checkloadingfordata=(getstatus)=>{
		console.log(getstatus);
   		this.setState({statusfiltered:getstatus})
   }

	getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0].value});
   	}	

   	getSortedfilterdata=(sortedrepdata)=>{
   		console.log(sortedrepdata);
   		this.setState({sortedrepdata:sortedrepdata});
   	}

   	checkdropdownselected=(checkstatus)=>{
   		console.log(checkstatus);
   		this.setState({checkifselesctedropdown:checkstatus})
   }
   returnserachedItem=(getdatastatus,getsearchedvalue)=>{
   	console.log(getsearchedvalue);
   	this.setState({searchedstatus:getdatastatus,getSearchedvalue:getsearchedvalue});
   }

    checktheview=(addpage,callfrom,viewcall,getChangeid)=>{
  		console.log(addpage);
  		console.log(getChangeid);
  		console.log(callfrom);
  		console.log(viewcall);
   		this.setState({addStatus:addpage,checkcallfrom:callfrom,viewcaller:viewcall,repchangedid:getChangeid,pageTitleChange:viewcall});
   }  

   updatedrepstatus=(checkupdatedresponse)=>{		
   		this.setState({viewcaller:checkupdatedresponse});
   }

	recordDelete=(returnrecords,returnsrecords)=>{
		this.setState({mulitdeleteSuccess:returnrecords,bulkdeleteupdate:returnsrecords})
	}

	render(){
	
		return(<div>
			   		<section className="main-wrapper">
						   <div className="d-flex flex-wrap main-block">
						      <Adminnavbar historyPush={this.props}/>
						      <div className="d-flex flex-wrap right-content-part">
						         <div className="top-heading">
						            <Adminheader historyPush={this.props} getAdminuid={this.getadmindetail} checkifPagecall={this.state.pageTitleChange} checkveiworaddclass={this.state.checkcallfrom}/>
						         </div>
						         <div className="bottom-content-block with-filter reps-filter add">
						         {!this.state.viewcaller ? 
						            <div className="d-flex flex-wrap reps-main-block">
						               <div className="fileter-block d-flex flex-wrap border-bottom">
						                 <Adminrepbulkdelete recordDelete={this.recordDelete}/>
						                  <div className="btn-block">
						                     <button className="common-btn-blue" onClick={((e)=>{e.preventDefault();this.checktheview(true,true,true,JSON.parse(localStorage.getItem("user-type")).uid)})}><span>Add Rep</span></button>
						                  </div>
						                  <div className="search-sort-block d-flex flex-wrap align-center">
						                    	<Adminrepsearch getSearchedvalue={this.returnserachedItem}/>
						                    	<Adminrepmobilefilter selecteddropdown={this.checkdropdownselected} loaderTrue={this.checkloadingfordata} sortedfilterdata={this.getSortedfilterdata}/>
						                   		<Adminrepsort selecteddropdown={this.checkdropdownselected} loaderTrue={this.checkloadingfordata} sortedfilterdata={this.getSortedfilterdata}/>
						                  </div>
						               </div>
						             	<Adminreptable filteredserachedstatus={this.state.searchedstatus} filterbyserach={this.state.getSearchedvalue} checkifselected={this.state.checkifselesctedropdown} getsorteddata={this.state.sortedrepdata} checktheviewcalled={this.checktheview} getrefreshtableafterdelete={this.state.mulitdeleteSuccess} getupdateAfterBulkDelete={this.state.bulkdeleteupdate}/>
						            </div>
						           :
						           <div className="d-flex flex-wrap add-rep-main">
						           		<Adminaddrep sendrepId={this.state.repchangedid} readmode={this.state.checkcallfrom} addstatus={this.state.addStatus} updatedThereresponse={this.updatedrepstatus}/>
						           </div>
						       	 }
						         </div>
						      </div>
						   </div>
					</section>
				</div>
			   )
	}
}
		
export default AdminRep;			   