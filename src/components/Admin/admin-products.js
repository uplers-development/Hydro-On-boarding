import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import Adminnavbar from './assets/Adminnavbar'
import Adminheader from './assets/Adminheader'
import Adminproductfilter from './Admincomponents/Adminproductfilter'
import Adminproductmobilefilter from './Admincomponents/Adminproductmobilefilter'
import Adminproducttable from './Admincomponents/Adminproducttable'
import Adminproductadd from './Admincomponents/Adminproductadd'
import adminProductImage from '../../images/headcell2x.png';
import adminProductImage2 from '../../images/hydro-gritcleanse2x.png';

class AdminProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			adminuid:null,
			productFiltereddata:[],
			statusfiltered:false,
			productchangedid:null,
			addStatus:null,
			checkcallfrom:null,	
			viewcaller:false
		}
		this.productafterFilter=this.productafterFilter.bind(this);
		this.getadmindetail=this.getadmindetail.bind(this);
		this.checkloadingfordata=this.checkloadingfordata.bind(this);
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
   		this.setState({addStatus:addpage,checkcallfrom:callfrom,viewcaller:viewcall,productchangedid:getChangeid});
   }  

   updatedresourcestatus=(checkupdatedresponse)=>{		
   		this.setState({viewcaller:checkupdatedresponse});
   }

	getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0]}.value);
   }

	render(){
		return(<div>
				   <section className="main-wrapper">
				      <div className="d-flex flex-wrap main-block">
				         <Adminnavbar/>
				         <div className="d-flex flex-wrap right-content-part">
				            <div className="top-heading">
				               <Adminheader historyPush={this.props} getAdminuid={this.getadmindetail} />
				            </div>
				            <div className="bottom-content-block with-filter">
				                {!this.state.viewcaller ? 
				               <div className="d-flex flex-wrap admin-products-main">
				                  <div className="fileter-block d-flex flex-wrap border-bottom">

				                     <Adminproductfilter loaderTrue={this.checkloadingfordata}  checkproductfilter={this.productafterFilter} checktheviewcalled={this.checktheview}/>
				                     <div className="search-sort-block d-flex flex-wrap align-center">
				                        <div className="btn-block">
				                           <button className="common-btn-blue" onClick={((e)=>{e.preventDefault();this.checktheview(true,true,true,JSON.parse(localStorage.getItem("user-type")).uid)})}><span>ADD NEW</span></button>
				                        </div>
				                        <Adminproductmobilefilter/>
				                     </div>
				                  </div>
				                  <Adminproducttable  getifilteredstatus={this.state.statusfiltered} getdatafromfilter={this.state.productFiltereddata} checktheviewcalled={this.checktheview}/>
				               </div>
				               :
				               <Adminproductadd sendproductId={this.state.productchangedid} readmode={this.state.checkcallfrom} addstatus={this.state.addStatus}
									updatedTheproductresponse={this.updatedproductstatus}/>
				           }
				            </div>
				         </div>
				      </div>
				   </section>
				</div>)
	}
}
		
export default AdminProduct;			   