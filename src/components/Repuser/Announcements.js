import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,Repclient} from '../Apiurl'; 
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
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
			let menulist={
			menu:"main-navigation-rep"
		};
		let status;
		fetch(Apiurl.menulisting.url,{
		    headers:{
		            "Content-Type" : "application/json",
		            "X-CSRF-Token" : localStorage.getItem("access-token"),
		            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
		    },
		    method:Apiurl.menulisting.method,
		    body:JSON.stringify(menulist)
  		}).then(res=>{status=res.status;
  					  if(status===200){
  							return res.json()
  				     	}  		
  		}).then(data=>{if(status!==200){
  			if(document.cookie && document.cookie.split('; ').find(row => row.startsWith('visits'))){
    				let value;
	    			var errortimes =document.cookie.split('; ').find(row => row.startsWith('visits')).split('=')[1];;
	    			if (errortimes != "") {
	    				value = parseInt(errortimes)+1;
	    				var date = new Date();
				        date.setTime(date.getTime()+(24*60*60*1000));
				        var expires = "; expires="+date.toGMTString();
	    				document.cookie = "visits="+value+";"+expires+"; path=/";
	    			}
    			}else{
    				var date = new Date();
			        date.setTime(date.getTime()+(24*60*60*1000));
			        var expires = "; expires="+date.toGMTString();
    				document.cookie = "visits=1;"+expires+"; path=/";
    			}
  			localStorage.clear();
    		this.props.history.push("/")
    	}else{
    		this.setState({menulisting:data})
    	}
    });
      if(localStorage.getItem("access-token")!==null){
         this.Rep_nav_menu();
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

	returnSummerNoteData=(returnHtml)=>{
		console.log(returnHtml);
		this.setState({summernoteData:returnHtml})
	}

	getSearchedItems =(getSearchedItem) =>{

		console.log(getSearchedItem);
		document.querySelector("#myInput").value==='' ? this.client_data_Table() : this.setState({repclientdata:getSearchedItem});
	}

   client_data_Table=()=>{
		fetch(Repclient.RepAnnouncementclienttable.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
		}).then(res=>res.json()).then(data=>this.setState({repclientdata:data,loader:false}));

	}


   Rep_nav_menu=()=>{
     let menulist={
			menu:"main-navigation-rep"
		};
		let status;
		fetch(Apiurl.menulisting.url,{
		    headers:{
		            "Content-Type" : "application/json",
		            "X-CSRF-Token" : localStorage.getItem("access-token"),
		            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
		    },
		    method:Apiurl.menulisting.method,
		    body:JSON.stringify(menulist)
  		}).then(res=>{status=res.status;
  			if(status===200){
  				return res.json()
  			}
  		}).then(data=>{if(status!==200){
  			localStorage.clear();
    		this.props.history.push("/")
    	}else{
    		this.setState({menulisting:data})
    	}
    });
   }

	get_announcements_list = () =>{
      fetch(Repclient.RepAnnouncementclientnewsfeeds.url,{
         /* headers:{
                  "Content-Type" : "application/json",
                  "X-CSRF-Token" : localStorage.getItem("access-token"),
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
          },*/
          method:Repclient.RepAnnouncementclientnewsfeeds.method,
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
				         <Repnav repmenulisting={this.state.menulisting}/>
				         <div className="d-flex flex-wrap right-content-part">
				            <div className="top-heading">
				               <Repheader menulisting={this.state.menulisting} historyPush={this.props} sendtheDefaultAnnouncement={this.state.viewpagecall} returntothedefault={this.change_to_defaultView}/>
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
					                     <Repannouncementadd addAnnouncementDetails={this.state.announcementDetails} getsummernote={this.returnSummerNoteData}/>
					                     <div className="pro-title d-flex flex-wrap align-center">
					                        <div className="name-of-heading d-flex flex-wrap align-center">
					                           <img src={require("../../images/clients_ic_blue.svg")} alt="Clients"/>
					                           <h3>Clients</h3>
					                        </div>
					                        <Repannouncementmobile checkFiltereddata={this.filtereddata}/>
					                     </div>
					                     <Repannouncementsfilter checkFiltereddata={this.filtereddata}/>
					                     <Repclienttabledata announcementPublish={this.state.announcement} clientdataTable={this.state.repclientdata} checkViewpageCall={this.check_view_page_call} recordDelete={this.checkAnyDelete} noDatacall={this.state.noDataforTable}  summernoteData={this.state.summernoteData} historyPush={this.props} />
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
		
export default Announcements;			   