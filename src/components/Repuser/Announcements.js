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
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class Announcements extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			menulisting:[],
			repinfo:null,
			announcementDetails:[],
			repclientdata:[],
			announcement:true,
			updatedRepclientId:null,
			viewpagecalled:false,
			editorState: EditorState.createEmpty()
		}
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

   onEditorStateChange=(editorState) => {
    this.setState({
      editorState,
    });
  }

   checkAnyDelete=(recordDelete)=>{
		if(recordDelete) {this.client_data_Table()} 
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
      fetch(`https://staging.project-progress.net/projects/hydro/jsonapi/taxonomy_list/news_feed_type?_format=json`,{
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
			   
			    {/*<!--Main wrapper start-->*/}
			   <section className="main-wrapper">
			     {/*<!-- Main block start-->*/}
			   	<div className="d-flex flex-wrap main-block">
			   	
			   {/*<!--Nav fixed left block start-->*/}
					<Repnav repmenulisting={this.state.menulisting}/>			
				{/*<!--Nav fixed left block end-->*/}

			{/*<!--Main right content block start-->*/}
			<div className="d-flex flex-wrap right-content-part">
				<div className="top-heading">
					
					{/*<!--Top heading container start-->*/}
						<Repheader menulisting={this.state.menulisting} repuserinfo={this.state.repinfo}/>
					{/*<!--Top heading container end-->*/}
				</div>

				{/*<!--Main content bottom block start-->*/}
				<div className="bottom-content-block">

					{/*<!--Announcements main blok start-->*/}
					<div className="d-flex flex-wrap announcements-main">
						
						{/*<!--Announcements Head blok start-->*/}
						<div className="fileter-block details-head-block d-flex flex-wrap border-bottom"><h3>Add an announcement</h3>
						<h4>Add an announcement</h4></div>
							
						{/*<!--Announcements Head blok end-->*/}	
	
						{/*<!--Container start-->*/}
						<div className="container">
							
						{/*<!--Announcements Top block start-->*/}
							<Repannouncementadd addAnnouncementDetails={this.state.announcementDetails}/>
						{/*<!--Announcements Form block End-->*/}

						{/*<!--Announcements Clients title start-->*/}
						<div className="pro-title d-flex flex-wrap align-center">
							<div className="name-of-heading d-flex flex-wrap align-center">
								<img src={require("../../images/clients_ic_blue.svg")} alt="Clients"/>
									<h3>Clients</h3>
							</div>
							<Editor
								  editorState={this.state.editorState}
								  toolbarClassName="toolbarClassName"
								  wrapperClassName="wrapperClassName"
								  editorClassName="editorClassName"
								  onEditorStateChange={this.onEditorStateChange}
								  toolbar={{
    								inline: { inDropdown: true },
    								list: { inDropdown: true },
    								textAlign: { inDropdown: true },
    								link: { inDropdown: true },
    								history: { inDropdown: true },
    								image:{ inDropdown: false }
  								  }}
							/>				  
							{/*<!--Mobile filter start-->*/}
							<div className="mobile-filter">
									<a href="javascript:void(0)" title="filter-btn" className="filter-open-btn">
										<img src={require("../../images/ic_filter.svg")} alt="ic_filter" />
									</a>

									<div className="open-close-filter-block">
										<div className="top-head d-flex flex-wrap align-center">
											<div className="top-title d-flex flex-wrap">
												<img src={require("../../images/ic_filter-blue.svg")} alt="ic_filter" />
												<h4>Filters</h4>
											</div>
											<a href="javascript:void(0)" title="close-btn" className="filter-open-btn">
												<img src={require("../../images/ic_close.svg")} alt="ic_close" />
											</a>
										</div>

										<div className="list-filter-mobile">
											<h5>Location</h5>
											<ul>
												<li><a href="#" title="USA">USA</a></li>
												<li><a href="#" title="UK">UK</a></li>
											</ul>

											<h5>Product Types</h5>
											<ul>
											<li><a href="#" title="Type 1">Type 1</a></li>	
									<li><a href="#" title="Type 2">Type 2</a></li>	
											</ul>			  
												
											<h5>Bulk Action</h5>			  
											<ul>
												<li><a href="#" className="active"  title="Delete">Delete</a></li>
											</ul>
														  			
										</div>

									</div>
								</div>
							{/*<!--Mobile filter End-->*/}
										  
						</div>
						{/*<!--Announcements Clients title End-->*/}

						{/*<!--Filter block Start-->*/}
						<Repannouncementsfilter/>
						{/*<!--Filter block End-->*/}


					{/*<!--Table block Start-->*/}
								{/*<!--Table Start-->*/}
								<Repclienttabledata announcementPublish={this.state.announcement} clientdataTable={this.state.repclientdata} checkViewpageCall={this.check_view_page_call} recordDelete={this.checkAnyDelete}/>
								{/*<!--Table End-->*/}
								
					{/*<!--Table block End-->*/}
						
						
								</div>
								{/*<!--Container End-->*/}
									
							</div>
							{/*<!--Announcements main blok end-->*/}

						</div>
						{/*<!--Main content bottom block end-->*/}

					</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default Announcements;			   