import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 
import hydroImage from '../../../images/hydro-biofilter-product.jpg';
import scrollToComponent from 'react-scroll-to-component';
import ReactHtmlParser from 'react-html-parser';
import{hasValidDate,hasNumeric} from '../../validation';
import {ValidationMsg} from'../../constants/validationmsg';
let object={};
let productList=[];

class Repaddproduct extends React.Component{
	constructor(props){
		super(props);
		this.state={
			purchaseProductList:[],
         purchseDatempty:false,
         msgforpurchasedate:'',
         costState:false,
         itemidState:false,
         fileuploadedname:'',
         imageFormateState:false,
         fid:'',
         openPopup:false,
         checkboxnotchecked:false,
         fieldsNotvalid:false,
		}
      this.clientProductSearch = React.createRef();
      this.openAccordian=this.openAccordian.bind(this);
      this.selectBoxChecked=this.selectBoxChecked.bind(this);
      this.Search_client_Product_Details=this.Search_client_Product_Details.bind(this);
      this.get_uploaded_file_path=this.get_uploaded_file_path.bind(this);
      this.addProduct=this.addProduct.bind(this);
      console.log(this.props.senduid)
	} 

	componentDidMount(){
      this.Get_Product_details();
	}

   openAccordian=(e)=>{
      e.preventDefault();
      console.log(e.target.parentNode.parentNode);
      if(!e.target.parentNode.parentNode.classList.contains("active")){
         document.querySelectorAll(".list-box").forEach((item,index)=>{
            if(item.classList.contains("active")){item.classList.remove("active")}
         })
         e.target.parentNode.parentNode.classList.add("active");
      }else{
         e.target.parentNode.parentNode.classList.remove("active");
      }


   }

   get_uploaded_file_path=(e)=>{
      var fullPath = e.target.files[0];
      var exactfile=e.target.value;
      console.log(e.target)
      let fileElement=e.target;
      var node;
      let textnode;
      var filename='';
         if (exactfile) {
             var startIndex = (exactfile.indexOf('\\') >= 0 ? exactfile.lastIndexOf('\\') : exactfile.lastIndexOf('/'));
             filename = exactfile.substring(startIndex);
             if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                 filename = filename.substring(1);
                 this.setState({fileuploadedname:filename});
                 console.log(fileElement.parentNode.parentNode.childNodes);
                 if(fileElement.parentNode.parentNode.childNodes[3]){
                    fileElement.parentNode.parentNode.childNodes[3].remove();
                    node = document.createElement("SPAN");
                  node.classList.add("document-item");
                  textnode=document.createTextNode(filename);
                  node.appendChild(textnode);
                  console.log(fileElement.parentNode.parentNode);
                  fileElement.parentNode.parentNode.appendChild(node);

                 }else{
                  node = document.createElement("SPAN");
                  node.classList.add("document-item");
                  textnode=document.createTextNode(filename);
                  node.appendChild(textnode);
                  console.log(fileElement.parentNode.parentNode);
                  fileElement.parentNode.parentNode.appendChild(node);
                }
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
                      var id=document.createAttribute("get-id");
                      id.value=data.fid[0].value;
                      node.setAttributeNode(id);
                  })
      }else{
         this.setState({imageFormateState:true})   
     }
    }
   }

   Search_client_Product_Details=(e)=>{
      if(this.clientProductSearch.current.value!==''){
         fetch(`https://staging.project-progress.net/projects/hydro/jsonapi/add_products?_format=json&title=${this.clientProductSearch.current.value}`,{
             headers:{
                     "Content-Type" : "application/json",
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
             },
             method:"GET",
         }).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.length>0){
               this.setState({purchaseProductList:data})
               document.querySelectorAll(".right-prod-upload form").forEach((item,index)=>{
                  item.reset();
               })
               document.querySelectorAll(".productcheck:checked").forEach((item,index)=>{
                  item.checked=false;
               })
            }else{
            }
         });
       }else{
         this.Get_Product_details();
       }
      }


   Get_Product_details=()=>{
       try{
         fetch(`${base_url}jsonapi/add_products?_format=json`,{
               headers: {
                     "Content-Type" : "application/json",
                     "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                   },
         }).then(res=>{
            return res.json();
         }).then(data=>{
            console.log(data);
            this.setState({purchaseProductList:data});
            this.props.getProductList(true,this.state.purchaseProductList);
         })
      }catch(err){
         console.log(err);
      }
   }

   selectBoxChecked=(e)=>{
      document.querySelectorAll(".list-box").forEach((item,index)=>{
            if(item.classList.contains("checked")){item.classList.remove("checked")}
      })
      document.querySelectorAll(".productcheck:checked").forEach((item,index)=>{
         console.log(item.parentNode.parentNode.parentNode)
         item.parentNode.parentNode.parentNode.classList.add("checked")
      }) 
   }

   addProduct=(e)=>{
      e.preventDefault();
      console.log(document.querySelectorAll(".list-box.checked").length);
      let newArray=[]; 
      let valuecheck=false;
      if(document.querySelectorAll(".list-box.checked").length>0){
         document.querySelectorAll(".checked form input").forEach((item,index)=>{
            newArray.push(item);            
         })

         newArray.forEach((ele,index)=>{
          if(ele.value!==''){
            valuecheck=true;
          }
        });

         if(valuecheck){   
                productList = []; 
                 document.querySelectorAll(".list-box.checked").forEach((item,index)=>{
                    let productdata = [];
                    object = {};
                    let title = document.querySelectorAll(".checked .title h4")[index].textContent;
                    let purchase = document.querySelectorAll(".checked .purchase")[index].value;
                    let productcheck = document.querySelectorAll(".checked .productcheck")[index].value;
                    let seller = document.querySelectorAll(".checked .seller")[index].value;
                    let cost = document.querySelectorAll(".checked .cost")[index].value;
                    let item_id = document.querySelectorAll(".checked .item-id")[index].value;
                    let file_id = this.state.fid!== '' && document.querySelectorAll(".checked .document-item")[index] ? document.querySelectorAll(".checked .document-item")[index].getAttribute("get-id") : '';
                       object['title'] =  [{"value": title}];
                       object['field_purchase_date'] =  [{"value":purchase}];
                       object['field_product'] = [{"target_id":productcheck}];
                       object['field_seller'] =  [{"value":seller}];
                       object['field_cost'] =  [{"value":cost}];
                       object['field_item_id'] = [{"value":item_id}];  
                       object['field_purchase_doument']=[{"target_id":file_id}]
                       object['type']=[{"target_id":"product_purchase"}];
                       object['field_user']=[{"target_id":this.props.senduid}];
                       productList.push(object);
                 });  
            console.log(productList);
            productList.map((item,index)=>{
                if(!this.state.purchseDatempty &&!this.state.costState &&!this.state.itemidState){
                  fetch(`${base_url}node?_format=json`,{
                        method:"POST",
                        headers: {
                           "Content-Type" : "application/json",
                           "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                         },
                         body:JSON.stringify(productList[index])
                  }).then(res=>{
                    return res.json()
                  }).then(data=>{
                      console.log(data);
                      this.setState({openPopup:true,checkboxnotchecked:false,fieldsNotvalid:false});
                  });
                  }
               });
              }else{
                this.setState({fieldsNotvalid:true,checkboxnotchecked:false})
              }
           }else{
              this.setState({fieldsNotvalid:false,checkboxnotchecked:true})
           }
      }

	render(){
		return(
             <div className="client-add-product">
                  <div className="container">
                     <div className="pro-title d-flex flex-wrap align-center">
                        <div className="name-of-heading d-flex flex-wrap align-center">
                           <img src={require("../../../images/your-product-blue-logo.svg")} alt="product-logo"/>
                           <h3>Add products</h3>
                        </div>
                        <div className="auto-search-box">
                           <form>
                              <div className="autocomplete-ss"><input type="text" className="hydro" ref={this.clientProductSearch} onChange={this.Search_client_Product_Details}/></div>
                           </form>
                        </div>
                     </div>

                     <div className="list-add-product">
                     {this.state.purchaseProductList.map((item,index)=>
                           <div className={"list-box"+' ' +ReactHtmlParser(item.title)}  key={index}>
                              <div className="top d-flex flex-wrap">
                                 <div className="checkbox-cust"><input type="checkbox" id={"checkbox"+index} defaultValue={item.nid} className="productcheck" onChange={this.selectBoxChecked}/>
                                    <label htmlFor={"checkbox"+index}></label>
                                    {this.state.purchseDatempty ? <span className='error-msg'></span>:''}
                                 </div>
                                 <div className="title">
                                    <h4>{ReactHtmlParser(item.title)}</h4>
                                    <h5>{ReactHtmlParser(item.field_product_category)}</h5>
                                 </div>
                                 <Link to={""} onClick={this.openAccordian}>When product was released: {item.created}</Link>
                              </div>
                              <div className="bottom-details d-flex flex-wrap">
                                 <div className="left-prod-img" style={{backgroundImage: `url(${site_url+item.field_product_image})`}}>
                              </div>
                              <div className="right-prod-upload">
                                 <form onSubmit={(e)=>e.preventDefault()}>
                                    <div className="form-group">
                                       <label>Seller</label>
                                       <input type="text" name="seller" placeholder="Seller" className="seller"/>
                                    </div>
                                    <div className="form-group">
                                       <label>Purchase date</label>
                                       <input type="text" placeholder='Purchase date' name="purchase" className="purchase" onBlur={((e)=>{
                                             !hasValidDate(e.target.value) ? this.setState({purchseDatempty:true}) : this.setState({purchseDatempty:false}) 
                                       })}/>
                                       {this.state.purchseDatempty ? ValidationMsg.common.default.purchaseProductdate : ''}
                                    </div>
                                    <div className="form-group">
                                       <label>Cost</label>
                                       <input type="text" name="cost" placeholder="Cost" className="cost" onBlur={((e)=>{
                                             !hasNumeric(e.target.value) ? this.setState({costState:true}) : this.setState({costState:false}) 
                                       })}/>
                                       {this.state.costState ? ValidationMsg.common.default.coststate : ''}
                                    </div>
                                    <div className="form-group">
                                       <label>Item ID</label>
                                       <input type="text" name="item-id" placeholder="Item ID" className="item-id" onBlur={((e)=>{
                                             !hasNumeric(e.target.value) ? this.setState({itemidState:true}) : this.setState({itemidState:false}) 
                                       })} />
                                       {this.state.itemidState ?  ValidationMsg.common.default.itemidstate : ''}
                                    </div>
                                    <div className="btn-block">
<span className='suggestion-file-name'>txt, pdf, doc, ppt, pptx, docx.</span>
                                       <div className="upload-btn-wrapper">
                                        
                                          <input type="file" name="Upload Document" onChange={this.get_uploaded_file_path}/>
                                          <button className="btn common-btn-blue">
                                          <span>Upload Document</span></button>

                                       </div>
                                       {this.state.imageFormateState ? ValidationMsg.common.default.imageformate : ''}
                                    </div>
                                 </form>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
             </div>
            {this.props.callforproduct ?  
              <>
               <div className="btn-block add-client">
                           <div className="upload-btn-wrapper">
                              <button className="btn common-btn-blue" onClick={this.addProduct}>
                              <span>Add new product</span></button>
                           </div>
                  </div>
                  <>
                    <>
                    {this.state.checkboxnotchecked  ? ValidationMsg.common.default.addproductCheckboxcheckmissing :''}
                    </>
                    <>
                    {this.state.fieldsNotvalid  ? ValidationMsg.common.default.addproductfieldnotvalid :''}
                    </>
                  </>
              </>
            :''}
            {this.state.openPopup ? 
             <div id="modal" className="modal-container">
               <div className="modal d-flex flex-wrap align-center justify-center">
                 <Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})
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
                   <h2>Product added</h2>
                   <p>Product details were submitted successfully</p>
               </div>
               </div>
             </div>
             : <></>}
            {/*<!--Container End-->*/}
         </div>
			)
	}

}

export default Repaddproduct