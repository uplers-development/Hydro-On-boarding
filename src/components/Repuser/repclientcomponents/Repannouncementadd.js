import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import Apiurl,{site_url,Repclient} from '../../Apiurl'; 
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,ContentState,convertFromHTML,CompositeDecorator,convertToRaw,getDefaultKeyBinding, } from 'draft-js';
import {ValidationMsg} from'../../constants/validationmsg';
import draftToHtml from 'draftjs-to-html';
/*import htmlToDraft from 'html-to-draftjs';*/
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';	


class Repannouncementadd extends React.Component {
	constructor(props){
		super(props);
		this.state={		
			editorState: EditorState.createEmpty(),
			imageFormateState:false,
			smallLoader:false,
			announcement_image:false,
			announcement_image_uploaded:'',
			newuserPic_id:null,
			hidedefaultimageblock:false,
		}
		this.updateAnnouncementPic=this.updateAnnouncementPic.bind(this);
	}



	onEditorStateChange=(editorState) => {
	    this.setState({
	      editorState,
	    });
	
   this.props.getsummernote(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));

  }
  	componentDidMount(){
  		document.querySelector(".announcment-type").parentNode.classList.add("active")
		document.querySelector(".announcment-type").classList.add("active");
  	}

  	updateAnnouncementPic=(e)=>{
		console.log(e.target.value)
		this.setState({smallLoader:true});
		var fullPath = e.target.files[0];
		var exactfile=e.target.value;
		var filename='';
			if (exactfile) {
			    var startIndex = (exactfile.indexOf('\\') >= 0 ? exactfile.lastIndexOf('\\') : exactfile.lastIndexOf('/'));
			    filename = exactfile.substring(startIndex);
			    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			        filename = filename.substring(1);
			    }
		}

		if(filename.includes(".jpg") || filename.includes(".gif") || filename.includes(".png")){
				this.setState({imageFormateState:false})	
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/octet-stream");
				myHeaders.append("X-CSRF-Token", localStorage.getItem("access-token"));
				myHeaders.append("Content-Disposition", "file;filename=\""+filename+"\"");
				myHeaders.append("Authorization", "Basic "+localStorage.getItem("basic-auth"));
				var file = filename;
				console.log(file);
				var requestOptions = {
				  method: 'POST',
				  headers: myHeaders,
				  body: fullPath,
				};
				fetch(Repclient.RepAnnouncementaddimage.url,requestOptions)
				.then(res=>{return res.json()})
				.then(data=>{console.log(data);
					this.setState({smallLoader:false,announcement_image:true,newuserPic_id:data.fid[0]['value'],announcement_image_uploaded:site_url+data.uri[0].url})
					console.log(this.state.newuserPic_id);
				})
	  }else{
	  	this.setState({smallLoader:false,imageFormateState:true})	
	  }
	}
  	

	selectannouncement=(e,getannouncementid,value)=>{
		e.preventDefault();
		if(getannouncementid==="4"){
			this.setState({hidedefaultimageblock:true})
		}else{
			this.setState({hidedefaultimageblock:false})
		}
		//hidedefaultimageblock
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
					         <div className="textarea-block">
				         <Editor
								  editorState={this.state.editorState}
								  toolbarClassName="toolbarClassName"
								  wrapperClassName="wrapperClassName"
								  editorClassName="editorClassName"
								  onEditorStateChange={this.onEditorStateChange}
								  toolbar={{
								  	options: ['inline', 'list','colorPicker', 'link', 'emoji'],
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
				      {this.state.hidedefaultimageblock ?
				      <div className="profile-form-block">
				      <div className="upload-profile-photo">
								{/*<label>Announcement photo</label>*/}
								<div className=" d-flex flex-wrap align-center">
								<div className="prof-user-img">
									{this.state.smallLoader ? 
										<div className="loader"></div>
									:
									<img src={this.state.announcement_image ? this.state.announcement_image_uploaded :require("../../../images/profile-logo-blue.svg")} alt="profile-img"/>
							}
							</div>
									<div className="upload-img">

										<span>JPG, GIF or PNG. Max size of 1mb</span>
										<div className="upload-btn-wrapper">
											<input type="file" name="CHOOSE FILE" id="announcement-image" onChange={this.updateAnnouncementPic} data-id={this.state.newuserPic_id}/>
											<button className="btn common-btn-blue">
												<span>CHOOSE FILE</span></button>
										</div>
										{this.state.imageFormateState ? ValidationMsg.common.default.imageformate : ''}	
									</div>
								</div>
							</div>
							</div>
					 : ''}
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
