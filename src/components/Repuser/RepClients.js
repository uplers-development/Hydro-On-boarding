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
import Repclientdetails from './repclientcomponents/Repclientdetails';
import Repproductselection from './repclientcomponents/Repproductselection';
import Repcontractdetails from './repclientcomponents/Repcontractdetails'
class RepClients extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			menulisting:[],
			repinfo:null,
			viewpagecalled:false,
			searchedItem:[],
			searchedclientresult:[],
			repclientdata:[],
			updatedRepclientId:null,
		}
		this.getSearchedItems = this.getSearchedItems.bind(this);
		this.getSortedItem = this.getSortedItem.bind(this);
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

	checkAnyDelete=(recordDelete)=>{
		if(recordDelete) {this.client_data_Table()} 
	}

	getSearchedItems =(getSearchedItem) =>{

		console.log(getSearchedItem);
		document.querySelector("#myInput").value==='' ? this.client_data_Table() : this.setState({repclientdata:getSearchedItem});
	}

	getSortedItem =(getSortedItem) =>{

		console.log(getSortedItem);
		this.setState({repclientdata:getSortedItem});
	}

	check_view_page_call=(viewpagecalled,uid)=>{
		console.log(uid);
		this.setState({updatedRepclientId : uid,viewpagecall : viewpagecalled});
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
			            <>
			            {!this.state.viewpagecall ? 
			            	<div className="bottom-content-block with-filter">
					               <div className="d-flex flex-wrap clients-main-block">
					                  <div className="fileter-block d-flex flex-wrap border-bottom">
					                     <Repclientbulkaction recordDelete={this.checkAnyDelete}/>
					                     <div className="search-sort-block d-flex flex-wrap align-center">
					                        <Repclientsearchbox getSearchedItems={this.getSearchedItems}/>
					                        <Repclientmobilefilter getSortedItems={this.getSortedItem} recordDelete={this.checkAnyDelete}/>
					                        <Repclientsorting getSortedItems={this.getSortedItem}/>
					                     </div>
					                  </div>
					                	<Repclienttabledata clientdataTable={this.state.repclientdata} checkViewpageCall={this.check_view_page_call} recordDelete={this.checkAnyDelete}/>
					               </div>
			            	</div>
				             :
							<div className="bottom-content-block">
								{/*<!-Client details main start-->*/}
									<div className="d-flex flex-wrap clients-detils-main">				
										<Repclientdetails repclientuid={this.state.updatedRepclientId}/>
										<div className="container">
											<Repproductselection historyPush={this.props} repclientuid={this.state.updatedRepclientId}/>
											<Repcontractdetails repclientuid={this.state.updatedRepclientId}/>
										</div>
									</div>
							</div>
			         	}
			         	</>
			         </div>
			      </div>
			   </section>
		</div>)
	}
}
		
export default RepClients;			   