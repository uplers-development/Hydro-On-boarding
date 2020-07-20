import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import Apiurl,{site_url} from '../../Apiurl'; 



class Repannouncementadd extends React.Component {
	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
		return(
			<>
				<div className="anouncements-top-block">
				   <ul className="anouncements-check d-flex flex-wrap">
				      <li>
				         <a href="#" alt="">
				         <img src={require("../../../images/setting-logo-blue.svg")} alt="setting-logo"/>
				         <span>Update</span>	
				         </a>
				      </li>
				      <li>
				         <a href="#" alt="">
				         <img src={require("../../../images/question_mark_blue.svg")} alt="Question mark"/>
				         <span>Issue</span>	
				         </a>
				      </li>
				      <li>
				         <a href="#" alt="">
				         <img src={require("../../../images/warning-logo-blue.svg")} alt="warning-logo"/>
				         <span>Warning</span>	
				         </a>
				      </li>
				      <li>
				         <a href="#" className="active" alt="">
				         <img src={require("../../../images/ic_drop_plus_white.svg")} alt="Drop plus"/>
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
				            <img src={require("../../../images/hydro-microscreen@2x.png")} alt="Microscreen"/>
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
			</>
			);
	}
}

export default Repannouncementadd;
