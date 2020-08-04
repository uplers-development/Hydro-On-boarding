import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Apiurl,{site_url,Repclient} from './../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import Repnav from './assets/Repnav'
import Repheader from './assets/Repheader'
import Activity from './repdashboardcomponents/Activity'
import Newuserlist from './repdashboardcomponents/Newuserlist'
import Overview from './repdashboardcomponents/Overview'
import Latestproduct from './repdashboardcomponents/Latestproduct'
import Newsandevents from './repdashboardcomponents/Newsandevents'
import {cosmaticAsset} from'../constants/common';

class RepDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			repinfo:null,
			menulisting:[],
			recentPublishedActivity:[],
			repnewusers:[],
			repnewsfeeds:[],
			repglance:[],
			replatestproducts:[],
			loader:true
		}
		
	}

	componentWillMount(){
		if(localStorage.getItem("access-token")!==null){
			this.Rep_nav_menu();
			this.Rep_recently_published();
			this.Rep_new_users();
			this.Rep_news_feeds();
			this.Rep_glance();
			this.Rep_latest_products();
		}else{
			this.props.history.push('/Login')
		}
		
	}

	Rep_nav_menu=()=>{
		let menulist={
			menu:"main-navigation-rep"
		}
		fetch(Apiurl.menulisting.url,{
		    headers:{
		            "Content-Type" : "application/json",
		            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
		    },
		    method:Apiurl.menulisting.method,
		    body:JSON.stringify(menulist)
  		}).then(res=>res.json()).then(data=>this.setState({menulisting:data}));
	}

	

	Rep_recently_published = () =>{
		try{
			fetch(Repclient.RepDashboardRecentlyPublished.url,{
				method:Repclient.RepDashboardRecentlyPublished.method
			}).then(res=>{return res.json()}).then(data=>this.setState({recentPublishedActivity:data}));
		}catch(err){
			console.log(err)
		}

	}

	Rep_new_users = () =>{
		try{
			fetch(Repclient.RepDashboardNewUsers.url,{
				headers:{
						"Content-Type" : "application/json",
                		"Authorization": "Basic "+localStorage.getItem("basic-auth"),
				},
				method:Repclient.RepDashboardNewUsers.method
			}).then(res=>{return res.json()}).then(data=>this.setState({repnewusers:data}));
		}catch(err){
			console.log(err)
		}
	}

	Rep_glance = () =>{
		try{
			fetch(Repclient.RepDashboardOverview.url,{
				headers:{
						"Content-Type" : "application/json",
                		"Authorization": "Basic "+localStorage.getItem("basic-auth"),
				},
				method:Repclient.RepDashboardOverview.method
			}).then(res=>{return res.json()}).then(data=>this.setState({repglance:data}));
		}catch(err){
			console.log(err)
		}
	}

	Rep_latest_products = () =>{
		try{
			fetch(Repclient.RepDashboardLatestProducts.url,{
				headers:{
						"Content-Type" : "application/json",
                		"Authorization": "Basic "+localStorage.getItem("basic-auth"),
				},
				method:Repclient.RepDashboardLatestProducts.method
			}).then(res=>{return res.json()}).then(data=>this.setState({replatestproducts:data,loader:false}));
		}catch(err){
			console.log(err)
		}
	}

	Rep_news_feeds = () =>{
		try{
			fetch(Repclient.RepDashboardNewsFeeds.url,{
				headers:{
						"Content-Type" : "application/json",
                		"Authorization": "Basic "+localStorage.getItem("basic-auth"),
				},
				method:Repclient.RepDashboardNewsFeeds.method
			}).then(res=>{return res.json()}).then(data=>this.setState({repnewsfeeds:data}));
		}catch(err){
			console.log(err)
		}
	}



	render(){
		return(<section className="main-wrapper">
      <div className="d-flex flex-wrap main-block">
         <Repnav repmenulisting={this.state.menulisting}/>
         <div className="d-flex flex-wrap right-content-part">
            <div className="top-heading">
               <Repheader historyPush={this.props} menulisting={this.state.menulisting}/>
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