import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 
import hydroImage from '../../../images/hydro-biofilter-product.jpg';
import scrollToComponent from 'react-scroll-to-component';

class Repaddproduct extends React.Component{
	constructor(props){
		super(props);
		this.state={
			

		}
      this.openAccordianTab = React.createRef();
      this.openAccordian=this.openAccordian.bind(this);
	} 

	componentDidMount(){
	}

   openAccordian=(e)=>{
      e.preventDefault();
      if(!this.openAccordianTab.current.classList.contains("active")){
         this.openAccordianTab.current.classList.add("active");
      }else{
         this.openAccordianTab.current.classList.remove("active");
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
                                    <div className="autocomplete-ss"><input type="text" className="hydro" /></div>
                                 </form>
                              </div>
                           </div>

                           <div className="list-add-product">
                              <div className="list-box" ref={this.openAccordianTab}>
                                 <div className="top d-flex flex-wrap">
                                    <div className="checkbox-cust"><input type="checkbox" id="checkbox1" />
                                       <label htmlFor="checkbox1"></label>
                                    </div>
                                    <div className="title">
                                       <h4>First Defense</h4>
                                       <h5>Stormwater management</h5>
                                    </div>
                                    <Link to={""} onClick={this.openAccordian}>When product was released: 02/02/2020</Link>
                                 </div>
                                 <div className="bottom-details d-flex flex-wrap">
                                    <div className="left-prod-img" style={{backgroundImage: `url(${hydroImage})`}}>
                                 </div>
                                 <div className="right-prod-upload">
                                    <form>
                                       <div className="form-group">
                                          <label>Seller</label>
                                          <input type="text" name="seller" />
                                       </div>
                                       <div className="form-group">
                                          <label>Purchase date</label>
                                          <input type="text" name="purchase-date" />
                                       </div>
                                       <div className="form-group">
                                          <label>Cost</label>
                                          <input type="text" name="cost" />
                                       </div>
                                       <div className="form-group">
                                          <label>Item ID</label>
                                          <input type="text" name="item-id" />
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