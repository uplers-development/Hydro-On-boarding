import React, { Component } from "react";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url,base_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import Repheader from './assets/Repheader'
import Repnav from './assets/Repnav'
import hydroImage from '../../images/hydro-biofilter-product.jpg';
import Repaddclient from './repclientcomponents/Repaddclient'
import Repaddproduct from './repclientcomponents/Repaddproduct'
import Repaddcontract from './repclientcomponents/Repaddcontract'
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
			fromProductSec:this.props.location.state!==undefined ? this.props.location.state.productPage :'',
			fromContractSec:this.props.location.state!==undefined ? this.props.location.state.contractPage : '',
      sectionCalldiversion:null,
      calltheRoute:this.props.location.state!==undefined ? false : true,
      getClientuid:this.props.location.state!==undefined ? this.props.location.state.senduid :'',
		}
    console.log(this.props.repclientuid)
    this.submitClientDetails=this.submitClientDetails.bind(this);
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
      fetch(`https://staging.project-progress.net/projects/hydro/json-api/menu_list.json`,{
          headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
          },
          method:"POST",
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

    let option={  
           "field_first_name" : [{"value":document.getElementById("fname") && document.querySelector("#fname").value!=='' ? document.querySelector("#fname").value : ''}],
           "field_last_name" : [{"value":document.getElementById("sname") && document.querySelector("#sname").value!=='' ? document.querySelector("#sname").value :''}],
           "mail" : [{"value":document.getElementById("email") && document.querySelector("#email").value!=='' ? document.querySelector("#email").value :''}],
           "field_organisation" : [{"value":document.getElementById("company") && document.querySelector("#company").value!=='' ? document.querySelector("#company").value :''}],
           "field_job_title" : [{"value":document.getElementById("role") && document.querySelector("#role").value!=='' ? document.querySelector("#role").value :''}],
           "field_contact_number" : [{"value":document.getElementById("contact") && document.querySelector("#contact").value!=='' ? document.querySelector("#contact").value :''}],
           "timezone" : [{"value":"UTC"}],
           "name" : [{"value":document.getElementById("email") && document.querySelector("#email").value!=='' ? document.querySelector("#email").value :''}],
           "pass" : [{"value":document.getElementById("password") && document.querySelector("#password").value!=='' ? document.querySelector("#password").value :''}],
           "roles" : [{ "target_id":"client" }],
           "status" : [{"value":1}],
           "field_rep_reference" : [{"target_id":JSON.parse(localStorage.getItem("user-type")).uid}]

         }

   
    console.log(JSON.stringify(option));
    console.log(this.state.getClientadd)
    console.log(this.state.getProductadd)
    console.log(this.state.getContractadd)
     try{
         fetch(`${base_url}entity/user?_format=json`,{
               method:"POST",
               headers: {
                     "Content-Type" : "application/json",
                     "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                   },
                   body:JSON.stringify(option)
         }).then(res=>{
            return res.json();
         }).then(data=>{
            console.log(data);
             let contractoptions={
                "title":[{"value":document.querySelector("#title").value}],
                "type":[{"target_id":"contracts"}],
                //"field_contract_document_type":[{"target_id":"tid"}],
                //"field_contract_document":[{"target_id":"fid"}],
                //"field_contract_expiry":[{"value":"2020-07-02"}],
                "field_sub_title":[{"value":document.querySelector("#description").value}],
                "field_contract_for_products":[{"target_id":"24"},{"target_id":"34"}],/*PRoduct tags Id*/
                "field_contract_for_client":[{"target_id":data.uid[0].value}]
            }       
             this.state.getProductadd.reduce((unique, item)=>
                unique.includes(item)? unique :[...unique,item],[]
             ) 
            this.state.getProductadd.map((item,index)=>{
                item['type']=[{"target_id":"product_purchase"}];
                item['field_user']=[{"target_id":data.uid[0].value}];
                  fetch(`${base_url}node?_format=json`,{
                        method:"POST",
                        headers: {
                           "Content-Type" : "application/json",
                           "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                         },
                         body:JSON.stringify(this.state.getProductadd[index])
                  }).then(res=>{
                    return res.json()
                  }).then(data=>{
                      console.log(data);
                  })
            })
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
                      console.log(data);
            })


         })


      }catch(err){
         console.log(err);
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
                    <Repheader menulisting={this.state.menulisting} repuserinfo={this.state.repinfo}/>
                  </div>
                  {!this.state.calltheRoute ? 
                  <div className="bottom-content-block with-filter">
                     <div className="d-flex flex-wrap clients-add-main">
                        <div className={this.state.sectionCalldiversion}>
                           {/*<Repaddclient/>*/}
                           {this.state.fromProductSec && <Repaddproduct callforproduct={this.state.fromProductSec} senduid={this.state.getClientuid}/>}
                    		   {this.state.fromContractSec && <Repaddcontract checkcontractfrom={this.state.fromContractSec} senduid={this.state.getClientuid}/>}
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
                           <Repaddclient getClienttoadd={this.get_client_to_be_add}/>
                           <Repaddproduct getproducttoadd={this.get_product_to_add}/>
                           <Repaddcontract getcontracttoadd={this.get_contract_to_be_add}/>
                        </div>
                        <div className="btn-block add-client">
                          <div className="upload-btn-wrapper">
                                <button className="btn common-btn-blue" onClick={this.submitClientDetails}>
                                  <span>Add new client</span></button>
                              </div>
                        </div>
                     </div>
                  </div>

                  }
               </div>
            </div>
         </section>
   </div>)  
	}
}
		
export default RepClients_add;			   