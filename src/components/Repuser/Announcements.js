import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import hydroImage from '../../images/hydro-biofilter-product.jpg';
import Repnav from './assets/Repnav'
import Repheader from './assets/Repheader'

class Announcements extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			menulisting:[],
			repinfo:null
		}
	}

	componentWillMount(){
      if(localStorage.getItem("access-token")!==null){
         this.Rep_nav_menu();
         this.GetProfile();
        /* if(this.state.fromProductSec && !this.state.fromContractSec){
            this.setState({sectionCalldiversion:"clients-add only-add-product"})
         }
         else if(!this.state.fromProductSec && this.state.fromContractSec){
            this.setState({sectionCalldiversion:"clients-add only-add-contract"})
         }else{
          this.setState({sectionCalldiversion:null})
         }*/
      }else{
         this.props.history.push('/Login')
      }
      
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
			   
			    {/*<!--Main wrapper start-->*/}
			   <section className="main-wrapper">
			     {/*<!-- Main block start-->*/}
			   	<div className="d-flex flex-wrap main-block">
			   	
			   {/*<!--Nav fixed left block start-->*/}
					<Repheader menulisting={this.state.menulisting} repuserinfo={this.state.repinfo}/>
			{/*<!--Nav fixed left block end-->*/}

			{/*<!--Main right content block start-->*/}
			<div className="d-flex flex-wrap right-content-part">
				<div className="top-heading">
					
					{/*<!--Top heading container start-->*/}
						<Repheader menulisting={this.state.menulisting} repuserinfo={this.state.repinfo}/>
					{/*<!--Top heading container end-->*/}
				</div>

				{/*<!--Main content bottom block start-->*/}
				<div className="bottom-content-block">

					{/*<!--Announcements main blok start-->*/}
					<div className="d-flex flex-wrap announcements-main">
						
						{/*<!--Announcements Head blok start-->*/}
						<div className="fileter-block details-head-block d-flex flex-wrap border-bottom"><h3>Add an announcement</h3>
						<h4>Add an announcement</h4></div>
							
						{/*<!--Announcements Head blok end-->*/}	
	
						{/*<!--Container start-->*/}
						<div className="container">
							
						{/*<!--Announcements Top block start-->*/}
						<div className="anouncements-top-block">
							<ul className="anouncements-check d-flex flex-wrap">
								<li>
									<a href="#" alt="">
										<img src={require("../../images/setting-logo-blue.svg")} alt="setting-logo"/>
										<span>Update</span>	
									</a>
								</li>
								<li>
									<a href="#" alt="">
										<img src={require("../../images/question_mark_blue.svg")} alt="Question mark"/>
										<span>Issue</span>	
									</a>
								</li>
								<li>
									<a href="#" alt="">
										<img src={require("../../images/warning-logo-blue.svg")} alt="warning-logo"/>
										<span>Warning</span>	
									</a>
								</li>
							    <li>
									<a href="#" className="active" alt="">
										<img src={require("../../images/ic_drop_plus_white.svg")} alt="Drop plus"/>
										<span>New product</span>	
									</a>
								</li>
							</ul>
						</div>	
						{/*<!--Announcements Top block end-->*/}

						{/*<!--Announcements Form block Start-->*/}
						<div className="anouncements-form">
							<form>
								<div className="form-group">
									<label>Title</label>
									<input type="text" name="Title" /> 
								</div>
								<div className="form-group">
									<label>Subheading</label>
									<input type="text" name="Subheading" /> 
								</div>
								
								<div className="text-edit-bar">
									<label>Text edit bar</label>
									<div className="textarea-block">
<img src={require("../../images/hydro-microscreen@2x.png")} alt="Microscreen"/>
									<textarea placeholder="Type the announcement here…"></textarea>
									</div>
								</div>

								<div className="form-group">
									<label>Button Copy</label>
									<input type="text" name="Button Copy" /> 
								</div>
								<div className="form-group">
									<label>Button link</label>
									<input type="text" name="Button link" /> 
								</div>
								

							</form>
						</div>
						{/*<!--Announcements Form block End-->*/}

						{/*<!--Announcements Clients title start-->*/}
						<div className="pro-title d-flex flex-wrap align-center">
							<div className="name-of-heading d-flex flex-wrap align-center">
								<img src={require("../../images/clients_ic_blue.svg")} alt="Clients"/>
									<h3>Clients</h3>
							</div>
										  
							{/*<!--Mobile filter start-->*/}
							<div className="mobile-filter">
									<a href="javascript:void(0)" title="filter-btn" className="filter-open-btn">
										<img src={require("../../images/ic_filter.svg")} alt="ic_filter" />
									</a>

									<div className="open-close-filter-block">
										<div className="top-head d-flex flex-wrap align-center">
											<div className="top-title d-flex flex-wrap">
												<img src={require("../../images/ic_filter-blue.svg")} alt="ic_filter" />
												<h4>Filters</h4>
											</div>
											<a href="javascript:void(0)" title="close-btn" className="filter-open-btn">
												<img src={require("../../images/ic_close.svg")} alt="ic_close" />
											</a>
										</div>

										<div className="list-filter-mobile">
											<h5>Location</h5>
											<ul>
												<li><a href="#" title="USA">USA</a></li>
												<li><a href="#" title="UK">UK</a></li>
											</ul>

											<h5>Product Types</h5>
											<ul>
											<li><a href="#" title="Type 1">Type 1</a></li>	
									<li><a href="#" title="Type 2">Type 2</a></li>	
											</ul>			  
												
											<h5>Bulk Action</h5>			  
											<ul>
												<li><a href="#" className="active"  title="Delete">Delete</a></li>
											</ul>
														  			
										</div>

									</div>
								</div>
							{/*<!--Mobile filter End-->*/}
										  
						</div>
						{/*<!--Announcements Clients title End-->*/}

						{/*<!--Filter block Start-->*/}
						<div className="announcements-filter d-flex flex-wrap align-center">
							<h4>Select which clients you want to see the announcements</h4>
							<div className="filter-right d-flex flex-wrap">
								<div className="select-box location">
									<span>Location</span>
									<ul className="list product-list-item">
									<li><a href="#" title="USA">USA</a></li>	
									<li><a href="#" title="UK">UK</a></li>	
									</ul>
								</div>
								<div className="select-box prod-type">
									<span>Product Types</span>
									<ul className="list product-list-item">
									<li><a href="#" title="Type 1">Type 1</a></li>	
									<li><a href="#" title="Type 2">Type 2</a></li>	
									</ul>
								</div>
								<div className="select-box bulk-action">
									<span>Bulk</span>
									<ul className="list product-list-item">
									<li><a href="#" title="Delete">Delete</a></li>	
									</ul>
								</div>
							</div>
						</div>
						{/*<!--Filter block End-->*/}


					{/*<!--Table block Start-->*/}
						<div className="clients-table table-outer">
							<div className="table-responsive">
							
								{/*<!--Table Start-->*/}
								<table className="table table-striped">
   <thead>
      <tr>
         <th>
		 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox1" />
      				<label htmlFor="checkbox1"></label>	 
			 </div><span>Name</span>
		</th>
         <th>Email</th>
         <th>Role</th>
         <th>Last updatetd</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox2" />
      				<label htmlFor="checkbox2"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/john-smith.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
							  
	<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label htmlFor="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/girls-profile-img.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>	

<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label htmlFor="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/jane-smith.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
							  
	<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label htmlFor="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/jane-smith2.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>		
<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox2" />
      				<label htmlFor="checkbox2"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/john-smith.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
							  
	<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label htmlFor="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/girls-profile-img.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>	

<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label htmlFor="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/jane-smith.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
							  
	<tr>
         <td>
			 <div className="checkbox-cust">
				 	<input type="checkbox" id="checkbox3" />
      				<label htmlFor="checkbox3"></label>	 
			 </div>
			 <div className="name-edit">
				 <div className="img-c">
					<img src={require("../../images/jane-smith2.png")} alt="Prfile image" />	 
				 </div>
				 <div className="right-detail">
				 <h3>John Smith</h3>
			     <div className="action d-flex flex-wrap">
					<a href="#" title="Edit">Edit</a>	 
					<a href="#" title="Delete">Delete</a>	 
					<a href="#" title="View">View</a>	 
				 </div>	
				</div>	
			 </div>	 
		 </td>
		 <td>John.smith@example.co.uk</td>				
		 <td>Project manager</td>				
		 <td><span>22th Jan 2020</span><span>11.00 am</span></td>				
      </tr>
      
         </tbody>
</table>
								{/*<!--Table End-->*/}
								
							</div>
							<div className="btn-block">
								<button className="btn common-btn-blue"><span>Publish announcement</span></button>	
							</div>
						</div>
					{/*<!--Table block End-->*/}
						
						
						</div>
						{/*<!--Container End-->*/}
							
					</div>
					{/*<!--Announcements main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default Announcements;			   