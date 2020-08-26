import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,Repclient} from '../Apiurl'; 
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
		}
	/*	this.productafterFilter=this.productafterFilter.bind(this);
		this.checkloadingfordata=this.checkloadingfordata.bind(this);
		this.checkdropdownselected=this.checkdropdownselected.bind(this);
		this.getallproduct=this.getallproduct.bind(this);*/
		this.getadmindetail=this.getadmindetail.bind(this);
		this.changetheview=this.changetheview.bind(this);
	}	

	 changetheview=(calldefaultview,changedthetitle)=>{
  		this.setState({viewcaller:calldefaultview,pageTitleChange:changedthetitle});
   	 }

   	 getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0].value,loader:false});
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
					                        <Adminclientsearchbox/>
					                        <Adminclientmobilefilter />
					                        <Adminclientsorting />
					                     </div>
					                  </div>
					                	<Adminclienttabledata/>
					               </div>
			            	</div>
				             :
							<div className="bottom-content-block">
								{/*<!-Client details main start-->*/}
									<div className="d-flex flex-wrap clients-detils-main">				
										<Adminclientdetails/>
										<div className="container">
											<Adminproductselection historyPush={this.props} />
											<Admincontractdetails  historyPush={this.props} />
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