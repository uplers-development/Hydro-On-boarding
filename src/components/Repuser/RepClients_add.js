import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Repclient} from '../Apiurl'; 
import CommonBackground from '../../images/common-bg.jpg';
import{hasNull,isRequired,hasValidEmail,hasValidMobile,hasValidPassword} from '../validation';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import ReactHtmlParser from 'react-html-parser';
import Repheader from './assets/Repheader'
import Repnav from './assets/Repnav'
import hydroImage from '../../images/hydro-biofilter-product.jpg';
import Repaddclient from './repclientcomponents/Repaddclient'
import Repaddproduct from './repclientcomponents/Repaddproduct'
import Repaddcontract from './repclientcomponents/Repaddcontract'
import {ValidationMsg} from'../constants/validationmsg';

let object={};
let productList=[];
class RepClients_add extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			menulisting:[],
      repinfo:null,
      getClientadd:null,
      getProductadd:null,
      getContractadd:null,
      openPopup:false,
      firstname:false,
      company:false,
      surname:false,
      email:false,
      role:false,
      contact:false,
      password:false,
      formEmpty:false,
      contractProductAdmitted:false,
      getProductListforcontract:[],
			fromProductSec:this.props.location.state!==undefined ? this.props.location.state.productPage :'',
			fromContractSec:this.props.location.state!==undefined ? this.props.location.state.contractPage : '',
      sectionCalldiversion:null,
      calltheRoute:this.props.location.state!==undefined ? false : true,
      getClientuid:this.props.location.state!==undefined ? this.props.location.state.senduid :'',
      getProductList:this.props.location.state!==undefined  ? this.props.location.state.productListDetails :'',
		}
    console.log(this.props.repclientuid)
    this.submitClientDetails=this.submitClientDetails.bind(this);
    this.getProductsforContract=this.getProductsforContract.bind(this);
	}

   componentWillMount(){
      if(localStorage.getItem("access-token")!==null){
         this.Rep_nav_menu();
         this.GetProfile();
         if(this.state.fromProductSec && !this.state.fromContractSec){
            this.setState({sectionCalldiversion:"clients-add only-add-product"})
         }
         else if(!this.state.fromProductSec && this.state.fromContractSec){
            this.setState({sectionCalldiversion:"clients-add only-add-contract"})
         }else{
          this.setState({sectionCalldiversion:null})
         }
      }else{
         this.props.history.push('/Login')
      }
      
   }

  
   getProductsforContract=(getvalid,getcontractproductlist)=>{
    console.log(getcontractproductlist);
    this.setState({contractProductAdmitted:getvalid,getProductListforcontract:getcontractproductlist})
   }

   get_product_to_add=(get_product_value)=>{
    console.log(get_product_value);
    this.setState({getProductadd:get_product_value})
   }

   get_client_to_be_add=(get_client_add)=>{
    console.log(get_client_add);
    this.setState({getClientadd:get_client_add})
   }

    get_contract_to_be_add=(get_contract_add)=>{
    console.log(get_contract_add)
    this.setState({getContractadd : get_contract_add})
   }


   Rep_nav_menu=()=>{
      let menulist={
         menu:"main-navigation-rep"
      }
      fetch(Apiurl.menulisting.url,{
          headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
          },
          method:Apiurl.menulisting.method,
          body:JSON.stringify(menulist)
      }).then(res=>res.json()).then(data=>this.setState({menulisting:data}));
   }

   GetProfile=()=>{
      try{
         fetch(Apiurl.GetProfile.url,{
               headers: {
                     "Content-Type" : "application/json",
                     "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                   },
                   method:Apiurl.GetProfile.method,
         }).then(res=>{
            return res.json();
         }).then(data=>{
            console.log(data);
            this.setState({repinfo:data})
         })
      }catch(err){
         console.log(err);
      }
   }


  submitClientDetails=(e)=>{
    e.preventDefault();
    var e = document.getElementById("time_zone");
    var strUser = e.options[e.selectedIndex].value;
    if(hasValidEmail(document.querySelector("#email").value) && hasValidMobile(document.querySelector("#contact").value)){
    this.setState({formEmpty:false});
    let option={  
           "field_first_name" : [{"value":document.getElementById("fname") && document.querySelector("#fname").value!=='' ? document.querySelector("#fname").value : ''}],
           "field_last_name" : [{"value":document.getElementById("sname") && document.querySelector("#sname").value!=='' ? document.querySelector("#sname").value :''}],
           "mail" : [{"value":document.getElementById("email") && document.querySelector("#email").value!=='' ? document.querySelector("#email").value :''}],
           "field_organisation" : [{"value":document.getElementById("company") && document.querySelector("#company").value!=='' ? document.querySelector("#company").value :''}],
           "field_job_title" : [{"value":document.getElementById("role") && document.querySelector("#role").value!=='' ? document.querySelector("#role").value :''}],
           "field_contact_number" : [{"value":document.getElementById("contact") && document.querySelector("#contact").value!=='' ? document.querySelector("#contact").value :''}],
           "timezone" : [{"value":strUser}],
           "name" : [{"value":document.getElementById("email") && document.querySelector("#email").value!=='' ? document.querySelector("#email").value :''}],
           "pass" : [{"value":document.getElementById("password") && document.querySelector("#password").value!=='' ? document.querySelector("#password").value :''}],
           "roles" : [{ "target_id":"client" }],
           "status" : [{"value":1}],
           "field_rep_reference" : [{"target_id":JSON.parse(localStorage.getItem("user-type")).uid}]

         }

     try{
         fetch(Repclient.Repclientdetailssubmission.url,{
               method:Repclient.Repclientdetailssubmission.method,
               headers: {
                     "Content-Type" : "application/json",
                     "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                   },
                   body:JSON.stringify(option)
         }).then(res=>{
            return res.json();
         }).then(data=>{
            console.log(data);
            this.setState({openPopup:true});
            if(document.querySelector("#checkboxmessage").checked===true){
             let notifictionvalue={"user_id":data.uid[0].value} 
             fetch(Repclient.Repclientdetailssubmissionnotification.url,{
               method:Repclient.Repclientdetailssubmissionnotification.method,
               headers: {
                     "Content-Type" : "application/json",
                     "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                   },
                   body:JSON.stringify(notifictionvalue)
               }).then(res=>{
                  return res.json();
               }).then(data=>{console.log(data)});
            }

             let productTagsId=[]
                document.querySelectorAll(".shareall-email .emailall").forEach((item,index)=>{
                    productTagsId.push({"target_id":item.getAttribute("nid")});
                })
             let contractoptions={
                "title":[{"value":document.querySelector("#title").value}],
                "type":[{"target_id":"contracts"}],
                //"field_contract_document_type":[{"target_id":"tid"}],
                "field_contract_document":[{"target_id":document.querySelector(".document-item-contract").getAttribute("get-id")}],
                //"field_contract_expiry":[{"value":"2020-07-02"}],
              "field_contract_document_external":[{"uri":document.querySelector("#sharepoint-url").value ,"title":"","options": []}],
                "field_sub_title":[{"value":document.querySelector("#description").value}],
                "field_contract_for_products":productTagsId,/*PRoduct tags Id*/
                "field_contract_for_client":[{"target_id":data.uid[0].value}]
            }       
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
                  let file_id = document.querySelectorAll(".checked .document-item")[index].getAttribute("get-id");
                  object['title'] =  [{"value": title}];
                  object['field_purchase_date'] =  [{"value":purchase}];
                  object['field_product'] = [{"target_id":productcheck}];
                  object['field_seller'] =  [{"value":seller}];
                  object['field_cost'] =  [{"value":cost}];
                  object['field_item_id'] = [{"value":item_id}];  
                  object['field_purchase_doument']=[{"target_id":file_id}]
                  object['type']=[{"target_id":"product_purchase"}];
                  object['field_user']=[{"target_id":data.uid[0].value}];
                  productList.push(object);
               });  
          //console.log(productList);
            productList.map((item,index)=>{
              console.log(productList[index]);
                  fetch(`${base_url}/node?_format=json`,{
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
                  })
            })
            fetch(Repclient.Repclientdetailssubmissionproductlist.url,{
                        method:Repclient.Repclientdetailssubmissionproductlist.method,
                        headers: {
                           "Content-Type" : "application/json",
                           "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                         },
                         body:JSON.stringify(contractoptions)
                  }).then(res=>{
                    return res.json()
                  }).then(data=>{
                      console.log(data);
            })


         })
      }catch(err){
         console.log(err);
      }
  }else{
      this.setState({formEmpty:true});
    }
}


	render(){
		return(
      <div>
         <section className="main-wrapper">
            <div className="d-flex flex-wrap main-block">
               <Repnav repmenulisting={this.state.menulisting}/>
               <div className="d-flex flex-wrap right-content-part">
                  <div className="top-heading">
                    <Repheader historyPush={this.props} menulisting={this.state.menulisting} repuserinfo={this.state.repinfo}/>
                  </div>
                  {!this.state.calltheRoute ? 
                  <div className="bottom-content-block with-filter">
                     <div className="d-flex flex-wrap clients-add-main">
                        <div className={this.state.sectionCalldiversion}>
                           {/*<Repaddclient/>*/}
                           {this.state.fromProductSec && <Repaddproduct callforproduct={this.state.fromProductSec} senduid={this.state.getClientuid} getProductList={this.getProductsforContract} historyPush={this.props}/>}
                    		   {this.state.fromContractSec && <Repaddcontract checkcontractfrom={this.state.fromContractSec} senduid={this.state.getClientuid} productDataList={this.state.getProductList} historyPush={this.props}/>}
                        </div>
                     </div>
                  </div>
                  : 
                  <div className="bottom-content-block with-filter">
                     <div className="d-flex flex-wrap clients-add-main">
                        <div className="details-head-block fileter-block d-flex flex-wrap border-bottom">
                            <h3>Add new client details</h3> 
                            <h4>Create a brand new client user and add them to this site</h4> 
                        </div>
                        <div className="clients-add">
                           <Repaddclient getClienttoadd={this.get_client_to_be_add} firstname={
                            this.state.firstname} company={this.state.company} lastname={this.state.surname} email={this.state.email} role={this.state.role} contact={this.state.contact} password={this.state.password} />
                           <Repaddproduct getproducttoadd={this.get_product_to_add} getProductList={this.getProductsforContract}/>
                           {this.state.contractProductAdmitted &&  <Repaddcontract getcontracttoadd={this.get_contract_to_be_add} productDataList={this.state.getProductListforcontract} />}
                        </div>
                        <div className="btn-block add-client">
                          <div className="upload-btn-wrapper">
                                <button className="btn common-btn-blue" onClick={this.submitClientDetails}>
                                  <span>Add new client</span></button>
                               {this.state.formEmpty ? 
                                  <>
                                    {ValidationMsg.common.default.fieldsEmptyAnnoucementform}
                                  </>
                                       :
                                  ''
                                  } 
                              </div>
                              
                        </div>
                        
                     </div>
                     
                  </div>

                  }
               </div>
            </div>
            {this.state.openPopup ? 
          <div id="modal" className="modal-container">
            <div className="modal d-flex flex-wrap align-center justify-center">
              <Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openPopup:false}); this.props.history.push("/RepClients");})}
              className="close" title="Close"><img src={require("../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
              
            <div>
              <img className="svg" src={require("../../images/round-correct.svg")} alt="Right icon"/>
                <h2>Client added</h2>
                <p>Client details were submitted successfully</p>
            </div>
            </div>
          </div>
          : <></>}

         </section>
   </div>)  
	}
}
		
export default RepClients_add;			   