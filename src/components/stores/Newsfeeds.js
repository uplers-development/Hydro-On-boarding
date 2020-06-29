import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import $ from "jquery";

class Newsfeeds extends Component {
	constructor(props) {
		super(props);
		this.state={
			newsFeedItems:[],
			recentViews:[]
		}
	}

	componentDidMount(){
		$('img.svg').each(function () {
				var $img = $(this);
				var imgID = $img.attr('id');
				var imgClass = $img.attr('class');
				var imgURL = $img.attr('src');
				$.get(imgURL, function (data) {
					var $svg = $(data).find('svg');
					if (typeof imgID !== 'undefined') {
						$svg = $svg.attr('id', imgID);
					}
					if (typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass + ' replaced-svg');
					}
					$svg = $svg.removeAttr('xmlns:a');
					$img.replaceWith($svg);
				}, 'xml');
			});
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
    			let newsfeed = []
				for (var i = 0; i < data.length; i++) {
					 if(data[i].field_news_feed_type=="5"){
					 	 newsfeed.push(<div className="datewise-common-block white-text teal-color-bg"><div className="top-title"><img className='svg' src={site_url+data[i].field_icon} alt="setting-logo"/><h4>{ReactHtmlParser(data[i].title)}</h4></div><div className="time-date">{data[i].created}</div>{ReactHtmlParser(data[i].body)}</div>);
					 }else if(data[i].field_news_feed_type=="4"){
					 	 newsfeed.push(<div className="white-text datewise-common-block d-flex flex-wrap padding-0"><div className="left-content cobalt-blue-bg"><div className="top-title"><img className='svg' src={site_url+data[i].field_icon}/><h4>New product launch</h4></div><div className="time-date">Today at {data[i].created}</div>{ReactHtmlParser(data[i].body)}<div className="btn-block"><a className="btn btn-cobalt-blue" href="javascript:void(0)"><span>{data[i].field_news_feed_button}</span></a></div></div><div className="image-block bg-cover" style={{backgroundImage: `url(${site_url+data[i].field_image})`}}></div></div>);
					 }else if(data[i].field_news_feed_type=="2"){
					 	 newsfeed.push(<div className="datewise-common-block white-bg-boxshadow"><div className="top-title"><img className='svg' src={site_url+data[i].field_icon} alt="warning-logo"/><h4><span>{data[i].title}</span></h4></div><div className="time-date">Today at {data[i].created}</div>{ReactHtmlParser(data[i].body)}<div className="btn-block"><button className="btn common-btn-white" type="submit"><span>{data[i].field_news_feed_button}</span></button></div></div>);
					 }else if(data[i].field_news_feed_type=="3"){
					 	 newsfeed.push(<div className="datewise-common-block white-bg-boxshadow"><div className="top-title"><img className='svg' src={site_url+data[i].field_icon} alt="issue-logo"/><h4>{data[i].title}</h4></div><div className="time-date">Today at {data[i].created}</div>{ReactHtmlParser(data[i].body)}<div className="btn-block"><button className="btn common-btn-white" type="submit"><span>{data[i].field_news_feed_button}</span></button></div></div>);
					 }
					 else if(data[i].field_news_feed_type=="13"){
					 	 newsfeed.push(<div className="news-title sky-blue-bg"><img src={site_url+data[i].field_icon} alt="Bell logo"/><h3>{data[i].title}</h3><div className="time-date">Today at 8:30am</div>{ReactHtmlParser(data[i].body)}<img className="svg" src={require("../../images/login-screen-pattern-white-r.svg")} alt="login screen pattern"/></div>);
					 }
		        	 if(i > 0  && data[i-1].created_1!==data[i].created_1){     
		        	 	newsfeed.push(<div className="news-date"><h4>{data[i].created_1}</h4></div>);  	 
		        	 }else if(i == 0){
		        	 	newsfeed.push(<div className="news-date"><h4>{data[i].created_1}</h4></div>);  	 
		        	 }	   	
		        }
    		this.setState({newsFeedItems:newsfeed});
	    		console.log(this.state.newsFeedItems);
	    		
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
				    	<div className="top-heading">
					 		<div className="top-heading-continer d-flex flex-wrap align-center">
								<div className="name-of-heading d-flex flex-wrap">
									<img src={"../../images/home-logo- blue.svg"} alt="profile-logo"/>
									<h1>News feed</h1>
								</div>
								<UserProfile/>
							</div>
						</div>
					<div className="bottom-content-block">

					{/*<!--News feed main blok start-->*/}
					<div className="d-flex flex-wrap news-main">
						<div className="news-feed-left">
							 {this.state.newsFeedItems}
						</div>
						<div className="news-feed-right">
							<div className="recently-viewed">
								<h4>Recently viewed</h4>
								<ul>
									{this.state.recentViews.map((recentItem,index)=>
										<li key={index}><a href="javascript:void(0)" title={recentItem.title}>{recentItem.title}</a></li>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Newsfeeds;