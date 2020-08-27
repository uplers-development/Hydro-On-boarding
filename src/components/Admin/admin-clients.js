import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../Apiurl'; 
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import ReactHtmlParser from 'react-html-parser';
import Adminheader from './assets/Adminheader';
import Adminnavbar from './assets/Adminnavbar';
import Adminclientbulkaction from './Admincomponents/Adminclientbulkaction';
import Adminclientsearchbox from './Admincomponents/Adminclientsearchbox';
import Adminclientsorting from './Admincomponents/Adminclientsorting';
import Adminclientmobilefilter from './Admincomponents/Adminclientmobilefilter';
import Adminclienttabledata from './Admincomponents/Adminclienttabledata';
import Adminclientdetails from './Admincomponents/Adminclientdetails';
import Adminproductselection from './Admincomponents/Adminproductselection';
import Admincontractdetails from './Admincomponents/Admincontractdetails';
import {cosmaticAsset} from'../constants/common';

class Adminclients extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			menulisting:[],
			viewpagecall:this.props.location.state!==undefined  ? this.props.location.state.contractsubmission:false,
			searchedItem:[],
			searchedclientresult:[],
			repclientdata:[],
			updatedRepclientId:this.props.location.state!==undefined ? this.props.location.state.targetSendid : null,
			loader:true,
			pageTitleChange:false,
			adminuid:null
		}
		this.getSearchedItems = this.getSearchedItems.bind(this);
		this.getSortedItem = this.getSortedItem.bind(this);
		this.changetheviewtodefault=this.changetheviewtodefault.bind(this);
	}	


	componentDidMount(){
		if(localStorage.getItem("access-token")!==null){
			this.client_data_Table()
		}else{
			this.props.history.push('/Login')
		}
	}

	 changetheview=(calldefaultview,changedthetitle)=>{
  		this.setState({viewcaller:calldefaultview,pageTitleChange:changedthetitle});
   	 }

   	 getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0].value,loader:false});
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
		fetch(Admin.adminClientlisting.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
		}).then(res=>res.json()).then(data=>this.setState({repclientdata:data,loader:false}));

	}





	render(){
		return(<div>
			   <section className="main-wrapper">
			      <div className="d-flex flex-wrap main-block">
			         <Adminnavbar historyPush={this.props}/>
			         <div className="d-flex flex-wrap right-content-part">
			            <div className="top-heading">
		               	<Adminheader historyPush={this.props} getAdminuid={this.getadmindetail} checkifPagecall={this.state.pageTitleChange} changetodefaultView={this.changetheview}/>

			            </div>
			            {!this.state.loader ?
			            <>
			            {!this.state.viewpagecall ? 
			            	<div className="bottom-content-block with-filter">
					               <div className="d-flex flex-wrap clients-main-block">
					                  <div className="fileter-block d-flex flex-wrap border-bottom">
					                     <Adminclientbulkaction recordDelete={this.checkAnyDelete}/>
					                     <div className="search-sort-block d-flex flex-wrap align-center">
					                        <Adminclientsearchbox getSearchedItems={this.getSearchedItems}/>
					                        <Adminclientmobilefilter getSortedItems={this.getSortedItem} recordDelete={this.checkAnyDelete} />
					                        <Adminclientsorting getSortedItems={this.getSortedItem} />
					                     </div>
					                  </div>
					                	<Adminclienttabledata clientdataTable={this.state.repclientdata} checkViewpageCall={this.check_view_page_call} recordDelete={this.checkAnyDelete}/>
					               </div>
			            	</div>
				             :
							<div className="bottom-content-block">
								{/*<!-Client details main start-->*/}
									<div className="d-flex flex-wrap clients-detils-main">				
										<Adminclientdetails repclientuid={this.state.updatedRepclientId}/>
										<div className="container">
											<Adminproductselection historyPush={this.props} repclientuid={this.state.updatedRepclientId} />
											<Admincontractdetails  historyPush={this.props} repclientuid={this.state.updatedRepclientId}/>
											<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({viewpagecall:false})})} className="back-dashboard btn common-btn-blue"><span>Back</span></Link>
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
		
export default Adminclients;			   