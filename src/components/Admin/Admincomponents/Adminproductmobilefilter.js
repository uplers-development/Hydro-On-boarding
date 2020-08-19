import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';


class Adminproductmobilefilter extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	openContainer:false,
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
                  "X-CSRF-Token" : localStorage.getItem("access-token"),
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminproductdropdown.method,
   	 }).then(res=>{return res.json()}).then(data=>{console.log(data);this.setState({adminproductdropdown:data});this.props.getallproducts(data)});
   }

  adminfilterproduct=(e,productid)=>{
   		e.preventDefault();
          this.props.loaderTrue(true);
         if(!e.target.classList.contains('active')){
            document.querySelectorAll(".admin-product-filter").forEach((item,index)=>{
               if(item.classList.contains("active")){item.classList.remove("active")}
            })
             e.target.classList.add("active");
             this.props.selecteddropdown(true)
      		 fetch(Admin.adminproducttabledata.url+`&field_product_category_target_id=${productid}`,{
      	 		 headers:{
                     "Content-Type" : "application/json",
                     "X-CSRF-Token" : localStorage.getItem("access-token"),
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.adminproducttabledata.method,
      	 	}).then(res=>{return res.json()}).then(data=>{
                console.log(data);
                this.props.checkproductfilter(data)
                this.props.loaderTrue(false);
              });
       }else{
         e.target.classList.remove('active');
          this.props.loaderTrue(true);
          this.props.selecteddropdown(true)
         fetch(Admin.adminproducttabledata.url+`&field_product_category_target_id=All`,{
                headers:{
                     "Content-Type" : "application/json",
                     "X-CSRF-Token" : localStorage.getItem("access-token"),
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.adminproducttabledata.method,
            }).then(res=>{return res.json()}).then(data=>{
                console.log(data);
                this.props.checkproductfilter(data)
                this.props.loaderTrue(false);
             });
       }
   }

   cleartheChecklist=()=>{
          this.props.loaderTrue(true);
          this.props.selecteddropdown(true)
         fetch(Admin.adminproducttabledata.url+`&field_product_category_target_id=All`,{
                headers:{
                     "Content-Type" : "application/json",
                     "X-CSRF-Token" : localStorage.getItem("access-token"),
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.adminproducttabledata.method,
            }).then(res=>{return res.json()}).then(data=>{
                console.log(data);
                this.props.checkproductfilter(data)
                this.props.loaderTrue(false);
             });

   }


   render(){
   		return(
   			<div className={this.state.openContainer ? "mobile-filter filter-active" : "mobile-filter"}>
									<Link to={""} onClick={((e)=>{
	                                 	e.preventDefault()
	                                 	this.setState({openContainer:true})
	                                 })} title="filter-btn" className="filter-open-btn">
										<img src={require("../../../images/ic_filter.svg")} alt="ic_filter" />		  
									</Link>

									<div className="open-close-filter-block">
										<div className="top-head d-flex flex-wrap align-center">
											<div className="top-title d-flex flex-wrap">
							<img src={require("../../../images/ic_filter-blue.svg")} alt="ic_filter" />
												<h4>Filters</h4>
											</div>
											<Link to={""} onClick={((e)=>{
										         			         e.preventDefault()
										         			         this.setState({openContainer:false})})
			    								 } title="close-btn" className="filter-open-btn">
												<img src={require("../../../images/ic_close.svg")} alt="ic_close" />
											</Link>
										</div>

										<div className="list-filter-mobile">
											<h5>Product types</h5>
											<ul>
												{this.state.adminproductdropdown.map((item,index)=>
                             						 <li key={index}><Link to={""} className="admin-product-filter" onClick={((e)=>this.adminfilterproduct(e,item.tid))} title={ReactHtmlParser(item.name)}>{ReactHtmlParser(item.name)}</Link></li>
                           						)}
											</ul>
											
											<div className="btn-block">
												<button className="common-btn-blue" onClick={((e)=>{
	                                 	e.preventDefault();
	                                 	this.setState({openContainer:false})
	                                 })}><span>Apply filters</span></button>
											</div>
                      <div className="btn-block">
                      <button className="common-btn-blue" onClick={((e)=>{
                          e.preventDefault();
                          document.querySelectorAll(".list-filter-mobile ul li a").forEach((item,index)=>{
                            item.parentNode.classList.remove("active");
                            item.classList.remove("active")
                          });

                         this.cleartheChecklist();
                      })}><span>Clear filters</span></button>
                  </div>  
										</div>

									</div>
								</div>
   			)
   }


}

export default Adminproductmobilefilter;