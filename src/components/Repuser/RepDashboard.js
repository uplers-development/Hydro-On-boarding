import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import ReactHtmlParser from 'react-html-parser';
import Activity from './repdashboardcomponents/Activity'
import Newuserlist from './repdashboardcomponents/Newuserlist'
import Overview from './repdashboardcomponents/Overview'
import Latestproduct from './repdashboardcomponents/Latestproduct'
import Newsandevents from './repdashboardcomponents/Newsandevents'
import Apiurl,{site_url} from './../Apiurl'; 
import {cosmaticAsset} from'../constants/common';

class RepDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			recentPublishedActivity:[],
			repnewusers:[],
			repnewsfeeds:[],
			repglance:[],
			replatestproducts:[],
			loader:true
		}
		
	}

	componentWillMount(){
		this.Rep_recently_published();
		this.Rep_new_users();
		this.Rep_news_feeds();
		this.Rep_glance();
		this.Rep_latest_products();
	}

	Rep_recently_published = () =>{
		try{
			fetch(Apiurl.RepDashboardRecentlyPublished.url,{
				method:Apiurl.RepDashboardRecentlyPublished.method
			}).then(res=>{return res.json()}).then(data=>this.setState({recentPublishedActivity:data}));
		}catch(err){
			console.log(err)
		}

	}

	Rep_new_users = () =>{
		try{
			fetch(Apiurl.RepDashboardNewUsers.url,{
				headers:{
						"Content-Type" : "application/json",
                		"Authorization": "Basic "+localStorage.getItem("basic-auth"),
				},
				method:Apiurl.RepDashboardNewUsers.method
			}).then(res=>{return res.json()}).then(data=>this.setState({repnewusers:data}));
		}catch(err){
			console.log(err)
		}
	}

	Rep_glance = () =>{
		try{
			fetch(Apiurl.RepDashboardOverview.url,{
				headers:{
						"Content-Type" : "application/json",
                		"Authorization": "Basic "+localStorage.getItem("basic-auth"),
				},
				method:Apiurl.RepDashboardOverview.method
			}).then(res=>{return res.json()}).then(data=>this.setState({repglance:data}));
		}catch(err){
			console.log(err)
		}
	}

	Rep_latest_products = () =>{
		try{
			fetch(Apiurl.RepDashboardLatestProducts.url,{
				headers:{
						"Content-Type" : "application/json",
                		"Authorization": "Basic "+localStorage.getItem("basic-auth"),
				},
				method:Apiurl.RepDashboardLatestProducts.method
			}).then(res=>{return res.json()}).then(data=>this.setState({replatestproducts:data}));
		}catch(err){
			console.log(err)
		}
	}

	Rep_news_feeds = () =>{
		try{
			fetch(Apiurl.RepDashboardNewsFeeds.url,{
				headers:{
						"Content-Type" : "application/json",
                		"Authorization": "Basic "+localStorage.getItem("basic-auth"),
				},
				method:Apiurl.RepDashboardNewsFeeds.method
			}).then(res=>{return res.json()}).then(data=>this.setState({repnewsfeeds:data,loader:false}));
		}catch(err){
			console.log(err)
		}
	}



	render(){
		return(<div>
   {/*<!--Main wrapper start-->*/}
   <section className="main-wrapper">
      {/*<!-- Main block start-->*/}
      <div className="d-flex flex-wrap main-block">
         {/*<!--Nav fixed left block start-->*/}
         <nav className="navbar teal-color-bg navbar-expand-md navbar-dark bg-primary fixed-left">
            <a className="navbar-logo" href="#" title="Main white logo"><img src={require("../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></a>
            {/*<!--List of menu start-->*/}
            <ul>
               <li><a className="active" href="#" title="Dashboard">
                  <img className="svg" src={require("../../images/dashboard-nav.svg")} alt="profile-logo" /><span>Dashboard</span></a>
               </li>
               <li><a href="#" title="Clients">
                  <img className="svg" src={require("../../images/clients_ic.svg")} alt="product-logo" /><span>Clients</span></a>
               </li>
               <li><a href="#" title="Products">
                  <img className="svg" src={require("../../images/bell-icon-logo.svg")} alt="Announcements" />
                  <span>Announcements</span></a>
               </li>
            </ul>
            {/*<!--List of menu end-->*/}
            <div className="pattern-block"><img src={require("../../images/pattern-nav-bottom.svg")} alt="pattern-nav" /></div>
            <div className="nav-copyright">© 2020 Hydro International</div>
         </nav>
         {/*<!--Nav fixed left block end-->*/}
         {/*<!--Main right content block start-->*/}
         <div className="d-flex flex-wrap right-content-part">
            <div className="top-heading">
               {/*<!--Top heading container start-->*/}
               <div className="top-heading-continer d-flex flex-wrap align-center">
                  <div className="name-of-heading d-flex flex-wrap">
                     <img src={require("../../images/dashboard-nav-blue.svg")} alt="profile-logo" />
                     <h1>Dashboard</h1>
                  </div>
                  <div className="d-flex flex-wrap user-log">
                     <div className="user-image-name d-flex flex-wrap align-center">
                        <img src={require("../../images/john-smith.png")} alt="Prfile image" />
                        <h2>Username</h2>
                     </div>
                     <div className="drop-down-menu">
                        <ul>
                           <li><a href="#" title="Profile">Profile</a></li>
                           <li><a href="#" title="Sign out">Sign out</a></li>
                        </ul>
                     </div>
                  </div>
               </div>
               {/*<!--Top heading container end-->*/}
            </div>
            {/*<!--Main content bottom block start-->*/}
            <div className="bottom-content-block">
               {!this.state.loader ? 
               <div className="d-flex flex-wrap dashboard-user-main">
                  <div className="container">
                     <div className="dashboard-user">
                        <div className="dashboard-top d-flex flex-wrap">
                           <div className="left-dashboard-top">
                              <h3 className="common-title">Activity</h3>
                              <div className="activity d-flex flex-wrap">
                                 <Activity recentActivity={this.state.recentPublishedActivity}/>
                                 <Newuserlist newusers={this.state.repnewusers}/>
                              </div>
                           </div>
                           <Overview repglance={this.state.repglance}/>
                        </div>
                        <div className="dashboard-bottom d-flex flex-wrap">
                           <Latestproduct replatestproductslist={this.state.replatestproducts}/>
                           <Newsandevents newsfeeds={this.state.repnewsfeeds}/>
                        </div>
                     </div>
                  </div>
               </div>: 
		         <>
		         	{cosmaticAsset.cosmatic.default.loader}
		         </>
		         }
            </div>
         </div>
         
      </div>
   </section>
</div>)
	}
}
		
export default RepDashboard;			   