import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url,Repclient} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import{hasValidDate,hasNumeric} from '../../validation';
import hydroImage from '../../../images/hydro-biofilter-product.jpg';
import {ValidationMsg} from'../../constants/validationmsg';
 
 
let Suggestionbox,sameIdArray=[];
class Repaddcontract extends React.Component{
	constructor(props){
		super(props);
		this.state={
			openPopup:false,
			imageFormateState:false,
     	fileuploadedname:'',
     	fid:'',
	    producttagChanged:'',
      productSuggestion:[],
      fields_are_empty:false,
      purchseDatempty:false,
      duplicateProducts:false,
      contractType:[],
      showuploadbox:false,
      showsharepoint:false,
  	}
    console.log(this.state.suggestions);
    console.log(this.props.productDataList);
		console.log(this.props.checkcontractfrom);
		console.log(this.props.senduid);
    this.productTaginput=React.createRef();
    this.contractype=React.createRef();
    this.sharepoint=React.createRef();
    this.addContract=this.addContract.bind(this);
    this.productTag=this.productTag.bind(this);
    this.clearProductTag=this.clearProductTag.bind(this);

	}

	componentDidMount(){
		console.log(this.props.senduid)
    this.contracttypes();
	}


  contracttypes=()=>{
      fetch(Repclient.contracttypes.url,{
         headers:{
                  "Content-Type" : "application/json",
                  "X-CSRF-Token" : localStorage.getItem("access-token"),
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Repclient.contracttypes.method,
     }).then(res=>{return res.json()}).then(data=>{
                   console.log(data);
                   this.setState({contractType:data});
                 });
  }

	get_uploaded_file_path=(e)=>{
      var fullPath = e.target.files[0];
      var exactfile=e.target.value;
      var filename='';
      this.setState({showuploadbox:true})
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
                  fetch(Repclient.RepAddcontractuploadfile.url,requestOptions)
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
    let productTagsId=[];
    let contractoptions;
      document.querySelectorAll(".shareall-email .emailall").forEach((item,index)=>{
          productTagsId.push({"target_id":item.getAttribute("nid")});
      })
        if(document.querySelector('.document-item-contract') !== null){
  	    contractoptions={
              "title":[{"value":document.querySelector("#title").value}],
              "type":[{"target_id":"contracts"}],
              "field_contract_document_type":[{"target_id":this.contractype.current.value}],
              "field_contract_document":[{"target_id":document.querySelector(".document-item-contract").getAttribute("get-id")}],
              "field_contract_expiry":[{"value":document.querySelector("#expirydate").value}],
              "field_sub_title":[{"value":document.querySelector("#description").value}],
              "field_contract_for_products":productTagsId,/*PRoduct tags Id*/
              "field_contract_for_client":[{"target_id":this.props.senduid}]
          }   
        }else{
            contractoptions={
              "title":[{"value":document.querySelector("#title").value}],
              "type":[{"target_id":"contracts"}],
              "field_contract_document_type":[{"target_id":this.contractype.current.value}],
              "field_contract_expiry":[{"value":document.querySelector("#expirydate").value}],
              "field_contract_document_external":[{"uri":document.querySelector("#sharepoint-url").value ,"title":"","options": []}],
              "field_sub_title":[{"value":document.querySelector("#description").value}],
              "field_contract_for_products":productTagsId,/*PRoduct tags Id*/
              "field_contract_for_client":[{"target_id":this.props.senduid}]
          } 
        }
       if(document.querySelector("#expirydate").value!=='' || document.querySelector("#title").value!=='' || document.querySelector("#description").value!=='' || document.querySelector("#sharepoint-url").value!=='' || document.querySelector(".document-item-contract").getAttribute("get-id")!=='' && !this.state.duplicateProducts){
        	 fetch(Repclient.Repclientdetailssubmissionproductlist.url,{
                            method:Repclient.Repclientdetailssubmissionproductlist.method,
                            headers: {
                               "Content-Type" : "application/json",
                               "X-CSRF-Token" : localStorage.getItem("access-token"),
                               "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                             },
                             body:JSON.stringify(contractoptions)
                      }).then(res=>{
                        return res.json()
                      }).then(data=>{
                      	this.setState({openPopup:true,fields_are_empty:false});
                          console.log(data);
                })
         }else{
           this.setState({fields_are_empty:true})
         }
  }

  productTag=(e)=>{
    e.preventDefault();
    console.log(this.productTaginput.current.value.toUpperCase());
    if(this.productTaginput.current.value!=='') {
          this.state.productSuggestion=[];
        this.props.productDataList.filter((value,index,array)=>{
            if(value.title.toUpperCase().match(this.productTaginput.current.value.toUpperCase())){
              console.log(value);
              this.state.productSuggestion.push(value)
            }
        })

       let suggestionforproduct=this.state.productSuggestion.map((item,index)=>{
                                  return (<li key={index}>
                                     <Link to={""} onClick={(e)=>this.productId(e,item.title,item.nid)}>{item.title}</Link> 
                                  </li>)
                                }) 
      this.setState({producttagChanged:suggestionforproduct})
      console.log(this.state.productSuggestion);
        }else{
          this.setState({producttagChanged:''})
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
            sameIdArray=[];
                document.querySelectorAll(".shareall-email .emailall").forEach((item,index)=>{
                  sameIdArray.push(item.getAttribute("nid"));
                  //console.log(item.getAttribute("nid").length );
                })
                console.log(sameIdArray);
                if(sameIdArray.length !== new Set(sameIdArray).size) {
                this.setState({duplicateProducts:true})
          }else{
            console.log(false)  ;
            this.setState({duplicateProducts:false})
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
      sameIdArray=[];
          document.querySelectorAll(".shareall-email .emailall").forEach((item,index)=>{
            sameIdArray.push(item.getAttribute("nid"));
          })
          console.log(sameIdArray);
          if(sameIdArray.length === new Set(sameIdArray).size) {
          this.setState({duplicateProducts:false})
      }

}

	render(){
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
		                        <label>Expiry date</label>
      								<div className="input-box">
      		            <input type="date" name="expirydate" placeholder="Expiry date" id="expirydate"  onBlur={((e)=>{
                                             hasValidDate(e.target.value) ? this.setState({purchseDatempty:true}) : this.setState({purchseDatempty:false}) 
                                       })}/>
                      {this.state.purchseDatempty ? ValidationMsg.common.default.contractexpirydate : ''}
      									</div>
                   </div>
		                     <div className="form-group">
		                        <label>Product tags</label>
              								<div className="input-box suggestion">
              									<div className="shareall-email">
              									
              									</div>
  		                        <input type="text" name="product-tags" autoComplete="off" placeholder="Product tags" id="product-tags" ref={this.productTaginput} onChange={this.productTag}/>
              								  <ul className="search-detail">
              									   {this.state.producttagChanged}
              								</ul>	
								        
							             	</div>	

                            {this.state.duplicateProducts ? ValidationMsg.common.default.resourceduplicateproduct : ''} 
		                     </div>
		                    {!this.state.showuploadbox ?  
                          <div className="form-group">
                            <label>Sharepoint URL</label>
                              <div className="input-box">
                                          <input type="text" name="sharepoint-url"  placeholder="Sharepoint URL" ref={this.sharepoint} id="sharepoint-url" onChange={((e)=>{
                                            e.preventDefault();
                                            this.sharepoint.current.value!=='' ? this.setState({showsharepoint:true}) : this.setState({showsharepoint:false});
                                          })}/>
                                </div> 
                  </div>:''}
                   <div className="form-group">
		                        <label>Type of Contract</label>
								            <div className="input-box">
                             <select name="1" className="" tabIndex="0" id="type-of-contract" ref={this.contractype} >
                                {this.state.contractType.map((item,index)=>
                          <option key={index} value={item.tid}>{ReactHtmlParser(item.name)}</option>
                                )}
                            </select>
									          </div>
		                     </div>
                         {!this.state.showsharepoint ? 
		                    <div className="btn-block">
                                        <span className='suggestion-file-name'>txt, pdf, doc, ppt, pptx, docx.</span>
                                       <div className="upload-btn-wrapper">
                                          <input type="file" name="Upload Document" onChange={this.get_uploaded_file_path}/>
                                          <button className="btn common-btn-blue">
                                          <span>Upload Document</span></button>

                                          
                                       </div>
<span className='document-item document-item-contract' get-id={this.state.fid}>{this.state.fileuploadedname}</span>
                                       {this.state.imageFormateState ? ValidationMsg.common.default.imageformate : ''}
                                    </div>
                                    : ''}
		                  </form>
		               </div>
		            </div>
		           {this.props.checkcontractfrom ? 
		              <>
                  <div className="btn-block add-client">
                        <div className="upload-btn-wrapper">
                           <button className="btn common-btn-blue" onClick={this.addContract}>
                           <span>Add new contract</span></button>
                            <Link to={""} onClick={((e)=>{e.preventDefault();
                             this.props.historyPush.history.push({
                                         pathname:localStorage.getItem("redirection-pathname")==='/Announcements' ? '/Announcements' : '/RepClients',
                                         state:{
                                           contractsubmission:true,
                                           targetSendid:this.props.senduid
                                         }
                                      })
                          })} className="back-dashboard">Back</Link>
                        </div>
                     </div>
                    {this.state.fields_are_empty  ? ValidationMsg.common.default.addproductfieldnotvalid :''}
                    </> :
                     ""}
                     {this.state.openPopup ? 
    			             <div id="modal" className="modal-container">
    			               <div className="modal d-flex flex-wrap align-center justify-center">
    			                 <Link to={""} onClick={((e)=>{e.preventDefault();
                            this.setState({openPopup:false});
                            this.props.historyPush.history.push({
                                pathname:"/RepClients",
                                state:{
                                  contractsubmission:true,
                                  targetSendid:this.props.senduid
                                }
                              })
                            })}
    			                 className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
    			                 
    			               <div>
			                 <img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
			                   <h2>Contract added</h2>
			                   <p>Contract details were submitted successfully</p>
                         <div className="btn-block add-client">
                        <div className="upload-btn-wrapper">
                           <button className="btn common-btn-blue" onClick={((e)=>{e.preventDefault();
                            this.setState({openPopup:false});
                            this.props.historyPush.history.push({
                                pathname:"/RepClients",
                                state:{
                                  contractsubmission:true,
                                  targetSendid:this.props.senduid
                                }
                              })
                            })}>
                           <span>OK</span></button>
                        </div>
                     </div>
			               </div>
			               </div>
			             </div>
			             : <></>}
        	 </div>
			)
	}
}

export default Repaddcontract;