import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import Adminnavbar from './assets/Adminnavbar'
import Adminheader from './assets/Adminheader'
import Adminproductfilter from './Admincomponents/Adminproductfilter'
import Adminproductmobilefilter from './Admincomponents/Adminproductmobilefilter'
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
					{/*<!--Top filter block End-->*/}


					{/*<!--Client block Start-->*/}
						<div className="admin-products-table table-outer">
							<div className="table-responsive">
							
								{/*<!--Table Start-->*/}
								<table className="table table-striped striped-gray">
   <thead>
      <tr>
         <th>
		 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox0" />
      				<label htmlfor="checkbox0"></label>	 
			 </div><span>Product</span>
		</th>
         <th>Author</th>
         <th>Data</th>
         <th>Type</th>
         <th>Last Modified</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox1" />
      				<label htmlfor="checkbox1"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c bg-cover" style={{backgroundImage: `url(${adminProductImage})`}}></div>
				 <div className="right-detail">
				 <h3>Lorem ipsum dolor</h3><a href="#" title="Draft">Draft</a>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>Simon</td>				
		 <td><span>Last Modified</span><span>3 hours ago</span></td>				
		 <td>Stormwater Management</td>				
		 <td>18th March 2020</td>				
      </tr>

<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox2" />
      				<label htmlfor="checkbox2"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c bg-cover" style={{backgroundImage: `url(${adminProductImage2})`}}></div>
				 <div className="right-detail">
				 <h3>Lorem ipsum dolor</h3><a href="#" title="Draft">Draft</a>
			 	</div>	
			 </div>	 
		 </td>
		 <td>Simon</td>				
		 <td><span>Last Modified</span><span>3 hours ago</span></td>				
		 <td>Stormwater Management</td>				
		 <td>18th March 2020</td>				
      </tr>
	
	
         </tbody>
</table>
								{/*<!--Table End-->*/}
								
							</div>	
						</div>
					{/*<!--Top filter block Start-->*/}
						
						
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