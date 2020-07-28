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
import adminProductImage from '../../images/headcell2x.png';
import adminProductImage2 from '../../images/hydro-gritcleanse2x.png';

class AdminProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			adminuid:null
		}
		this.getadmindetail=this.getadmindetail.bind(this);
	}


	getadmindetail=(admindetails)=>{
  		console.log(admindetails);
   		this.setState({adminuid:admindetails.uid[0]}.value);
   }

	render(){
		return(<div>
			   
			    {/*<!--Main wrapper start-->*/}
			   <section className="main-wrapper">
			     {/*<!-- Main block start-->*/}
			   	<div className="d-flex flex-wrap main-block">
					<Adminnavbar/>
			<div className="d-flex flex-wrap right-content-part">
				<div className="top-heading">
					<Adminheader historyPush={this.props} getAdminuid={this.getadmindetail} />
						
				</div>

				{/*<!--Main content bottom block start-->*/}
				<div className="bottom-content-block with-filter">

					{/*<!--Resources main blok start-->*/}
					<div className="d-flex flex-wrap admin-products-main">
					
					{/*<!--Top filter block Start-->*/}
					<div className="fileter-block d-flex flex-wrap border-bottom">
						
							{/*<!--Select box start-->*/}
								<Adminproductfilter/>
							{/*<!--Select box end-->*/}	
							
							{/*<!--Right search and sort block start-->*/}
							<div className="search-sort-block d-flex flex-wrap align-center">
								<div className="btn-block">
								<button className="common-btn-blue"><span>ADD NEW</span></button>
							</div>

								{/*<!-Mobile filter box start-->*/}
								<Adminproductmobilefilter/>
								{/*<!-Mobile filter box end-->*/}


							</div>
						
					</div>
						<Adminproducttable/>
					</div>
					{/*<!--Resource main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default AdminProduct;			   