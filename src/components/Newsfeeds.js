import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from './assets/Sidebar';
import UserProfile from './assets/UserProfile';
import Apiurl,{site_url} from './Apiurl'; 
import ReactHtmlParser from 'react-html-parser';

class Newsfeeds extends Component {
	constructor(props) {
		super(props);
		this.state={
			newsFeedItems:[],
			recentViews:[]
		}
	}

	componentDidMount(){
		this.newsFeedItems()
		this.newsFeedRecentlyViewed();
	}	

	newsFeedItems=()=>{
		fetch(Apiurl.Newsfeeds.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    		this.setState({newsFeedItems:data});
    	})
	}


	newsFeedRecentlyViewed=()=>{
		fetch(Apiurl.Newsfeeds_recentviews.url,{
    			headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
               method:Apiurl.Newsfeeds_recentviews.method
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    		this.setState({recentViews:data});
    	})
	}


	render() {
		return (
			<div>
				<section className="main-wrapper">
					<div className="d-flex flex-wrap main-block">
					<Sidebar/>
					<div className="d-flex flex-wrap right-content-part">
					<UserProfile/>
					<div className="bottom-content-block">

					{/*<!--News feed main blok start-->*/}
					<div className="d-flex flex-wrap news-main">

						{/*<!--News feed left blok start-->*/}
						<div className="news-feed-left">

							

							{/*<!--Date wise block start-->*/}
							
							 {(() => {
								for (var i = this.state.newsFeedItems.length - 1; i >= 0; i--) {

										if(this.state.newsFeedItems[i].field_news_feed_type=="13"){
											return(<div className="news-title sky-blue-bg">
													<img src={site_url+this.state.newsFeedItems[i].field_icon} alt="Bell logo"/>
													<h3>{this.state.newsFeedItems[i].title}</h3>
													<div className="time-date">Today at 8:30am</div>
													{ReactHtmlParser(this.state.newsFeedItems[i].body)}
													<img className="svg" src={this.state.newsFeedItems[i].field_image} alt="login screen pattern"/>
											</div>);
										console.log('Design for '+this.state.newsFeedItems[i].field_news_feed_type_1);
										} 
									}
								 })()}

							{(() => {
								for (var i = this.state.newsFeedItems.length - 1; i >= 0; i--) {

										if(this.state.newsFeedItems[i].field_news_feed_type=="4"){
											return(<div className="white-text datewise-common-block d-flex flex-wrap padding-0">
														<div className="left-content cobalt-blue-bg">
															<div className="top-title">
																<img src={site_url+this.state.newsFeedItems[i].field_icon}/>
																<h4>New product launch</h4>
															</div>
															<div className="time-date">Today at {this.state.newsFeedItems[i].created}</div>
															{ReactHtmlParser(this.state.newsFeedItems[i].body)}
															<div className="btn-block">

																<Link className="btn btn-cobalt-blue" to={""}><span>{this.state.newsFeedItems[i].field_news_feed_button}</span></Link>

															</div>
														</div>
														<div className="image-block bg-cover"></div>
													</div>);
										console.log('Design for '+this.state.newsFeedItems[i].field_news_feed_type_1);
										} 
									}
								 })()}

							{(() => {
								for (var i = this.state.newsFeedItems.length - 1; i >= 0; i--) {

										if(this.state.newsFeedItems[i].field_news_feed_type=="2"){
												return(<div className="datewise-common-block white-bg-boxshadow">
																<div className="top-title">
																	<img src={site_url+this.state.newsFeedItems[i].field_icon} alt="warning-logo"/>
																	<h4><span>{this.state.newsFeedItems[i].title}</span></h4>
																</div>
																<div className="time-date">Today at {this.state.newsFeedItems[i].created}</div>
																{ReactHtmlParser(this.state.newsFeedItems[i].body)}
																<div className="btn-block">
																	<button className="btn common-btn-white" type="submit"><span>{this.state.newsFeedItems[i].field_news_feed_button}</span></button>
																</div>
															</div>
														);
										console.log('Design for '+this.state.newsFeedItems[i].field_news_feed_type_1);
										} 
									}
								 })()}

							{(() => {
								for (var i = this.state.newsFeedItems.length - 1; i >= 0; i--) {

										if(this.state.newsFeedItems[i].field_news_feed_type=="3"){
												return(<div className="datewise-common-block white-bg-boxshadow">
																	<div className="top-title">
																		<img src={this.state.newsFeedItems[i].field_icon} alt="issue-logo"/>
																		<h4>{this.state.newsFeedItems[i].title}</h4>
																	</div>
																	<div className="time-date">Today at {this.state.newsFeedItems[i].created}</div>
																	{ReactHtmlParser(this.state.newsFeedItems[i].body)}
																	<div className="btn-block">
																		<button className="btn common-btn-white" type="submit"><span>{this.state.newsFeedItems[i].field_news_feed_button}</span></button>
																	</div>
																</div>
														);
										console.log('Design for '+this.state.newsFeedItems[i].field_news_feed_type_1);
										} 
									}
								 })()}
							{(() => {
								for (var i = this.state.newsFeedItems.length - 1; i >= 0; i--) {

										if(this.state.newsFeedItems[i].field_news_feed_type=="5"){
												return(<div className="datewise-common-block white-text teal-color-bg">
																<div className="top-title">
																	<img src={this.state.newsFeedItems[i].field_icon} alt="setting-logo"/>
																	<h4>{this.state.newsFeedItems[i].title}</h4>
																</div>
																<div className="time-date">{this.state.newsFeedItems[i].created}</div>
																{ReactHtmlParser(this.state.newsFeedItems[i].body)}
															</div>
														);
										} 
									}
								 })()}
							{(() => {
								for (var i = this.state.newsFeedItems.length - 1; i >= 0; i--) {

											if(i > 0 && this.state.newsFeedItems[i-1].created_1!==this.state.newsFeedItems[i].created_1){
												return(<div className="news-date">
															<h4>{this.state.newsFeedItems[i].created_1}</h4>
														</div>);

											}
									}
								 })()}
							{(() => {
								for (var i = this.state.newsFeedItems.length - 1; i >= 0; i--) {

											 if(i == 0){
												return(<div className="news-date">
															<h4>{this.state.newsFeedItems[i].created_1}</h4>
												 	</div>);
											}
									}
								 })()}





							{/*<!--Date wise block end-->*/}

							{/*<!--Date wise block start-->*/}
							
							{/*<!--Date wise block end-->*/}




						</div>
						{/*<!--News feed left blok end-->*/}

						{/*<!--News feed right blok start-->*/}
						<div className="news-feed-right">
							<div className="recently-viewed">
								<h4>Recently viewed</h4>
								<ul>
									{this.state.recentViews.map((recentItem,index)=>
										<li><Link href="#" title={recentItem.title}>{recentItem.title}</Link></li>
									)}
								</ul>
							</div>
						</div>
						{/*<!--News feed right blok end-->*/}

					</div>
					{/*<!--News feed main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Newsfeeds;