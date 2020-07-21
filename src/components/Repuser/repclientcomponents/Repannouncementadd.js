import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import Apiurl,{site_url} from '../../Apiurl'; 
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,ContentState,convertFromHTML,CompositeDecorator,convertToRaw,getDefaultKeyBinding, } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
/*import htmlToDraft from 'html-to-draftjs';*/
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';	


class Repannouncementadd extends React.Component {
	constructor(props){
		super(props);
		this.state={		
			editorState: EditorState.createEmpty(),
		}
	}

	onEditorStateChange=(editorState) => {
	    this.setState({
	      editorState,
	    });
	
   this.props.getsummernote(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
  }

	selectannouncement=(e,getannouncementid,value)=>{
		e.preventDefault();
		document.querySelectorAll(".announcment-type").forEach((item,index)=>{
			item.classList.remove("active");
			item.parentNode.classList.remove("active");
			document.querySelectorAll(".announcment-type")[value].parentNode.classList.add("active");
			document.querySelectorAll(".announcment-type")[value].classList.add("active");
		});
	}



	render(){
		return(
			<>
				<div className="anouncements-top-block">
				   <ul className="anouncements-check d-flex flex-wrap">
				     {this.props.addAnnouncementDetails.map((item,index)=>
				      <li key={index}>
				         <Link to={""} className="announcment-type"  id={item.tid}  onClick={(e)=>this.selectannouncement(e,item.tid,index)}>
				         		{item.field_icon!=='' ? <div dangerouslySetInnerHTML={{ __html: item.field_icon }} />: ''}
				        		 <span>{item.name}</span>	
				         </Link>
				      </li>
				     )}
				   </ul>
				</div>
				{/*<!--Announcements Top block end-->*/}
				{/*<!--Announcements Form block Start-->*/}
				<div className="anouncements-form">
				   <form onSubmit={(e)=>e.preventDefault()}>
				      <div className="form-group">
				         <label>Title</label>
				         <input type="text" name="Title" id="Title" placeholder="Title" /> 
				      </div>
				      <div className="form-group">
				         <label>Subheading</label>
				         <input type="text" name="Subheading" id="Subheading" placeholder="Subheading" /> 
				      </div>
				      <div className="text-edit-bar">
				         <label>Text edit bar</label>
				         <div className="textarea-block">
				         <Editor
								  editorState={this.state.editorState}
								  toolbarClassName="toolbarClassName"
								  wrapperClassName="wrapperClassName"
								  editorClassName="editorClassName"
								  onEditorStateChange={this.onEditorStateChange}
								  toolbar={{
								  	options: ['inline', 'list','colorPicker', 'link', 'emoji','image'],
    								inline: { inDropdown: true },
    								list: { inDropdown: true },
    								textAlign: { inDropdown: true },
    								link: { inDropdown: true },
    								history: { inDropdown: true },
  								  }}
  								  placeholder="Type the announcement here..."
							/>		
				           {/* <img src={require("../../../images/hydro-microscreen@2x.png")} alt="Microscreen"/>
				           				            <textarea placeholder="Type the announcement here…"></textarea>*/}
				         </div>
				      </div>
				      <div className="form-group">
				         <label>Button Copy</label>
				         <input type="text" name="Button Copy" id="Button_Copy" placeholder="Button Copy"/> 
				      </div>
				      <div className="form-group">
				         <label>Button link</label>
				         <input type="text" name="Button link" id="Button_link" placeholder="Button link"/> 
				      </div>
				   </form>
				</div>
			</>
			);
	}
}

export default Repannouncementadd;
