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
import RepAnnouncementTable from './repclientcomponents/RepAnnouncementTable'
import Repannouncementadd from './repclientcomponents/Repannouncementadd'
import {cosmaticAsset} from'../constants/common';


class Announcementlist extends React.Component {
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
         this.announce_data_table();
      }else{
         this.props.history.push('/Login')
      }
      
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

   announce_data_table=()=>{
		fetch(Repclient.get_all_announcement.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
		}).then(res=>res.json()).then(data=>
		{
			console.log(data)
			this.setState({announcementTablelist:data,loader:false})
			console.log(this.state.announcementTablelist)

	});
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
          method:Repclient.RepAnnouncementclientnewsfeeds.method,
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
			fetch(Repclient.get_perticular_annoucement_detail.url,{
				headers:{
		            "Content-Type" : "application/json",
		            "X-CSRF-Token" : localStorage.getItem("access-token"),
		            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
		    	},
				method:Repclient.get_perticular_annoucement_detail.method,
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
					                  <div className="container">
					                     {!this.state.loader  && <RepAnnouncementTable  announcementList={this.state.announcementTablelist} checkViewpageCall={this.check_view_page_call} recordDelete={this.checkAnyDelete}/>}	
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
										<Repannouncementadd addAnnouncementDetails={this.state.announcementDetails} getsummernote={this.returnSummerNoteData} getAnnouncementDetailsforEdit={this.state.EditAnnouncementDetails} getAnnouncementId={this.state.updatedAnnouncementId} checkCallback={this.returnback}/>
											 
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
		
export default Announcementlist;			   