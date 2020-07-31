import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
//import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Adminheader from './assets/Adminheader';
import Adminnavbar from './assets/Adminnavbar';
import Adminresourcesfilter from './Admincomponents/Adminresourcesfilter';
import Adminresourcesmobilefilter from './Admincomponents/Adminresourcesmobilefilter';
import Adminresourcetable from './Admincomponents/Adminresourcetable';
import Adminresourceadd from './Admincomponents/Adminresourceadd';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';

class AdminResource extends React.Component {
	constructor(props) {
		super(props);
		this.state={
				resourcesFiltereddata:[],
				viewcaller:false,
				resourcechangeid:null,
				checkcallfrom:null,	
				adminuid:null,
				addStatus:null,
				statusfiltered:false,
				checkifselesctedropdown:false,
				pageTitleChange:false,
		}
		this.resourcesafterFilter=this.resourcesafterFilter.bind(this);
		this.checktheview=this.checktheview.bind(this);
		this.getadmindetail=this.getadmindetail.bind(this);
		this.updatedresourcestatus=this.updatedresourcestatus.bind(this);
		this.checkdropdownselected=this.checkdropdownselected.bind(this);
	}

	componentDidMount(){
      if(localStorage.getItem("access-token")!==null){
      }else{
      	this.props.history.push("/Login");
      }
   }

  	
   resourcesafterFilter=(resourcesfiltereddata)=>{
   		this.setState({resourcesFiltereddata:resourcesfiltereddata})
   }

   checkloadingfordata=(getstatus)=>{
		console.log(getstatus);
   		this.setState({statusfiltered:getstatus})
   }

  checktheview=(addpage,callfrom,viewcall,getChangeid)=>{
  		console.log(addpage);
  		console.log(getChangeid);
  		console.log(callfrom);
  		console.log(viewcall);
   		this.setState({addStatus:addpage,checkcallfrom:callfrom,viewcaller:viewcall,resourcechangeid:getChangeid,pageTitleChange:viewcall});
   }  

  getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0]}.value);
   }

   updatedresourcestatus=(checkupdatedresponse)=>{		
   		this.setState({viewcaller:checkupdatedresponse});
   }

   checkdropdownselected=(checkstatus)=>{
   		console.log(checkstatus);
   		this.setState({checkifselesctedropdown:checkstatus})
   }



	render(){
		return(<div>
				   <section className="main-wrapper">
				      <div className="d-flex flex-wrap main-block">
				         <Adminnavbar/>
				         <div className="d-flex flex-wrap right-content-part">
				            <div className="top-heading">
				               <Adminheader historyPush={this.props} getAdminuid={this.getadmindetail} checkifPagecall={this.state.pageTitleChange}  />
				            </div>
				            <div className="bottom-content-block with-filter">
				               {!this.state.viewcaller ? 
				               		<div className="d-flex flex-wrap admin-resources-main">
				                  <div className="fileter-block d-flex flex-wrap border-bottom">
				                     <Adminresourcesfilter selecteddropdown={this.checkdropdownselected} loaderTrue={this.checkloadingfordata} checktheviewcalled={this.checktheview} checkresourcefilter={this.resourcesafterFilter}/>
					                     <div className="search-sort-block d-flex flex-wrap align-center">
					                 	    <div className="btn-block">
												<button className="common-btn-blue" onClick={((e)=>{e.preventDefault();this.checktheview(true,true,true,JSON.parse(localStorage.getItem("user-type")).uid)})}><span>ADD NEW</span></button>
											</div>
				                 		<Adminresourcesmobilefilter selecteddropdown={this.checkdropdownselected} loaderTrue={this.checkloadingfordata} checktheviewcalled={this.checktheview} checkresourcefilter={this.resourcesafterFilter}/>
				                     </div>

				                  </div>
				                  <Adminresourcetable checkifselected={this.state.checkifselesctedropdown} getifilteredstatus={this.state.statusfiltered} getdatafromfilter={this.state.resourcesFiltereddata} checktheviewcalled={this.checktheview} />
				               		</div>
								:
								<Adminresourceadd sendresourceId={this.state.resourcechangeid} readmode={this.state.checkcallfrom} addstatus={this.state.addStatus} 
									updatedTheresourceresponse={this.updatedresourcestatus}
								  />					               
				               }
				            </div>
				         </div>
				      </div>
				   </section>
			  </div>)
	}
}
		
export default AdminResource;			   