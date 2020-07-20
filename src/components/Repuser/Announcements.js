import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import hydroImage from '../../images/hydro-biofilter-product.jpg';
import Repnav from './assets/Repnav'
import Repheader from './assets/Repheader'
import Repannouncementadd from './repclientcomponents/Repannouncementadd'
import Repclienttabledata from './repclientcomponents/Repclienttabledata'
import Repannouncementsfilter from './repclientcomponents/Repannouncementsfilter'
import Repannouncementmobile from './repclientcomponents/Repannouncementmobile'
import Repclientdetails from './repclientcomponents/Repclientdetails';
import Repproductselection from './repclientcomponents/Repproductselection';
import Repcontractdetails from './repclientcomponents/Repcontractdetails';
import {cosmaticAsset} from'../constants/common';


class Announcements extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			loader:true,
			menulisting:[],
			repinfo:null,
			announcementDetails:[],
			repclientdata:[],
			announcement:true,
			updatedRepclientId:null,
			viewpagecalled:false,
			noDataforTable:false,
		}
		this.filtereddata=this.filtereddata.bind(this);
	}

	componentWillMount(){
      if(localStorage.getItem("access-token")!==null){
         this.Rep_nav_menu();
         this.GetProfile();
         this.get_announcements_list();
         this.client_data_Table();
      }else{
         this.props.history.push('/Login')
      }
      
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

	getSearchedItems =(getSearchedItem) =>{

		console.log(getSearchedItem);
		document.querySelector("#myInput").value==='' ? this.client_data_Table() : this.setState({repclientdata:getSearchedItem});
	}

   client_data_Table=()=>{
		fetch(`https://staging.project-progress.net/projects/hydro/jsonapi/announcement_clients?_format=json`,{
			headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
		}).then(res=>res.json()).then(data=>this.setState({repclientdata:data,loader:false}));

	}


   Rep_nav_menu=()=>{
      let menulist={
         menu:"main-navigation-rep"
      }
      fetch(`https://staging.project-progress.net/projects/hydro/json-api/menu_list.json`,{
          headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
          },
          method:"POST",
          body:JSON.stringify(menulist)
      }).then(res=>res.json()).then(data=>this.setState({menulisting:data}));
   }


	 GetProfile=()=>{
	      try{
	         fetch(Apiurl.GetProfile.url,{
	               headers: {
	                     "Content-Type" : "application/json",
	                     "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
	                   },
	                   method:Apiurl.GetProfile.method,
	         }).then(res=>{
	            return res.json();
	         }).then(data=>{
	            console.log(data);
	            this.setState({repinfo:data})
	         })
	      }catch(err){
	         console.log(err);
	      }
	   }

	get_announcements_list = () =>{
      fetch(`http://staging.project-progress.net/projects/hydro/json-api/news_feed_type.json`,{
         /* headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
          },*/
          method:"GET",
      }).then(res=>res.json()).then(data=>this.setState({announcementDetails:data}));

	}
	check_view_page_call=(viewpagecalled,uid)=>{
		console.log(uid);
		this.setState({updatedRepclientId : uid,viewpagecall : viewpagecalled});
	}


	render(){
		return(<div>
				   <section className="main-wrapper">
				      <div className="d-flex flex-wrap main-block">
				         <Repnav repmenulisting={this.state.menulisting}/>
				         <div className="d-flex flex-wrap right-content-part">
				            <div className="top-heading">
				               <Repheader menulisting={this.state.menulisting} repuserinfo={this.state.repinfo}/>
				            </div>
				            {!this.state.loader ?
			            	<>
		            		{!this.state.viewpagecall ?
					            <div className="bottom-content-block">
					               <div className="d-flex flex-wrap announcements-main">
					                  <div className="fileter-block details-head-block d-flex flex-wrap border-bottom">
					                     <h3>Add an announcement</h3>
					                     <h4>Add an announcement</h4>
					                  </div>
					                  <div className="container">
					                     <Repannouncementadd addAnnouncementDetails={this.state.announcementDetails}/>
					                     <div className="pro-title d-flex flex-wrap align-center">
					                        <div className="name-of-heading d-flex flex-wrap align-center">
					                           <img src={require("../../images/clients_ic_blue.svg")} alt="Clients"/>
					                           <h3>Clients</h3>
					                        </div>
					                        <Repannouncementmobile checkFiltereddata={this.filtereddata}/>
					                     </div>
					                     <Repannouncementsfilter checkFiltereddata={this.filtereddata}/>
					                     <Repclienttabledata announcementPublish={this.state.announcement} clientdataTable={this.state.repclientdata} checkViewpageCall={this.check_view_page_call} recordDelete={this.checkAnyDelete} noDatacall={this.state.noDataforTable}/>
					                  </div>
					               </div>
					            </div>
					            :
					             <div className="bottom-content-block">
									{/*<!-Client details main start-->*/}
									<div className="d-flex flex-wrap clients-detils-main">				
										<Repclientdetails repclientuid={this.state.updatedRepclientId}/>
										<div className="container">
											<Repproductselection historyPush={this.props} repclientuid={this.state.updatedRepclientId}/>
											<Repcontractdetails  historyPush={this.props} repclientuid={this.state.updatedRepclientId}/>
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
		
export default Announcements;			   