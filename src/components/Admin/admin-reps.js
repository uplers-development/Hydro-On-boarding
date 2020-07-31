import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Adminnavbar from './assets/Adminnavbar'
import Adminheader from './assets/Adminheader'
import Adminrepbulkdelete from './Admincomponents/Adminrepbulkdelete'
import Adminrepsearch from './Admincomponents/Adminrepsearch'
import Adminrepmobilefilter from './Admincomponents/Adminrepmobilefilter'
import Adminrepsort from './Admincomponents/Adminrepsort'
import Adminreptable from './Admincomponents/Adminreptable'
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';

class AdminRep extends React.Component {
	constructor(props) {
		super(props);
		this.state={
		}
		this.getadmindetail=this.getadmindetail.bind(this);
	}

	getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0].value});
   	}	


	render(){
		return(<div>
			   		<section className="main-wrapper">
						   <div className="d-flex flex-wrap main-block">
						      <Adminnavbar/>
						      <div className="d-flex flex-wrap right-content-part">
						         <div className="top-heading">
						            <Adminheader historyPush={this.props} getAdminuid={this.getadmindetail}/>
						         </div>
						         <div className="bottom-content-block with-filter reps-filter">
						            <div className="d-flex flex-wrap reps-main-block">
						               <div className="fileter-block d-flex flex-wrap border-bottom">
						                 <Adminrepbulkdelete/>
						                  <div className="btn-block">
						                     <button className="common-btn-blue"><span>Add Rep</span></button>
						                  </div>
						                  <div className="search-sort-block d-flex flex-wrap align-center">
						                    	<Adminrepsearch/>
						                    	<Adminrepmobilefilter/>
						                   		<Adminrepsort/>
						                  </div>
						               </div>
						             	<Adminreptable/>
						            </div>
						         </div>
						      </div>
						   </div>
					</section>
				</div>
			   )
	}
}
		
export default AdminRep;			   