import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../Apiurl'; 
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import ReactHtmlParser from 'react-html-parser';
import hydroImage from '../../images/hydro-biofilter-product.jpg';
import Adminheader from './assets/Adminheader'
import Adminnavbar from './assets/Adminnavbar'
import AdminAnnouncementTable from './Admincomponents/AdminAnnouncementTable';
import Adminannouncementadd from './Admincomponents/Adminannouncementadd';
import {cosmaticAsset} from'../constants/common';


class Adminannouncementlist extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			loader:true,
			menulisting:[],
			announcementDetails:[],
			announcementtablelist:[],
			announcement:true,
			EditAnnouncementDetails:[],
			updatedAnnouncementId:this.props.location.state!==undefined ? this.props.location.state.targetSendid : null,
			viewpagecalled:false,
			viewpagecall:this.props.location.state!==undefined  ? this.props.location.state.contractsubmission:false,
			summernoteData:null
		}
		
		this.returnSummerNoteData=this.returnSummerNoteData.bind(this);
		this.returnback=this.returnback.bind(this);
		this.change_to_defaultView=this.change_to_defaultView.bind(this);
	}

	componentDidMount(){
      if(localStorage.getItem("access-token")!==null){
         this.get_announcements_list();
         this.announce_data_table();
      }else{
         this.props.history.push('/Login')
      }
      
   }
   	
   	
    announce_data_table=()=>{
		fetch(Admin.get_all_announcement.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
		}).then(res=>res.json()).then(data=>
		{
			console.log(data)
			this.setState({announcementTablelist:data,loader:false})
			console.log(this.state.announcementTablelist,"###################################################################################################")

	});
	}	
   
   	 getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0].value,loader:false});
    }

	changetheviewtodefault=(viewofpagecall)=>{
		this.setState({viewpagecall : viewofpagecall , pageTitleChange:viewofpagecall})
		console.log(this.state.pageTitleChange);
	}


   checkAnyDelete=(recordDelete)=>{
		if(recordDelete) {this.announce_data_table()} 
	}

	returnSummerNoteData=(returnHtml)=>{
		console.log(returnHtml);
		this.setState({summernoteData:returnHtml})
	}

	/*getSearchedItems =(getSearchedItem) =>{

		console.log(getSearchedItem);
		document.querySelector("#myInput").value==='' ? this.announce_data_table() : this.setState({announcementtablelist:getSearchedItem});
	}*/

  



	get_announcements_list = () =>{
      fetch(Admin.AdminAnnouncementclientnewsfeeds.url,{
          method:Admin.AdminAnnouncementclientnewsfeeds.method,
      }).then(res=>res.json()).then(data=>this.setState({announcementDetails:data}));

	}
	check_view_page_call=(viewpagecalled,announcementId)=>{
		console.log(announcementId);
		console.log(viewpagecalled);
		this.getAnnouncementEditDetails(announcementId)
		this.setState({loader:true,updatedAnnouncementId : announcementId,viewpagecall : viewpagecalled});
	}

	returnback=(viewpagecalled)=>{
		this.setState({viewpagecall:viewpagecalled});
		this.announce_data_table()
	}

	getAnnouncementEditDetails=(idforupdate)=>{
		let status;
		let nid={
			"nid":idforupdate
		};

		try{
			fetch(Admin.get_perticular_annoucement_detail.url,{
				headers:{
		            "Content-Type" : "application/json",
		            "X-CSRF-Token" : localStorage.getItem("access-token"),
		            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
		    	},
				method:Admin.get_perticular_annoucement_detail.method,
				body:JSON.stringify(nid)
			}).then((res)=>{
				return res.json();
			})
			.then((data)=>{
				console.log(data);
				this.setState({EditAnnouncementDetails:data,loader:false})
			})
		}catch(error){
			console.log(error);
		}
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
					                  <div className="container">
					                     {!this.state.loader && <AdminAnnouncementTable  announcementList={this.state.announcementTablelist} checkViewpageCall={this.check_view_page_call} recordDelete={this.checkAnyDelete}/>}	
					                  </div>
					               </div>
					            </div>
					            :
					           <div className="bottom-content-block">
					               <div className="d-flex flex-wrap announcements-main">
					                  <div className="fileter-block details-head-block d-flex flex-wrap border-bottom">
					                     <h3>Edit an announcement</h3>
					                  </div>
					                  <div className="container">		
										<Adminannouncementadd addAnnouncementDetails={this.state.announcementDetails} getsummernote={this.returnSummerNoteData} getAnnouncementDetailsforEdit={this.state.EditAnnouncementDetails} getAnnouncementId={this.state.updatedAnnouncementId} checkCallback={this.returnback}/>
											 
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
		
export default Adminannouncementlist;			   