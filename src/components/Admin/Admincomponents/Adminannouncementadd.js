import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import Apiurl,{site_url,Admin} from '../../Apiurl';
import{hasValidUrl} from '../../validation'; 
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,ContentState,convertFromHTML,CompositeDecorator,convertToRaw,getDefaultKeyBinding, } from 'draft-js';
import {ValidationMsg} from'../../constants/validationmsg';
import draftToHtml from 'draftjs-to-html';
import {cosmaticAsset} from'../../constants/common';
/*import htmlToDraft from 'html-to-draftjs';*/
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';	
import Adminclienttabledata from './Adminclienttabledata'
import Adminannouncementsfilter from './Adminannouncementsfilter'

class Adminannouncementadd extends React.Component {
	constructor(props){
		super(props);
		this.state={		
			editorState:this.props.getAnnouncementDetailsforEdit!==undefined && (this.props.getAnnouncementDetailsforEdit.node.body!=='' && this.props.getAnnouncementDetailsforEdit.node.body!==null) ? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(this.props.getAnnouncementDetailsforEdit.node.body))) : EditorState.createEmpty(),
			imageFormateState:false,
			opensubmissionpopup:false,
			smallLoader:false,
			announcement_image:false,
			announcement_image_uploaded:'',
			newuserPic_id:null,
			hidedefaultimageblock:false,
			viewpagecall:false,
			repclientdata:[],
			loader:true,
			validbuttonlink:false,
		}
		this.filtereddata=this.filtereddata.bind(this);
		this.updateAnnouncementPic=this.updateAnnouncementPic.bind(this);
		this.updateAnnouncementDetails=this.updateAnnouncementDetails.bind(this);
	}

	filtereddata=(filtersuccess)=>{
		console.log(filtersuccess);
		if(filtersuccess.length>0){
			this.setState({noDataforTable:false,repclientdata:filtersuccess});
			document.querySelectorAll('.clientchecked').forEach((checked,index)=>{
	       			if(document.querySelectorAll('.clientchecked')[index].value===this.props.getAnnouncementDetailsforEdit.node.field_client[index]){
	       				document.querySelectorAll('.clientchecked')[index].checked=true;
	       			}else{
	       				document.querySelectorAll('.clientchecked')[index].checked=false;	
	       			}
			})
		}else{
			this.setState({noDataforTable:true})
		}
	}


	onEditorStateChange=(editorState) => {
	    this.setState({
	      editorState,
	    });
   this.props.getsummernote(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
	   
  }
  	componentDidMount(){
  		let self=this;
  		if(this.props.getAnnouncementDetailsforEdit!==undefined && this.props.getAnnouncementDetailsforEdit.node.field_news_feed_type[0].tid!==''){
  			setTimeout(()=>{
	  			document.querySelectorAll(".announcment-type").forEach((item,index)=>{
	  				if(item.getAttribute("id")===self.props.getAnnouncementDetailsforEdit.node.field_news_feed_type[0].tid){
		  				item.parentNode.classList.add("active")
						item.classList.add("active")
					  if(self.props.getAnnouncementDetailsforEdit.node.field_news_feed_type[0].tid==="4"){
					  	self.setState({hidedefaultimageblock:true});
					  }
	  				}
	  			})
	  			self.setState({loader:false})
  			},2000)
  		this.setState({newuserPic_id:this.props.getAnnouncementDetailsforEdit.node.field_image.fid!=='' ? this.props.getAnnouncementDetailsforEdit.node.field_image.fid : null,announcement_image:this.props.getAnnouncementDetailsforEdit.node.field_image.url!=='' ? this.props.getAnnouncementDetailsforEdit.node.field_image.url : null})
  		}else{
  			setTimeout(()=>{
	  			document.querySelector(".announcment-type").parentNode.classList.add("active")
				document.querySelector(".announcment-type").classList.add("active");
				self.setState({loader:false})
			},2000);
		}
		this.client_data_Table();
  	}
  	//nid?_format=json
  	updateAnnouncementDetails=(e)=>{
  		e.preventDefault();
  		let options;
  		let singlecheckedArray=[];
		document.querySelectorAll(".clientchecked:checked").forEach((item,index)=>{
				singlecheckedArray.push({"target_id":item.value});
		});
  		if(this.state.editorState.getCurrentContent()!==null && document.querySelector("#Button_link").value!==''){
			let options;
			if(hasValidUrl(document.querySelector("#Button_link").value)){
				this.setState({validbuttonlink:false});
				if(document.getElementById("announcement-image") && document.querySelector("#announcement-image").getAttribute("data-id")!==''){
					options={
					    "title":[{"value":document.querySelector("#Title").value}],
				        "body":[{"value": draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
				        		 "format": "basic_html"}],
				        "type":[{"target_id":"article"}],
				        "field_news_feed_button":[{"uri":document.querySelector("#Button_link").value,"title":document.querySelector("#Button_Copy").value ,"options": []}],
				        "field_news_feed_type":[{"target_id":document.querySelector(".announcment-type.active").getAttribute("id")}],
				        "field_image":[{"target_id":document.querySelector("#announcement-image").getAttribute("data-id")}],
				        "field_client":singlecheckedArray
				}
			}else{
				options={
				    "title":[{"value":document.querySelector("#Title").value}],
			        "body":[{"value": draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
			        		 "format": "basic_html"}],
			        "type":[{"target_id":"article"}],
			        "field_news_feed_button":[{"uri":document.querySelector("#Button_link").value,"title":document.querySelector("#Button_Copy").value ,"options": []}],
			        "field_news_feed_type":[{"target_id":document.querySelector(".announcment-type.active").getAttribute("id")}],
			        "field_client":singlecheckedArray
				}
			}
			console.log(options);
			fetch(Admin.Admin_update_aanouncement_details.url+`${this.props.getAnnouncementId}?_format=json`,{
		         method:Admin.Admin_update_aanouncement_details.method,
				headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                body:JSON.stringify(options)
		            }).then(res=>{
		            	return res.json();
		            }).then(data=>{
		            	console.log(data);
		            		this.setState({opensubmissionpopup:true,formempty:false})
		            })
		       }else{
		       		this.setState({validbuttonlink:true,formempty:false});
		       }
		    }else{
		    	this.setState({formempty:true})
		    }
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
				fetch(Admin.AdminAnnouncementaddimage.url,requestOptions)
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
		let self=this;
		if(getannouncementid==="4"){
			this.setState({hidedefaultimageblock:true})
		}else{
			this.setState({hidedefaultimageblock:false})
		}
		//hidedefaultimageblock
		setTimeout(()=>{
			document.querySelectorAll(".announcment-type").forEach((item,index)=>{
				item.classList.remove("active");
				item.parentNode.classList.remove("active");
				document.querySelectorAll(".announcment-type")[value].parentNode.classList.add("active");
				document.querySelectorAll(".announcment-type")[value].classList.add("active");
			});
			self.setState({loader:false})
		},2000);
	}

	check_view_page_call=(viewpagecalled)=>{
		console.log(viewpagecalled);
		this.props.checkCallback(false);
	}

	  client_data_Table=()=>{
		fetch(Admin.AdminAnnouncementclienttable.url,{
			headers: {
                	"Content-Type" : "application/json",
                	"X-CSRF-Token" : localStorage.getItem("access-token"),
                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
                },
		}).then(res=>res.json()).then(data=>this.setState({repclientdata:data,loader:false}));

	}

	render(){
		console.log(this.props.getAnnouncementDetailsforEdit);
		return(
			<>

				{!this.state.loader ? 
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
				<div className="anouncements-form">
				   <form onSubmit={(e)=>e.preventDefault()}>
				      <div className="form-group">
				         <label>Title</label>
				         <input type="text" name="Title" id="Title" placeholder="Title" defaultValue={this.props.getAnnouncementDetailsforEdit!==undefined  && this.props.getAnnouncementDetailsforEdit.node.field_news_feed_type!=='' ?  this.props.getAnnouncementDetailsforEdit.node.field_news_feed_type[0].title : ''} /> 
				      </div>
				      <div className="form-group">
				         <label>Subheading</label>
				         <input type="text" name="Subheading" id="Subheading" placeholder="Subheading" defaultValue={this.props.getAnnouncementDetailsforEdit!==undefined  && this.props.getAnnouncementDetailsforEdit.node.title!=='' ?  this.props.getAnnouncementDetailsforEdit.node.title : ''}/> 
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
				         <input type="text" name="Button Copy" id="Button_Copy" placeholder="Button Copy" defaultValue={this.props.getAnnouncementDetailsforEdit!==undefined  && this.props.getAnnouncementDetailsforEdit.node.field_news_feed_button!=='' ?  this.props.getAnnouncementDetailsforEdit.node.field_news_feed_button.title : ''}/> 
				      </div>
				      <div className="form-group">
				         <label>Button link</label>
				         <input type="text" name="Button link" id="Button_link" placeholder="Button link" defaultValue={this.props.getAnnouncementDetailsforEdit!==undefined  && this.props.getAnnouncementDetailsforEdit.node.field_news_feed_button!=='' ?  "http:/"+this.props.getAnnouncementDetailsforEdit.node.field_news_feed_button.url : ''} onBlur={(e)=>hasValidUrl(e.target.value) ? this.setState({validbuttonlink:false}): this.setState({validbuttonlink:true})}/>
			         {this.state.validbuttonlink ? ValidationMsg.common.default.announcementbuttonlink : ''}
				      </div>
					{this.props.getAnnouncementDetailsforEdit!==undefined && <Adminclienttabledata clientdataTable={this.state.repclientdata} forUpdateClient={this.props.getAnnouncementDetailsforEdit.node.field_client}/>}
					{this.props.getAnnouncementDetailsforEdit!==undefined? 
				      <div className="btn-block add-client">
                        <button className="btn common-btn-blue" onClick={this.updateAnnouncementDetails}>
                                  <span>Upadate announcement</span></button>
							<Link to={""} onClick={((e)=>{e.preventDefault();this.check_view_page_call(false)})} className="back-dashboard btn common-btn-blue"><span>Back</span></Link>
					</div>:''}
				   </form>
				</div>

				{this.state.formempty ? 
											<>
												{ValidationMsg.common.default.fieldsEmptyAnnoucementform}
											</>
											:
											''
										}
				{this.state.opensubmissionpopup ? 
											<div id="modal" className="modal-container">
												<div className="modal d-flex flex-wrap align-center justify-center">
													<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({opensubmissionpopup:false});
														this.check_view_page_call(false)

													})}
													className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
													
												<div>
													<img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
                  										 <h2>Announcement updated successfully.</h2>
                  										 <div className="btn-block">
																<button className="btn common-btn-blue" onClick={((e)=>{e.preventDefault();this.setState({opensubmissionpopup:false});
																this.check_view_page_call(false)
													})}><span>OK</span></button>	
														</div>
												</div>
												</div>
											</div>
								: <></>}
				</>
					:
			 	 <>
					{cosmaticAsset.cosmatic.default.loader}
				</>
				}
			</>
			);
	}
}

export default Adminannouncementadd;
