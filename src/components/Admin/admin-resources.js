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
		}
		this.resourcesafterFilter=this.resourcesafterFilter.bind(this);
		this.checktheview=this.checktheview.bind(this);
		this.getadmindetail=this.getadmindetail.bind(this);
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

  checktheview=(addpage,callfrom,viewcall,getChangeid)=>{
  		console.log(addpage);
  		console.log(getChangeid);
  		console.log(callfrom);
  		console.log(viewcall);
   		this.setState({addStatus:addpage,checkcallfrom:callfrom,viewcaller:viewcall,resourcechangeid:getChangeid});
   }  

  getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0]}.value);
   }



	render(){
		return(<div>
				   <section className="main-wrapper">
				      <div className="d-flex flex-wrap main-block">
				         <Adminnavbar/>
				         <div className="d-flex flex-wrap right-content-part">
				            <div className="top-heading">
				               <Adminheader historyPush={this.props} getAdminuid={this.getadmindetail}  />
				            </div>
				            <div className="bottom-content-block with-filter">
				               {!this.state.viewcaller ? 
				               		<div className="d-flex flex-wrap admin-resources-main">
				                  <div className="fileter-block d-flex flex-wrap border-bottom">
				                     <Adminresourcesfilter checktheviewcalled={this.checktheview} checkresourcefilter={this.resourcesafterFilter}/>
				                     <div className="search-sort-block d-flex flex-wrap align-center">
				                 		<Adminresourcesmobilefilter/>
				                     </div>

				                  </div>
				                  <Adminresourcetable getdatafromfilter={this.state.resourcesFiltereddata} checktheviewcalled={this.checktheview} />
				               		</div>
								:
								<Adminresourceadd sendresourceId={this.state.resourcechangeid} readmode={this.state.checkcallfrom} addstatus={this.state.addStatus}  />					               
				               }
				            </div>
				         </div>
				      </div>
				   </section>
			  </div>)
	}
}
		
export default AdminResource;			   