import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from './../images/common-bg.jpg';
import Sidebar from './assets/Sidebar';
import UserProfile from './assets/UserProfile';
import Apiurl,{site_url} from './Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from'./constants/common';

 class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			rightSide_data:[],
			loader:true
		}
	}

	componentDidMount(){
	 if(localStorage.getItem("access-token")!==null){
		this.rightSideMenu();
	 }else{
			this.props.history.push("/Login")
	 }
	}

	rightSideMenu=()=>{	
		fetch(Apiurl.DashboardRightSide.url,{
    			headers: {
                	"Content-Type" : "application/json",
                },
                method:Apiurl.DashboardRightSide.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    		this.setState({rightSide_data:data,loader:false});
    	})
	}

	


	render() {
		return (
			<div><section className="main-wrapper">
			{!this.state.loader ? 
			<div className="d-flex flex-wrap main-block dashboard-main black-overlay-transparent bg-cover" style={{backgroundImage:`url(${CommonBackground})`}} >
			<Sidebar/>
			
			{/*<!--Dashboard switch user block start-->*/}
			<div className="dashboard-switch-user">
				<div className="top-switch-user d-flex flex-wrap">
					<h1>Switch user - Demo only</h1>
					<UserProfile historyPush={this.props}/>
				</div>
				
				{/*<!--Dashboard list start-->*/}
				<div className="list-of-view">

					{this.state.rightSide_data.map((item,index)=>
							<div className={item.field_block_class+" "+"d-flex flex-wrap boxes"}  key={index}>
								<div className="left-details">
									<img src={site_url+item.field_s_block_icon} alt="Book logo"/>
									<h3>{item.field_s_block_title}</h3>
									<p>{ReactHtmlParser(item.field_s_block_description)}</p>
										{ReactHtmlParser(item.field_s_block_link)}
								</div>
								<div className="right-image">
									<img src={site_url+item.field_s_block_image} alt="hydro-in-tab"/>
									{item.field_repeat_block_image!=='' && <img src={site_url+item.field_repeat_block_image} alt="hydro-in-tab"/>}
								</div>
							</div>
					)}
				</div>{/*<!--Dashboard list end-->*/}
				
			</div>{/*<!--Dashboard switch user block end-->*/}
			
		</div>:
		<>
			{cosmaticAsset.cosmatic.default.loader}
		</>}

	</section></div>
		);
	}
}


export default Dashboard