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
         fid:'',
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
      var filename='';
         if (exactfile) {
             var startIndex = (exactfile.indexOf('\\') >= 0 ? exactfile.lastIndexOf('\\') : exactfile.lastIndexOf('/'));
             filename = exactfile.substring(startIndex);
             if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                 filename = filename.substring(1);
                 this.setState({fileuploadedname:filename})
             }
             console.log(filename);
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
            }else{
               //alert("sorry no records found");
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
         })
      }catch(err){
         console.log(err);
      }
   }

   selectBoxChecked=(e)=>{
     object={};

      document.querySelectorAll(".list-box").forEach((item,index)=>{
            if(item.classList.contains("checked")){item.classList.remove("checked")}
      })
      document.querySelectorAll(".productcheck:checked").forEach((item,index)=>{
         console.log(item.parentNode.parentNode.parentNode)
         item.parentNode.parentNode.parentNode.classList.add("checked")
      }) 
          
      document.querySelectorAll(".checked .title h4").forEach((title,index)=>{
            object['title']=[{"value":title.textContent}]
      })  

      document.querySelectorAll(".checked .purchase").forEach((purchase_date,index)=>{
            object['field_purchase_date']=[{"value":purchase_date.value}];
      })  

      document.querySelectorAll(".checked .productcheck").forEach((field_id,index)=>{
            object['field_product']=[{"target_id":field_id.value}]
      })  

      document.querySelectorAll(".checked .seller").forEach((seller,index)=>{
            object['field_seller']=[{"value":seller.value}];
      }) 

       document.querySelectorAll(".checked .cost").forEach((cost,index)=>{
            object['field_cost']=[{"value":cost.value}];
      })  

       document.querySelectorAll(".checked .item-id").forEach((item_id,index)=>{
            object['field_item_id']=[{"value":item_id.value}];
      })
      document.querySelectorAll(".checked .document-item").forEach((file_id,index)=>{
            object['field_purchase_doument']=[{"target_id":file_id.getAttribute("get-id")}];
      })
      productList.push(object);
      console.log(productList);
      productList.reduce((unique, item)=>
          unique.includes(item)? unique :[...unique,item],[]
      )   
      if(!this.props.callforproduct){
         this.props.getproducttoadd(productList);
      }
   }

   addProduct=(e)=>{
      e.preventDefault();
      productList.reduce((unique, item)=>
                unique.includes(item)? unique :[...unique,item],[]
             ) 
            productList.map((item,index)=>{
                item['type']=[{"target_id":"product_purchase"}];
                item['field_user']=[{"target_id":this.props.senduid}];
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
                  });
               }else{
                     alert("please check the fields mighht be missing somewhere!!");
                   }
               });

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
                           <div className="list-box" key={index}>
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
                                 <form>
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
                                       <div className="upload-btn-wrapper">
                                        <span className='suggestion-file-name'>txt, pdf, doc, ppt, pptx, docx. Max size of 1mb</span>
                                          <input type="file" name="Upload Document" onChange={this.get_uploaded_file_path}/>
                                          <button className="btn common-btn-blue">
                                          <span>Upload Document</span></button>

                                          <span className='document-item' get-id={this.state.fid}>{this.state.fileuploadedname}</span>
                                       </div>
                                    </div>
                                 </form>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
             </div>
            {this.props.callforproduct ? 
               <div className="btn-block add-client">
                           <div className="upload-btn-wrapper">
                              <button className="btn common-btn-blue" onClick={this.addProduct}>
                              <span>Add new product</span></button>
                           </div>
                  </div>
            :''}
            {/*<!--Container End-->*/}
         </div>
			)
	}

}

export default Repaddproduct