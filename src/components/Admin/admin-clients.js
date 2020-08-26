import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,Repclient} from '../Apiurl'; 
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import ReactHtmlParser from 'react-html-parser';
import Adminheader from './assets/Adminheader'
import Adminnavbar from './assets/Adminnavbar'
/*import Repclientbulkaction from './Admincomponents/Repclientbulkaction'
import Repclientsearchbox from './Admincomponents/Repclientsearchbox'
import Repclientsorting from './Admincomponents/Repclientsorting'
import Repclientmobilefilter from './Admincomponents/Repclientmobilefilter'
import Repclienttabledata from './Admincomponents/Repclienttabledata'
import Repclientdetails from './Admincomponents/Repclientdetails';
import Repproductselection from './Admincomponents/Repproductselection';
import Repcontractdetails from './Admincomponents/Repcontractdetails';*/
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
		}
		this.productafterFilter=this.productafterFilter.bind(this);
		this.getadmindetail=this.getadmindetail.bind(this);
		this.checkloadingfordata=this.checkloadingfordata.bind(this);
		this.checkdropdownselected=this.checkdropdownselected.bind(this);
		this.getallproduct=this.getallproduct.bind(this);
		this.changetheview=this.changetheview.bind(this);
	}	

	productafterFilter=(productfilteredata)=>{
		console.log(productfilteredata);
   		this.setState({productFiltereddata:productfilteredata})
   }

   checkloadingfordata=(getstatus)=>{
		console.log(getstatus);
   		this.setState({statusfiltered:getstatus})
   }

   checktheview=(addpage,callfrom,viewcall,getChangeid)=>{
  		console.log(addpage);
  		console.log(getChangeid);
  		console.log(callfrom);
  		console.log(viewcall);
   		this.setState({addStatus:addpage,checkcallfrom:callfrom,viewcaller:viewcall,productchangedid:getChangeid,pageTitleChange:viewcall});
   }  

   getallproduct=(getallproducts)=>{
   		this.setState({getAllproducts:getallproducts});
   }

   updatedproductstatus=(checkupdatedresponse)=>{		
   		this.setState({viewcaller:checkupdatedresponse});
   }

	getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0]}.value);
   }

   checkdropdownselected=(checkstatus)=>{
   		console.log(checkstatus);
   		this.setState({checkifselesctedropdown:checkstatus})
   }

   changetheview=(calldefaultview,changedthetitle)=>{
  		this.setState({viewcaller:calldefaultview,pageTitleChange:changedthetitle});
   }

	render(){
		return(<div>
			   <section className="main-wrapper">
			      <div className="d-flex flex-wrap main-block">
			         <Adminnavbar historyPush={this.props}/>
			         <div className="d-flex flex-wrap right-content-part">
			            <div className="top-heading">
		               	<Adminheader historyPush={this.props} getAdminuid={this.getadmindetail} checkifPagecall={this.state.pageTitleChange} checkveiworaddclass={this.state.checkcallfrom} changetodefaultView={this.changetheview}/>

			            </div>
			            {!this.state.loader ?
			            <>
			            {!this.state.viewpagecall ? 
			            	<div className="bottom-content-block with-filter">
					               <div className="d-flex flex-wrap clients-main-block">
					                  <div className="fileter-block d-flex flex-wrap border-bottom">
					                  {/*   <Repclientbulkaction recordDelete={this.checkAnyDelete}/>*/}
					                     <div className="search-sort-block d-flex flex-wrap align-center">
					                       {/* <Repclientsearchbox getSearchedItems={this.getSearchedItems}/>
					                       					                        <Repclientmobilefilter getSortedItems={this.getSortedItem} recordDelete={this.checkAnyDelete}/>
					                       					                        <Repclientsorting getSortedItems={this.getSortedItem}/>*/}
					                     </div>
					                  </div>
					                	{/*<Repclienttabledata clientdataTable={this.state.repclientdata} checkViewpageCall={this.check_view_page_call} recordDelete={this.checkAnyDelete}/>*/}
					               </div>
			            	</div>
				             :
							<div className="bottom-content-block">
								{/*<!-Client details main start-->*/}
									<div className="d-flex flex-wrap clients-detils-main">				
										{/*<Repclientdetails repclientuid={this.state.updatedRepclientId}/>*/}
										<div className="container">
											{/*<Repproductselection historyPush={this.props} repclientuid={this.state.updatedRepclientId}/>
																						<Repcontractdetails  historyPush={this.props} repclientuid={this.state.updatedRepclientId}/>
																						<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({viewpagecall:false})})} className="back-dashboard btn common-btn-blue"><span>Back</span></Link>*/}
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