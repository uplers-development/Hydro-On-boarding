import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import ThumbnailImage from '../../../images/thumbnail-image.png';
import {ValidationMsg} from'../../constants/validationmsg';


class Adminresourceadd extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	producttagChanged:'',
      	imageFormateState:false,
      	doucmentformatestate:false,
      	fileuploadedname:'',
     	fid:'',
     	uploadedresourceimage:'',
     	newresourceimageid:null,
     	smallLoader:false
      }
      this.productTaginput=React.createRef();
	  this.productTag=this.productTag.bind(this);
	  this.clearProductTag=this.clearProductTag.bind(this);
   }

   productTag=(e)=>{
    e.preventDefault();
    console.log(this.productTaginput.current.value);
    if(this.productTaginput.current.value!=='') {
          
          let status;
          fetch(Admin.adminresourceProducttags.url,{
          		headers: {
                       "Content-Type" : "application/json",
                       "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                 },
                 method:Admin.adminresourceProducttags.method
          }).then(res=>{
          	status=res.status;
          	return res.json();
          }).then(data=>{
          	if(status===200){
          		console.log(data);
          		   this.state.productSuggestion=[];
          		   data.filter((value,index,array)=>{
			            if(value.name.match(this.productTaginput.current.value)){
				              console.log(value);
				              this.state.productSuggestion.push(value)
			            }else{
			            	this.setState({producttagChanged:''})
			            }
		        	})

			       let suggestionforproduct=this.state.productSuggestion.map((item,index)=>{
			                                  return (<li key={index}>
			                                     <Link to={""} title={ReactHtmlParser(item.name)}onClick={(e)=>this.productId(e,item.name,item.tid)}>{ReactHtmlParser(item.name)}</Link> 
			                                  </li>)
			                                }) 
		      		this.setState({producttagChanged:suggestionforproduct})
			      console.log(this.state.productSuggestion);
			    }else{
			          this.setState({producttagChanged:''})
			        }


          		
          })
    }else{
		this.setState({producttagChanged:''})
    }
}



	upload_resource_document=(e)=>{
		var fullPath = e.target.files[0];
	      var exactfile=e.target.value;
	      var filename='';
         if (exactfile) {
             var startIndex = (exactfile.indexOf('\\') >= 0 ? exactfile.lastIndexOf('\\') : exactfile.lastIndexOf('/'));
             filename = exactfile.substring(startIndex);
             if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                 filename = filename.substring(1);
                 this.setState({fileuploadedname:filename})
             }
             console.log(filename);
             if(filename.includes(".docx") || filename.includes(".pptx") || filename.includes(".ppt")|| filename.includes(".doc")|| filename.includes(".pdf")|| filename.includes(".txt")){
               this.setState({doucmentformatestate:false})
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
                  fetch(Admin.adminresourceAdddocument.url,requestOptions)
                  .then(res=>{return res.json()})
                  .then(data=>{
                     console.log(data);
                     this.setState({fid:data.fid[0].value});
                  })
		      }else{
		         this.setState({doucmentformatestate:true})   
		     }
  		}
	}


	update_resource_image=(e)=>{
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
				fetch(Admin.adminresourceAddimage.url,requestOptions)
				.then(res=>{return res.json()})
				.then(data=>{console.log(data);
					this.setState({smallLoader:false,newresourceimageid:data.fid[0]['value'],uploadedresourceimage:site_url+data.uri[0].url})
					console.log(this.state.newresourceimageid);
					console.log(this.state.uploadedresourceimage);
				})
	  }else{
	  	this.setState({smallLoader:false,imageFormateState:true})	
	  }
	}


      productId=(e,title,gid)=>{
		    e.preventDefault();
		      var node = document.createElement("SPAN");
		            node.classList.add("emailall");
		            var node2=document.createElement("SPAN");
		            node2.classList.add("remove-email");
		            node.appendChild(node2).addEventListener("click",this.clearProductTag,true);
		            var textnode = document.createTextNode(title);
		            var id=document.createAttribute("nid");
		            id.value=gid;
		            node.appendChild(textnode);
		            node.setAttributeNode(id);
		            this.setState({producttagChanged:''});
		            this.productTaginput.current.value='';
		            document.querySelector(".shareall-email").appendChild(node);
		            if(document.querySelectorAll(".shareall-email .emailall").length>0){
		                document.querySelector("#product-tags").removeAttribute("placeholder")
		            }
		            this.productTaginput.current.focus();

 	 }

  clearProductTag =(e)=>{  
    e.preventDefault();
    e.target.parentNode.remove();
    this.productTaginput.current.focus();
     if(document.querySelectorAll(".shareall-email .emailall").length<=0){
          document.querySelector("#product-tags").setAttribute("placeholder","Product tags")
      }

}



   render(){
   		return(
   			<div className="d-flex flex-wrap admin-add-resources">
				   <div className="container">
				      <form>
				         <div className="upload-doc-block">
				            <div className="form-group d-flex flex-wrap align-center">
				               <label>Title*</label>
				               <div className="input-box">
				                  <input type="text" name="Title" id="title" placeholder="Title" />
				               </div>
				            </div>
				            <div className="form-group d-flex flex-wrap align-center">
				               <label>Description*</label>
				               <div className="input-box">
				                  <input type="text" name="Description" id="description" placeholder="Description"/>
				               </div>
				            </div>
				           {/* <div className="form-group d-flex flex-wrap align-center">
				           				               <label>Product tags*</label>
				           				               <div className="input-box">
				           				                  <input type="text" name="Product tags" id="product-tags" ref={this.productTaginput} onChange={this.productTag} />
				           				               </div>
				           				            </div>*/}
				            <div className="form-group d-flex flex-wrap align-center">
		                        <label>Product tags*</label>
	  								<div className="input-box suggestion">
	  									<div className="shareall-email">
	  									
	  									</div>
  		                        <input type="text" name="product-tags" placeholder="Product tags" id="product-tags" ref={this.productTaginput} onChange={this.productTag}/>
              								  <ul className="search-detail">
              									   {this.state.producttagChanged}
              								</ul>	
							             	</div>	
		                     </div>
				            <div className="upload-btn-block">
				            <span className='suggestion-file-name'>txt, pdf, doc, ppt, pptx, docx.</span>
				               <div className="upload-btn-wrapper">
				                  <input type="file" name="Upload Document" onChange={this.upload_resource_document}/>
				                  <button className="btn wide common-btn-blue">
				                  <span >Upload Document</span></button>
				               </div>
				                  <span className='document-item document-item-contract' get-id={this.state.fid}>{this.state.fileuploadedname}</span>
				                  {this.state.doucmentformatestate ? ValidationMsg.common.default.imageformate : ''}
				            </div>
				         </div>

				         <div className="upload-thumbnail d-flex flex-wrap">
					            <div className="upload-btn-block">
					            <span>JPG, GIF or PNG. Max size of 1mb</span>
					               <div className="upload-btn-wrapper">
					                  <input type="file" name="Upload thumbnail" id="resource-image" onChange={this.update_resource_image} data-id={this.state.newresourceimageid}/>
					                  <button className="btn wide common-btn-blue">
					                  <span>Upload thumbnail</span></button>
					                  {this.state.imageFormateState ? ValidationMsg.common.default.imageformate : ''}
					               </div>
					            </div>
					            {this.state.smallLoader ? 
										<div className="loader"></div>
									:
				            	<div className="upload-thumbnail-img bg-cover" style={{backgroundImage: `url(${this.state.uploadedresourceimage!=='' ? this.state.uploadedresourceimage : ThumbnailImage})`}}></div>
				            }
				   		</div>
					   <div className="btn-block">
						   <button className="btn wide common-btn-blue">
						   <span>Add Resource</span></button>
					   </div>
				  	 </form>
				</div>
			</div>
   			)
   }
}

export default Adminresourceadd;