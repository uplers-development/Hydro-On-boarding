import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import ReactHtmlParser from 'react-html-parser';
import Repnav from './assets/Repnav'
import Repheader from './assets/Repheader'
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
			repinfo:null,
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

	GetProfile=()=>{
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
		return(<section className="main-wrapper">
      <div className="d-flex flex-wrap main-block">
         <Repnav/>
         <div className="d-flex flex-wrap right-content-part">
            <div className="top-heading">
               	<Repheader/>
            </div>

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
   </section>)
	}
}
		
export default RepDashboard;			   