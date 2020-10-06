import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../Apiurl'; 
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import ReactHtmlParser from 'react-html-parser';
import hydroImage from '../../images/hydro-biofilter-product.jpg';
import Adminheader from './assets/Adminheader';
import Adminnavbar from './assets/Adminnavbar';
import Adminannouncementadd from './Admincomponents/Adminannouncementadd'
import Adminclienttabledata from './Admincomponents/Adminclienttabledata'
import Adminannouncementsfilter from './Admincomponents/Adminannouncementsfilter'
import Adminannouncementmobile from './Admincomponents/Adminannouncementmobile'
import Adminclientdetails from './Admincomponents/Adminclientdetails';
import Adminproductselection from './Admincomponents/Adminproductselection';
import Admincontractdetails from './Admincomponents/Admincontractdetails';
import {cosmaticAsset} from'../constants/common';


class Adminannouncement extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			loader:true,
			menulisting:[],
			announcementDetails:[],
			repclientdata:[],
			announcement:true,
			updatedRepclientId:this.props.location.state!==undefined ? this.props.location.state.targetSendid : null,
			viewpagecalled:false,
			viewpagecall:this.props.location.state!==undefined  ? this.props.location.state.contractsubmission:false,
			noDataforTable:false,
			summernoteData:null
		}
		this.filtereddata=this.filtereddata.bind(this);
		this.returnSummerNoteData=this.returnSummerNoteData.bind(this);
		this.change_to_defaultView=this.change_to_defaultView.bind(this);
	}

	componentWillMount(){
      if(localStorage.getItem("access-token")!==null){
         this.get_announcements_list();
         this.client_data_Table();
      }else{
         this.props.history.push('/Login')
      }
      
   }

   getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0].value,loader:false});
    }

   
   checkAnyDelete=(recordDelete)=>{
		if(recordDelete) {this.client_data_Table()} 
	}

	filtereddata=(filtersuccess)=>{
		console.log(filtersuccess);
		if(filtersuccess.length>0){
			this.setState({noDataforTable:false,repclientdata:filtersuccess});
		}else{
			this.setState({noDataforTable:true})
		}
	}

	returnSummerNoteData=(returnHtml)=>{
		console.log(returnHtml);
		this.setState({summernoteData:returnHtml})
	}

	getSearchedItems =(getSearchedItem) =>{

		console.log(getSearchedItem);
		document.querySelector("#myInput").value==='' ? this.client_data_Table() : this.setState({repclientdata:getSearchedItem});
	}

   client_data_Table=()=>{
		fetch(Admin.AdminAnnouncementclienttable.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
		}).then(res=>res.json()).then(data=>this.setState({repclientdata:data,loader:false}));

	}



	get_announcements_list = () =>{
      fetch(Admin.AdminAnnouncementclientnewsfeeds.url,{
          method:Admin.AdminAnnouncementclientnewsfeeds.method,
      }).then(res=>res.json()).then(data=>this.setState({announcementDetails:data}));

	}

	check_view_page_call=(viewpagecalled,uid)=>{
		console.log(uid);
		console.log(viewpagecalled);
		this.setState({updatedRepclientId : uid,viewpagecall : viewpagecalled});
	}

	change_to_defaultView=(callthedefaultview)=>{
		this.setState({viewpagecall:callthedefaultview})
	}


	render(){
		return(<div>
				   <section className="main-wrapper">
				      <div className="d-flex flex-wrap main-block">
				         <Adminnavbar historyPush={this.props}/>
				         <div className="d-flex flex-wrap right-content-part">
				            <div className="top-heading">
				               <Adminheader historyPush={this.props} getAdminuid={this.getadmindetail} checkifPagecall={this.state.pageTitleChange} changetodefaultView={this.changetheview}/>
				            </div>
				            {!this.state.loader ?
			            	<>
		            		{!this.state.viewpagecall ?
					            <div className="bottom-content-block">
					               <div className="d-flex flex-wrap announcements-main">
					                  <div className="fileter-block details-head-block d-flex flex-wrap border-bottom">
					                     <h3>Add an announcement</h3>
					                  </div>
					                  <div className="container">
					                     <Adminannouncementadd addAnnouncementDetails={this.state.announcementDetails} getsummernote={this.returnSummerNoteData}/>
					                     <div className="pro-title d-flex flex-wrap align-center">
					                        <div className="name-of-heading d-flex flex-wrap align-center">
					                           <img src={require("../../images/clients_ic_blue.svg")} alt="Clients"/>
					                           <h3>Clients</h3>
					                        </div>
					                        <Adminannouncementmobile checkFiltereddata={this.filtereddata}/>
					                     </div>
				                     	<Adminannouncementsfilter checkFiltereddata={this.filtereddata}/>

					                     <Adminclienttabledata announcementPublish={this.state.announcement} clientdataTable={this.state.repclientdata} checkViewpageCall={this.check_view_page_call} recordDelete={this.checkAnyDelete} noDatacall={this.state.noDataforTable}  summernoteData={this.state.summernoteData} historyPush={this.props} />
					                  </div>
					               </div>
					            </div>
					            :
					             <div className="bottom-content-block">
									{/*<!-Client details main start-->*/}
									<div className="d-flex flex-wrap clients-detils-main">				
										<Adminclientdetails repclientuid={this.state.updatedRepclientId}/>
										<div className="container">
											<Adminproductselection historyPush={this.props} repclientuid={this.state.updatedRepclientId}/>
											<Admincontractdetails  historyPush={this.props} repclientuid={this.state.updatedRepclientId}/>
											<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({viewpagecall:false})})} className="back-dashboard btn common-btn-blue"><span>Back</span></Link>
										</div>
									</div>
								</div>
				        	}
			         		</>
			         		:
			         		<>
			         			{cosmaticAsset.cosmatic.default.loader}
			         		</>}
				         </div>
				      </div>
				   </section>
				</div>)
	}
}
		
export default Adminannouncement;			   