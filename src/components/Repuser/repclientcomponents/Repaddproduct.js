import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 
import hydroImage from '../../../images/hydro-biofilter-product.jpg';
import scrollToComponent from 'react-scroll-to-component';
import ReactHtmlParser from 'react-html-parser';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';
let titleitem=[];
let target_id=[];
let field_product=[];
let field_purchase_date=[];
let field_seller=[];
let field_cost=[];
let field_item_id=[];
class Repaddproduct extends React.Component{
	constructor(props){
		super(props);
		this.state={
			purchaseProductList:[]
		}
      //this.openAccordianTab = React.createRef();
      this.openAccordian=this.openAccordian.bind(this);
      this.selectBoxChecked=this.selectBoxChecked.bind(this);
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
      titleitem=[];
      field_purchase_date=[];
      field_product=[];
      field_seller=[];
      field_cost=[];
      field_item_id=[];
      document.querySelectorAll(".list-box").forEach((item,index)=>{
            if(item.classList.contains("checked")){item.classList.remove("checked")}
      })
      document.querySelectorAll(".productcheck:checked").forEach((item,index)=>{
         console.log(item.parentNode.parentNode.parentNode)
         item.parentNode.parentNode.parentNode.classList.add("checked")
      }) 

      document.querySelectorAll(".checked .title h4").forEach((title,index)=>{
            titleitem.push(title.textContent);
      })  

      document.querySelectorAll(".checked .purchase-date").forEach((purchase_date,index)=>{
            field_purchase_date.push(purchase_date.value);
      })  

      document.querySelectorAll(".checked .productcheck").forEach((field_id,index)=>{
            field_product.push(field_id.value);
      })  

      document.querySelectorAll(".checked .seller").forEach((seller,index)=>{
            field_seller.push(seller.value);
      }) 

       document.querySelectorAll(".checked .cost").forEach((cost,index)=>{
            field_cost.push(cost.value);
      })  

       document.querySelectorAll(".checked .item-id").forEach((item_id,index)=>{
            field_item_id.push(item_id.value);
      })

      let productList={

            "title":[{"value":titleitem}],
            "type":[{"target_id":"product_purchase"}],
            "field_product":[{"target_id":field_product}],
            "field_purchase_date":[{"value":field_purchase_date}],
            "field_seller":[{"value":field_seller}],
            "field_cost":[{"value":field_cost}],
            "field_item_id":[{"value":field_item_id}],
            "field_user":[{"target_id":26}]
      }
      this.props.getproducttoadd(productList)
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
                              <div className="autocomplete-ss"><input type="text" className="hydro" /></div>
                           </form>
                        </div>
                     </div>

                     <div className="list-add-product">
                     {this.state.purchaseProductList.map((item,index)=>
                           <div className="list-box" key={index}>
                              <div className="top d-flex flex-wrap">
                                 <div className="checkbox-cust"><input type="checkbox" id={"checkbox"+index} defaultValue={item.nid} className="productcheck" onChange={this.selectBoxChecked}/>
                                    <label htmlFor={"checkbox"+index}></label>
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
                                       <input type="text" name="seller"  className="seller"/>
                                    </div>
                                    <div className="form-group">
                                       <label>Purchase date</label>
                                       <input type="text" name="purchase" className="purchase" />
                                    </div>
                                    <div className="form-group">
                                       <label>Cost</label>
                                       <input type="text" name="cost"  className="cost"/>
                                    </div>
                                    <div className="form-group">
                                       <label>Item ID</label>
                                       <input type="text" name="item-id" className="item-id"  />
                                    </div>
                                    <div className="btn-block">
                                       <div className="upload-btn-wrapper">
                                          <input type="file" name="Upload Document" />
                                          <button className="btn common-btn-blue">
                                          <span>Upload Document</span></button>
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
                              <input type="file" name="Add new client" />
                              <button className="btn common-btn-blue">
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