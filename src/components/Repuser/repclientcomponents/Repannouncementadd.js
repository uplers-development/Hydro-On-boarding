import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import Apiurl,{site_url} from '../../Apiurl'; 



class Repannouncementadd extends React.Component {
	constructor(props){
		super(props);
		this.state={		
		}
		this.submitannouncement=this.submitannouncement.bind(this);
	}

	submitannouncement=(e)=>{
		e.preventDefault();
	}


	render(){
		return(
			<>
				<div className="anouncements-top-block">
				   <ul className="anouncements-check d-flex flex-wrap">
				     {this.props.addAnnouncementDetails.map((item,index)=>
				      <li key={index} data-id={item.tid}>
				         <Link to={""} onClick={(e)=>e.preventDefault()}>
				         		<img src={item.field_icon!=='' ? site_url+item.field_icon :require("../../../images/setting-logo-blue.svg")} alt="setting-logo"/>
				        		 <span>{item.name}</span>	
				         </Link>
				      </li>
				     )}
				   </ul>
				</div>
				{/*<!--Announcements Top block end-->*/}
				{/*<!--Announcements Form block Start-->*/}
				<div className="anouncements-form">
				   <form onSubmit={this.submitannouncement}>
				      <div className="form-group">
				         <label>Title</label>
				         <input type="text" name="Title" placeholder="Title" /> 
				      </div>
				      <div className="form-group">
				         <label>Subheading</label>
				         <input type="text" name="Subheading" placeholder="Subheading" /> 
				      </div>
				      <div className="text-edit-bar">
				         <label>Text edit bar</label>
				         <div className="textarea-block">
				            <img src={require("../../../images/hydro-microscreen@2x.png")} alt="Microscreen"/>
				            <textarea placeholder="Type the announcement here…"></textarea>
				         </div>
				      </div>
				      <div className="form-group">
				         <label>Button Copy</label>
				         <input type="text" name="Button Copy" placeholder="Button Copy"/> 
				      </div>
				      <div className="form-group">
				         <label>Button link</label>
				         <input type="text" name="Button link" placeholder="Button link"/> 
				      </div>
				   </form>
				</div>
			</>
			);
	}
}

export default Repannouncementadd;
