import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Client} from '../Apiurl'; 
import $ from "jquery";
import ReactHtmlParser from 'react-html-parser';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state={
			sidebarItem:[],
			sidebarItemFooter:[],
			changeClassnav:false,
			newsFeedcounts:0
		}
	}

	componentDidMount(){
		this.SidebarItems();
		this.FooterItems();
		window.location.pathname==='/newsfeed' || window.location.pathname==='/Dashboard' ? this.setState({changeClassnav:false}) :this.setState({changeClassnav:true});
		fetch(Client.NewsfeedsNotification.url,{
              headers: {
                      "Content-Type" : "application/json",
                      "X-CSRF-Token" : localStorage.getItem("access-token"),
                      "Authorization": "Basic "+localStorage.getItem("basic-auth"),
                    },
                   method:Client.NewsfeedsNotification.method
          }).then(res=>{
            return res.json()
          }).then(data=>{
              console.log(data);
              this.setState({newsFeedcounts:data.length})
          })
		let self=this;
		if((localStorage.getItem("user-type")!==null || localStorage.getItem("user-type")!==undefined || localStorage.getItem("user-type")!=='') && JSON.parse(localStorage.getItem("user-type")).roles[1]==="client"){
		setInterval(function(){
          fetch(Client.NewsfeedsNotification.url,{
              headers: {
                      "Content-Type" : "application/json",
                      "X-CSRF-Token" : localStorage.getItem("access-token"),
                      "Authorization": "Basic "+localStorage.getItem("basic-auth"),
                    },
                   method:Client.NewsfeedsNotification.method
          }).then(res=>{
            return res.json()
          }).then(data=>{
              console.log(data);
              self.setState({newsFeedcounts:data.length})
          })
        },10000);
        }
	}

	SidebarItems=()=>{
			
		let menulist={
			menu:"main"
		}
		fetch(Apiurl.menulisting.url,{
			  headers:{
		            "Content-Type" : "application/json",
		            "X-CSRF-Token" : localStorage.getItem("access-token"),
		            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
		    	},
              	method:Apiurl.menulisting.method,
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
			 headers:{
		            "Content-Type" : "application/json",
		            "X-CSRF-Token" : localStorage.getItem("access-token"),
		            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
		    	},
                method:Apiurl.LeftsidebarFooter.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{
    		console.log(data);
    		this.setState({sidebarItemFooter:data});
    	})
	}


	render() {
		console.log(this.props)
		return (
			<div>
				<nav className={this.state.changeClassnav ? "navbar cadet-blue-bg navbar-expand-md navbar-dark bg-primary fixed-left" : "navbar white-bg-trnsparent navbar-expand-md navbar-dark bg-primary fixed-left"}>
					<Link to={"/Dashboard"} className="navbar-logo" title="Main white logo"><img src={require("../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>
					<ul>
						{this.state.sidebarItem.map((item,index)=>
							 <li key={index}><Link to={item.field_react_route} className={window.location.pathname===item.field_react_route ? "active" :''}  title={item.title}>
			                      {item.field_icon_svg!=='' ? 
			                      <div className="with-counter">
			                      <div dangerouslySetInnerHTML={{ __html: item.field_icon_svg }}/>
			                      
			                      {item.title==='News Feed' && this.state.newsFeedcounts > 0 ? <span className='counter'>{this.state.newsFeedcounts}</span>: ''}
			                      </div>
			                        :
			                       <div className="with-counter">
			                      <img src={require("../../images/bell-icon-logo.svg")}/>
			                      
			                      {item.title==='News Feed' && this.state.newsFeedcounts > 0 ? <span className='counter'>{this.state.newsFeedcounts}</span>: ''}
			                      </div>
			                     }
							 	
			                      <span>{item.title}</span></Link>
			                  </li>
						)}
					</ul>
					{this.state.sidebarItemFooter.length > 0 ? 
					<div className="nav-bottom-master teal-color-bg">
						<img src={this.state.sidebarItemFooter.length > 0 ? site_url+this.state.sidebarItemFooter[0].field_block_image : require("../../images/hydro-in-tab.png")} alt="hydro-in-tab"/>
						<p>{this.state.sidebarItemFooter.length > 0 ? ReactHtmlParser(this.state.sidebarItemFooter[0].body) : ReactHtmlParser("Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit.")}
						</p>
						<Link to={""} onClick={((e)=>{
								e.preventDefault();
								
								window.open(this.state.sidebarItemFooter[0].field_block_link,"_target")
							})} className="common-btn-blue"><span>{this.state.sidebarItemFooter[0].field_block_link_1}</span></Link>
					</div>
					:''}
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