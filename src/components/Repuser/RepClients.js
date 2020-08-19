import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,Repclient} from '../Apiurl'; 
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
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
import Repcontractdetails from './repclientcomponents/Repcontractdetails';
import {cosmaticAsset} from'../constants/common';

class RepClients extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			menulisting:[],
			viewpagecall:this.props.location.state!==undefined ? this.props.location.state.contractsubmission:false,
			searchedItem:[],
			searchedclientresult:[],
			repclientdata:[],
			updatedRepclientId:this.props.location.state!==undefined ? this.props.location.state.targetSendid : null,
			loader:true,
			pageTitleChange:false,
		}
		this.getSearchedItems = this.getSearchedItems.bind(this);
		this.getSortedItem = this.getSortedItem.bind(this);
		this.changetheviewtodefault=this.changetheviewtodefault.bind(this);
		console.log(this.state.viewpagecall);
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
  			if(document.cookie){
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
		this.setState({updatedRepclientId : uid,viewpagecall : viewpagecalled , pageTitleChange:viewpagecalled});
	}

	changetheviewtodefault=(viewofpagecall)=>{
		this.setState({viewpagecall : viewofpagecall , pageTitleChange:viewofpagecall})
		console.log(this.state.pageTitleChange);
	}

	client_data_Table=()=>{
		fetch(Repclient.Repclientdatatable.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
		}).then(res=>res.json()).then(data=>this.setState({repclientdata:data,loader:false}));

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


	render(){
		return(<div>
			   <section className="main-wrapper">
			      <div className="d-flex flex-wrap main-block">
			         <Repnav repmenulisting={this.state.menulisting}/>
			         <div className="d-flex flex-wrap right-content-part">
			            <div className="top-heading">
			               <Repheader menulisting={this.state.menulisting}  historyPush={this.props} checkifPagecall={this.state.pageTitleChange} changetodefult={this.changetheviewtodefault}/>
			            </div>
			            {!this.state.loader ?
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
											<Repcontractdetails  historyPush={this.props} repclientuid={this.state.updatedRepclientId}/>
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
		
export default RepClients;			   