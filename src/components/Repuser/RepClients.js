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

class RepClients extends React.Component {
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
			   	<div className="d-flex flex-wrap main-block">
			   
				 <Repnav repmenulisting={this.state.menulisting}/>
				<div className="d-flex flex-wrap right-content-part">
					<div className="top-heading">
						<Repheader menulisting={this.state.menulisting} repuserinfo={this.state.repinfo}/>
					</div>

				{/*<!--Main content bottom block start-->*/}
				<div className="bottom-content-block with-filter">

					{/*<!--Clients main blok start-->*/}
					<div className="d-flex flex-wrap clients-main-block">
					
					{/*<!--Top filter block Start-->*/}
					<div className="fileter-block d-flex flex-wrap border-bottom">
						
							{/*<!--Select box start-->*/}
							<Repclientbulkaction/>
							{/*<!--Select box end-->*/}	
							
							{/*<!--Right search and sort block start-->*/}
							<div className="search-sort-block d-flex flex-wrap align-center">

								{/*<!--Auto search box start-->*/}
								<Repclientsearchbox/>
								{/*<!--Auto search box end-->*/}

								{/*<!-Mobile filter box start-->*/}
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
											<h5>Bulk Action</h5>
											<ul>
												<li><a href="#" title="Delete">Delete</a></li>
												<li><a href="#" title="Action 1">Action</a></li>
											</ul>
											
											<h5>Sort by</h5>
											<ul>
												<li className="active"><a href="#" title="Recently added">Recently added</a></li>
												<li><a href="#" title="Oldest - Newest">Oldest - Newest</a></li>
												<li><a href="#" title="Recently viewed">Recently viewed</a></li>
												<li><a href="#" title="Moost Viewe">Moost Viewed</a></li>
											</ul>
											
											<div className="btn-block">
												<button className="common-btn-blue"><span>Apply filters</span></button>
											</div>

										</div>

									</div>
								</div>
								{/*<!-Mobile filter box end-->*/}


								{/*<!--Sort by start-->*/}
								<Repclientsorting/>
								{/*<!--Sort by end-->*/}
							</div>
						
					</div>
					{/*<!--Top filter block End-->*/}


					{/*<!--Top clients table block Start-->*/}
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
				 	<input type="checkbox" id="checkbox4" />
      				<label htmlFor="checkbox4"></label>	 
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
				 	<input type="checkbox" id="checkbox5" />
      				<label htmlFor="checkbox5"></label>	 
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
				 	<input type="checkbox" id="checkbox6" />
      				<label htmlFor="checkbox6"></label>	 
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
				 	<input type="checkbox" id="checkbox7" />
      				<label htmlFor="checkbox7"></label>	 
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
				 	<input type="checkbox" id="checkbox8" />
      				<label htmlFor="checkbox8"></label>	 
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
				 	<input type="checkbox" id="checkbox9" />
      				<label htmlFor="checkbox9"></label>	 
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
						</div>
					{/*<!--Top clients table End-->*/}
						
						
					</div>
					{/*<!--Clients main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default RepClients;			   