import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url} from '../Apiurl'; 
import $ from "jquery";
import ReactHtmlParser from 'react-html-parser';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state={
			sidebarItem:[],
			sidebarItemFooter:[],
			changeClassnav:false
		}
	}

	componentDidMount(){
		this.SidebarItems();
		this.FooterItems();
		window.location.pathname==='/newsfeed' || window.location.pathname==='/Dashboard' ? this.setState({changeClassnav:false}) :this.setState({changeClassnav:true});
	}

	SidebarItems=()=>{
			
		let menulist={
			menu:"main"
		}
		fetch(`https://staging.project-progress.net/projects/hydro/json-api/menu_list.json`,{
			  headers:{
		            "Content-Type" : "application/json",
		            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
		    	},
              	method:"POST",
	   			 body:JSON.stringify(menulist)
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    			this.setState({sidebarItem:data});
			});
	}

	FooterItems=()=>{
		fetch(Apiurl.LeftsidebarFooter.url,{
                method:Apiurl.LeftsidebarFooter.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    		this.setState({sidebarItemFooter:data});
    	})
	}


	render() {
		return (
			<div>
				<nav className={this.state.changeClassnav ? "navbar cadet-blue-bg navbar-expand-md navbar-dark bg-primary fixed-left" : "navbar white-bg-trnsparent navbar-expand-md navbar-dark bg-primary fixed-left"}>
					<Link to={"/Dashboard"} className="navbar-logo" title="Main white logo"><img src={require("../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>
					<ul>
						{this.state.sidebarItem.map((item,index)=>
							 <li key={index}><Link to={item.field_react_route} className={window.location.pathname===item.field_react_route ? "active" :''}  title={item.title}>
			                      {item.field_icon_svg!=='' ? 
			                      <div dangerouslySetInnerHTML={{ __html: item.field_icon_svg }} />
			                        :
			                      <img src={require("../../images/bell-icon-logo.svg")}/>
			                     }
			                      <span>{item.title}</span></Link>
			                  </li>
						)}
					</ul>
					
					<div className="nav-bottom-master teal-color-bg">
						<img src={this.state.sidebarItemFooter.length > 0 ? site_url+this.state.sidebarItemFooter[0].field_block_image : require("../../images/hydro-in-tab.png")} alt="hydro-in-tab"/>
						<p>{this.state.sidebarItemFooter.length > 0 ? site_url+this.state.sidebarItemFooter[0].body : ReactHtmlParser("Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit.")  }
						</p>
						<a href={this.state.sidebarItemFooter.length > 0 ? site_url+this.state.sidebarItemFooter[0].field_block_link : 'javascript:void(0)'} className="common-btn-blue"><span>Master CTA</span></a>
					</div>

					<div className="pattern-block">
					
						<img src={require("../../images/pattern-nav-bottom.svg")} alt="Pattern img"/>	
							
							</div>

					<div className="nav-copyright">© 2020 Hydro International</div>
				</nav>
			</div>
		);
	}
}

export default Sidebar;