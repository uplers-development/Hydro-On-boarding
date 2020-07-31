import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Adminnavbar from './assets/Adminnavbar'
import Adminheader from './assets/Adminheader'
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
					<Adminheader historyPush={this.props} getAdminuid={this.getadmindetail}/>
				</div>
			<div className="bottom-content-block with-filter reps-filter">
				<div className="d-flex flex-wrap reps-main-block">
					<div className="fileter-block d-flex flex-wrap border-bottom">
						<div className="select-box">
							<span>Bulk Action</span>
								<ul className="list">
									<li><Link to={""} title="Bulk Action 1">Bulk Action 1</Link></li>
									<li><Link to={""} title="Bulk Action 2">Bulk Action 2</Link></li>
									<li><Link to={""} title="Bulk Action 3">Bulk Action 3</Link></li>
									
								</ul>
						</div>
						<div className="btn-block">
							<button className="common-btn-blue"><span>Add Rep</span></button>
						</div>
			<div className="search-sort-block d-flex flex-wrap align-center">
			<div className="auto-search-box">
				<form>
					<div className="autocomplete-ss">
						<input placeholder="Search client" id="myInput" type="text" name="hydro" />
					</div>
				</form>
			</div>
			{/*<!--Auto search box end-->*/}

			{/*<!-Mobile filter box start-->*/}
			<div className="mobile-filter">
				<Link to={""} title="filter-btn" className="filter-open-btn">
				<img src={require("../../images/ic_filter.svg")} alt="ic_filter" />
							  
				</Link>

				<div className="open-close-filter-block">
					<div className="top-head d-flex flex-wrap align-center">
						<div className="top-title d-flex flex-wrap">
		<img src={require("../../images/ic_filter-blue.svg")} alt="ic_filter" />
							<h4>Filters</h4>
						</div>
						<Link to={""} title="close-btn" className="filter-open-btn">
							<img src={require("../../images/ic_close.svg")} alt="ic_close" />
						</Link>
					</div>

					<div className="list-filter-mobile">
						<h5>Bulk Action</h5>
						<ul>
							<li><Link to={""} title="Delete">Delete</Link></li>
							<li><Link to={""} title="Action 1">Action</Link></li>
						</ul>
						
						<h5>Sort by</h5>
						<ul>
							<li className="active"><Link to={""} title="Recently added">Recently added</Link></li>
							<li><Link to={""} title="Oldest - Newest">Oldest - Newest</Link></li>
							<li><Link to={""} title="Recently viewed">Recently viewed</Link></li>
							<li><Link to={""} title="Moost Viewe">Moost Viewed</Link></li>
						</ul>
						
						<div className="btn-block">
							<button className="common-btn-blue"><span>Apply filters</span></button>
						</div>

					</div>

				</div>
			</div>
			{/*<!-Mobile filter box end-->*/}


			{/*<!--Sort by start-->*/}
			<div className="d-flex flex-wrap sort-by">
				<div className="sort-selected d-flex flex-wrap align-center">
					<h2>Sort by</h2>
				</div>
				<div className="drop-down-menu">
					<ul>
						<li><Link to={""} title="Purchase date newest">Purchase date newest</Link></li>
						<li><Link to={""} title="Purchase date oldest">Purchase date oldest</Link></li>
						<li><Link to={""} title="A-Z">A-Z</Link></li>
					</ul>
				</div>
			</div>
			{/*<!--Sort by end-->*/}
		</div>
	
</div>
{/*<!--Top filter block End-->*/}


{/*<!--Top clients table block Start-->*/}
	<div className="reps-table table-outer">
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
<img src={require("../../images/userrep_user2x.png")} alt="Prfile image" />	 
</div>
<div className="right-detail">
<h3>John Smith</h3>
<div className="action d-flex flex-wrap">
<Link to={""} title="Edit">Edit</Link>	 
<Link to={""} title="Delete">Delete</Link>	 
<Link to={""} title="View">View</Link>	 
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
<img src={require("../../images/userrep_user2x.png")} alt="Prfile image" />	 
</div>
<div className="right-detail">
<h3>John Smith</h3>
<div className="action d-flex flex-wrap">
<Link to={""} title="Edit">Edit</Link>	 
<Link to={""} title="Delete">Delete</Link>	 
<Link to={""} title="View">View</Link>	 
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
<img src={require("../../images/userrep_user2x.png")} alt="Prfile image" />	 
</div>
<div className="right-detail">
<h3>John Smith</h3>
<div className="action d-flex flex-wrap">
<Link to={""} title="Edit">Edit</Link>	 
<Link to={""} title="Delete">Delete</Link>	 
<Link to={""} title="View">View</Link>	 
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
<img src={require("../../images/userrep_user2x.png")} alt="Prfile image" />	 
</div>
<div className="right-detail">
<h3>John Smith</h3>
<div className="action d-flex flex-wrap">
<Link to={""} title="Edit">Edit</Link>	 
<Link to={""} title="Delete">Delete</Link>	 
<Link to={""} title="View">View</Link>	 
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
<img src={require("../../images/userrep_user2x.png")} alt="Prfile image" />	 
</div>
<div className="right-detail">
<h3>John Smith</h3>
<div className="action d-flex flex-wrap">
<Link to={""} title="Edit">Edit</Link>	 
<Link to={""} title="Delete">Delete</Link>	 
<Link to={""} title="View">View</Link>	 
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
<img src={require("../../images/userrep_user2x.png")} alt="Prfile image" />	 
</div>
<div className="right-detail">
<h3>John Smith</h3>
<div className="action d-flex flex-wrap">
<Link to={""} title="Edit">Edit</Link>	 
<Link to={""} title="Delete">Delete</Link>	 
<Link to={""} title="View">View</Link>	 
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
<img src={require("../../images/userrep_user2x.png")} alt="Prfile image" />	 
</div>
<div className="right-detail">
<h3>John Smith</h3>
<div className="action d-flex flex-wrap">
<Link to={""} title="Edit">Edit</Link>	 
<Link to={""} title="Delete">Delete</Link>	 
<Link to={""} title="View">View</Link>	 
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
<img src={require("../../images/userrep_user2x.png")} alt="Prfile image" />	 
</div>
<div className="right-detail">
<h3>John Smith</h3>
<div className="action d-flex flex-wrap">
<Link to={""} title="Edit">Edit</Link>	 
<Link to={""} title="Delete">Delete</Link>	 
<Link to={""} title="View">View</Link>	 
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
{/*<!--Reps main blok end-->*/}

</div>
{/*<!--Main content bottom block end-->*/}

			</div>
			{/*<!--Main right content block start-->*/}
			
				</div>
			</section>
			   
			   </div>)
	}
}
		
export default AdminRep;			   