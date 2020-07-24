import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
//import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Adminheader from './assets/Adminheader';
import Adminnavbar from './assets/Adminnavbar';
import Adminresourcesfilter from './Admincomponents/Adminresourcesfilter';
import Adminresourcesmobilefilter from './Admincomponents/Adminresourcesmobilefilter';
import Adminresourcetable from './Admincomponents/Adminresourcetable';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';

class AdminResource extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			sidebarvisible:false,
			menulisting:null
		}
		this.admin_sidebar_listing=this.admin_sidebar_listing.bind(this);
	}

	componentDidMount(){
      if(localStorage.getItem("access-token")!==null){
      }else{
      	this.props.history.push("/Login");
      }
   }

   admin_sidebar_listing=(checkstatus,menulisting)=>{
   		this.setState({sidebarvisible:checkstatus, menulisting:menulisting});
   }



	render(){
		return(<div>
			   
			    {/*<!--Main wrapper start-->*/}
			   <section className="main-wrapper">
			     {/*<!-- Main block start-->*/}
			   	<div className="d-flex flex-wrap main-block">
			   
			   {/*<!--Nav fixed left block start-->*/}
				{this.state.sidebarvisible && <Adminnavbar menulist={this.state.menulisting}/>}
			{/*<!--Nav fixed left block end-->*/}

			{/*<!--Main right content block start-->*/}
			<div className="d-flex flex-wrap right-content-part">
				<div className="top-heading">
					<Adminheader historyPush={this.props}  get_sidebar_menu_listing={this.admin_sidebar_listing}/>
					
				</div>

				{/*<!--Main content bottom block start-->*/}
				<div className="bottom-content-block with-filter">

					{/*<!--Resources main blok start-->*/}
					<div className="d-flex flex-wrap admin-resources-main">
					
					{/*<!--Top filter block Start-->*/}
					<div className="fileter-block d-flex flex-wrap border-bottom">
						
							{/*<!--Select box start-->*/}
							<Adminresourcesfilter/>
							{/*<!--Select box end-->*/}	
							
							{/*<!--Right search and sort block start-->*/}
							<div className="search-sort-block d-flex flex-wrap align-center">
							</div>	

								{/*<!-Mobile filter box start-->*/}
								<Adminresourcesmobilefilter/>
								{/*<!-Mobile filter box end-->*/}


							{/*</div>*/}
						
					</div>
						<Adminresourcetable/>
						
						
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
		
export default AdminResource;			   