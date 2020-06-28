import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url} from '../Apiurl'; 
class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state={
			sidebarItem:[],
			changeClassnav:false
		}
	}

	componentDidMount(){
		this.SidebarItems();
		window.location.pathname==='/newsfeed' || window.location.pathname==='/Dashboard' ? this.setState({changeClassnav:false}) :this.setState({changeClassnav:true});
	}

	SidebarItems=()=>{
		fetch(Apiurl.Leftsidebar_client.url,{
    			/*headers: {
                	"Content-Type" : "application/json",
                	 "Authorization": "Basic "+localStorage.getItem("basic-auth")
                },*/
                method:Apiurl.Leftsidebar_client.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    		this.setState({sidebarItem:data});
    	})
	}


	render() {
		return (
			<div>
				<nav className={this.state.changeClassnav ? "navbar teal-color-bg navbar-expand-md navbar-dark bg-primary fixed-left" : "navbar white-bg-trnsparent navbar-expand-md navbar-dark bg-primary fixed-left"}>
				<Link to='' className="navbar-logo" href="#" title="Main white logo"><img src={require("../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>
				<ul>
					{this.state.sidebarItem.map((item,index)=>
						<li key={index}><Link to={item.field_react_route} className=""  title={item.title}>
								<img className="svg" src={site_url+item.field_icon} alt={item.title}/>
						<span>{item.title}</span></Link></li>
					)}
				</ul>
				
				<div className="nav-bottom-master teal-color-bg">
					<img src={require("../../images/hydro-in-tab.png")} alt="hydro-in-tab"/>
					<p>Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit.
					</p>
					<button className="common-btn-blue"><span>Master CTA</span></button>
				</div>

				<div className="nav-copyright">© 2020 Hydro International</div>
			</nav>
			</div>
		);
	}
}

export default Sidebar;