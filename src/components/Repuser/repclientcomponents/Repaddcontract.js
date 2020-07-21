import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 
import hydroImage from '../../../images/hydro-biofilter-product.jpg';
import scrollToComponent from 'react-scroll-to-component';
import {ValidationMsg} from'../../constants/validationmsg';
import { WithContext as ReactTags } from 'react-tag-input';
 
const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma,KeyCodes.enter,KeyCodes.tab];

class Repaddcontract extends React.Component{
	constructor(props){
		super(props);
		this.state={
			openPopup:false,
			imageFormateState:false,
         	fileuploadedname:'',
         	fid:'',
          tags: [
               
             ],
            suggestions: [
              // this.props.productDataList
                { uid: 'USA', text: 'USA',name:'djfjdf',props:'sdfbsdfj' },
                { uid: 'Germany', text: 'Germany',name:'djfjdf',props:'sdfbsdfj' },
                { uid: 'Austria', text: 'Austria',name:'djfjdf',props:'sdfbsdfj' },
                { uid: 'Costa Rica', text: 'Costa Rica',name:'djfjdf',props:'sdfbsdfj' },
                { uid: 'Sri Lanka', text: 'Sri Lanka',name:'djfjdf',props:'sdfbsdfj' },
                { uid: 'Thailand', text: 'Thailand',name:'djfjdf',props:'sdfbsdfj' }
          ]
		}
    console.log(this.state.suggestions);
    console.log(this.props.productDataList);
		console.log(this.props.checkcontractfrom);
		console.log(this.props.senduid);
		this.addContract=this.addContract.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
	}


	componentDidMount(){
		console.log(this.props.senduid)
	}

	get_uploaded_file_path=(e)=>{
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
                  fetch("http://staging.project-progress.net/projects/hydro/file/upload/node/product_purchase/field_purchase_doument?_format=json",requestOptions)
                  .then(res=>{return res.json()})
                  .then(data=>{
                     console.log(data);
                     this.setState({fid:data.fid[0].value});
                  })
      }else{
         this.setState({imageFormateState:true})   
     }
  		}
    }

    addContract=(e)=>{
    	   let contractoptions={
                "title":[{"value":document.querySelector("#title").value}],
                "type":[{"target_id":"contracts"}],
                //"field_contract_document_type":[{"target_id":"tid"}],
                "field_contract_document":[{"target_id":document.querySelector(".document-item-contract").getAttribute("get-id")}],
                //"field_contract_expiry":[{"value":"2020-07-02"}],
                "field_sub_title":[{"value":document.querySelector("#description").value}],
                "field_contract_for_products":[{"target_id":"24"},{"target_id":"34"}],/*PRoduct tags Id*/
                "field_contract_for_client":[{"target_id":this.props.senduid}]
            }   


       if(document.querySelector("#title").value!=='' || document.querySelector("#description").value!=='' || document.querySelector("#product-tags").value!==''|| document.querySelector("#sharepoint-url").value!=='' || document.querySelector(".document-item-contract").getAttribute("get-id")!==''){
    	 fetch(`${base_url}node?_format=json`,{
                        method:"POST",
                        headers: {
                           "Content-Type" : "application/json",
                           "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                         },
                         body:JSON.stringify(contractoptions)
                  }).then(res=>{
                    return res.json()
                  }).then(data=>{
                  	this.setState({openPopup:true});
                      console.log(data);
            })
         } 
    }

	handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
        
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }

	render(){
      const { tags, suggestions } = this.state;
		return(
			   <div className="add-contract">
		            <div className="container">
		               <div className="pro-title d-flex flex-wrap align-center">
		                  <div className="name-of-heading d-flex flex-wrap align-center">
		                     <img src={require("../../../images/contracts-logo-blue.svg")} alt="contract-logo"/>
		                     <h3>Add contract</h3>
		                  </div>
		               </div>
		               <div className="form-contracts">
		                  <form  onSubmit={(e)=>e.preventDefault()}>
		                     <div className="form-group">
		                        <label>Title</label>
<div className="input-box">
		                        <input type="text" name="Title" placeholder="Title" id="title" />
									</div>
		                     </div>
		                     <div className="form-group">
		                        <label>Description</label>
								<div className="input-box">
		                        <input type="text" name="description" placeholder="Description" id="description" />
									</div>
		                     </div>
		                     <div className="form-group">
		                        <label>Product tags</label>
                            {/*  <ReactTags tags={tags}
                                                              suggestions={suggestions}
                                                              handleDelete={this.handleDelete}
                                                              handleAddition={this.handleAddition}
                                                              handleDrag={this.handleDrag}
                                                              delimiters={delimiters} />*/}
								<div className="input-box suggestion">
									<div className="shareall-email">
									<span className="emailall"><span className="remove-email"></span>es@gmail.com</span>
										</div>
		                        <input type="text" name="product-tags" placeholder="Product tags" id="product-tags"/>
								<ul className="search-detail">
									<li>
									<a href="#">Test</a> 
									</li>
								</ul>	
								
								</div>	
		                     </div>
		                     <div className="form-group">
		                        <label>Sharepoint URL</label>
								<div className="input-box">
		                        <input type="text" name="sharepoint-url"  placeholder="Sharepoint URL" id="sharepoint-url"/>
									</div>
		                     </div>
		                    <div className="btn-block">
                                        <span className='suggestion-file-name'>txt, pdf, doc, ppt, pptx, docx.</span>
                                       <div className="upload-btn-wrapper">
                                          <input type="file" name="Upload Document" onChange={this.get_uploaded_file_path}/>
                                          <button className="btn common-btn-blue">
                                          <span>Upload Document</span></button>

                                          <span className='document-item document-item-contract' get-id={this.state.fid}>{this.state.fileuploadedname}</span>
                                       </div>
                                       {this.state.imageFormateState ? ValidationMsg.common.default.imageformate : ''}
                                    </div>
		                  </form>
		               </div>
		            </div>
		           {this.props.checkcontractfrom ? 
		            <div className="btn-block add-client">
                        <div className="upload-btn-wrapper">
                           <button className="btn common-btn-blue" onClick={this.addContract}>
                           <span>Add new contract</span></button>
                        </div>
                     </div>:
                     ""}
                     {this.state.openPopup ? 
			             <div id="modal" className="modal-container">
			               <div className="modal d-flex flex-wrap align-center justify-center">
			                 <Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})})}
			                 className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
			                 
			               <div>
			                 <img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
			                   <h2>Contract added</h2>
			                   <p>Contract details were submitted successfully</p>
			               </div>
			               </div>
			             </div>
			             : <></>}
        	 </div>
			)
	}
}

export default Repaddcontract;