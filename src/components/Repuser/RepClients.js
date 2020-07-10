import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import Repheader from './assets/Repheader'
import Repnav from './assets/Repnav'
import Repclientbulkaction from './repclientcomponents/Repclientbulkaction'
import Repclientsearchbox from './repclientcomponents/Repclientsearchbox'
import Repclientsorting from './repclientcomponents/Repclientsorting'
import Repclientmobilefilter from './repclientcomponents/Repclientmobilefilter'
import Repclienttabledata from './repclientcomponents/Repclienttabledata'

class RepClients extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			menulisting:[],
			repinfo:null,
			searchedItem:[],
			searchedclientresult:[],
			repclientdata:[],
		}
		this.getSearchedItems = this.getSearchedItems.bind(this);
	}

	componentWillMount(){
		if(localStorage.getItem("access-token")!==null){
			this.Rep_nav_menu();
			this.GetProfile();
			this.client_data_Table();
		}else{
			this.props.history.push('/Login')
		}
		
	}

	getSearchedItems =(getSearchedItem) =>{

		console.log(getSearchedItem);
		document.querySelector("#myInput").value==='' ? this.client_data_Table() : this.setState({repclientdata:getSearchedItem});
	}

	client_data_Table=()=>{
		fetch(`https://staging.project-progress.net/projects/hydro/jsonapi/clients?_format=json`,{
			headers: {
                	"Content-Type" : "application/json",
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
		}).then(res=>res.json()).then(data=>this.setState({repclientdata:data}));

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

	render(){
		return(<div>
			   <section className="main-wrapper">
			      <div className="d-flex flex-wrap main-block">
			         <Repnav repmenulisting={this.state.menulisting}/>
			         <div className="d-flex flex-wrap right-content-part">
			            <div className="top-heading">
			               <Repheader menulisting={this.state.menulisting} repuserinfo={this.state.repinfo}/>
			            </div>
			            <div className="bottom-content-block with-filter">
			               <div className="d-flex flex-wrap clients-main-block">
			                  <div className="fileter-block d-flex flex-wrap border-bottom">
			                     <Repclientbulkaction/>
			                     <div className="search-sort-block d-flex flex-wrap align-center">
			                        <Repclientsearchbox getSearchedItems={this.getSearchedItems}/>
			                        <Repclientmobilefilter/>
			                        <Repclientsorting/>
			                     </div>
			                  </div>
			                <Repclienttabledata clientdataTable={this.state.repclientdata}/>
			               </div>
			            </div>
			         </div>
			      </div>
			   </section>
		</div>)
	}
}
		
export default RepClients;			   