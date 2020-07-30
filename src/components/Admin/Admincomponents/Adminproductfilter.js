import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';


class Adminproductfilter extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	adminproductdropdown:[]
      }
   }

   componentDidMount(){
      this.get_admin_product_dropdown();
   }

   get_admin_product_dropdown=()=>{
      fetch(Admin.adminproductdropdown.url,{
             headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminproductdropdown.method,
       }).then(res=>{return res.json()}).then(data=>{
         console.log(data);
         this.setState({adminproductdropdown:data})
      });
   }


   adminfilterproduct=(e,productid)=>{
         e.preventDefault();
         this.props.loaderTrue(true)
         if(!e.target.classList.contains('active')){
            document.querySelectorAll(".admin-product-filter").forEach((item,index)=>{
               if(item.classList.contains("active")){item.classList.remove("active")}
            })
             e.target.classList.add("active");
             this.props.selecteddropdown(true)
             fetch(Admin.adminproducttabledata.url+`&field_product_category_target_id=${productid}`,{
                headers:{
                     "Content-Type" : "application/json",
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.adminproducttabledata.method,
            }).then(res=>{return res.json()}).then(data=>{console.log(data);
                this.props.checkproductfilter(data);
                this.props.loaderTrue(false);
               
            });
       }else{

         e.target.classList.remove('active');
         this.props.loaderTrue(true); 
         this.props.selecteddropdown(true)
         fetch(Admin.adminproducttabledata.url+`&field_product_category_target_id=All`,{
                headers:{
                     "Content-Type" : "application/json",
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.adminproducttabledata.method,
            }).then(res=>{return res.json()}).then(data=>{
               console.log(data);
                  this.props.checkproductfilter(data);
                   this.props.loaderTrue(false);
            });
       }
   }




   render(){
   		return(
   				<div className="select-box">
								<span>Product types</span>
								<ul className="list">
									{this.state.adminproductdropdown.map((item,index)=>
                              <li key={index}><Link to={""} className="admin-product-filter" onClick={((e)=>this.adminfilterproduct(e,item.tid))} title={ReactHtmlParser(item.name)}>{ReactHtmlParser(item.name)}</Link></li>
                           )}
								</ul>
							</div>
   			)
   }


 }

 export default Adminproductfilter;