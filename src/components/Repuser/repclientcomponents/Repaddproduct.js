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

	} 

	componentDidMount(){
	}

	render(){
		return(
                  <div className="client-add-product">
                        {/*<!--Container Start-->*/}
                        <div className="container">
                           {/*<!--Add product Title Start-->*/}
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
                           {/*<!--Add product Title End-->*/}
                           {/*<!--Add product List Start-->*/}
                           <div className="list-add-product">
                              {/*<!--List box Start-->*/}	
                              <div className="list-box">
                                 <div className="top d-flex flex-wrap">
                                    <div className="checkbox-cust"><input type="checkbox" id="checkbox1" />
                                       <label for="checkbox1"></label>
                                    </div>
                                    <div className="title">
                                       <h4>First Defense</h4>
                                       <h5>Stormwater management</h5>
                                    </div>
                                    <a href="javascript:void(0);">When product was released: 02/02/2020</a>
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
                           {/*<!--List box End-->*/}
                           {/*<!--List box Start-->*/}	
                           <div className="list-box">
                              <div className="top d-flex flex-wrap">
                                 <div className="checkbox-cust"><input type="checkbox" id="checkbox2" />
                                    <label for="checkbox2"></label>
                                 </div>
                                 <div className="title">
                                    <h4>Downstream Defender</h4>
                                    <h5>Stormwater management</h5>
                                 </div>
                                 <a href="javascript:void(0);">When product was released: 02/02/2020</a>
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
                                       <div class="upload-btn-wrapper">
                                          <input type="file" name="Upload Document" />
                                          <button className="btn common-btn-blue">
                                          <span>Upload Document</span></button>
                                       </div>
                                    </div>
                                 </form>
                              </div>
                           </div>
                        </div>
                        {/*<!--List box End-->*/}	
                        {/*<!--List box Start-->*/}	
                        <div className="list-box">
                           <div className="top d-flex flex-wrap">
                              <div className="checkbox-cust"><input type="checkbox" id="checkbox3" />
                                 <label for="checkbox3"></label>
                              </div>
                              <div className="title">
                                 <h4>Hydro Biofilter</h4>
                                 <h5>Stormwater management</h5>
                              </div>
                              <a href="javascript:void(0);">When product was released: 02/02/2020</a>
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
                                    <div class="upload-btn-wrapper">
                                       <input type="file" name="Upload Document" />
                                       <button className="btn common-btn-blue">
                                       <span>Upload Document</span></button>
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                     {/*<!--List box End-->*/}	
                     {/*<!--List box Start-->*/}	
                     <div className="list-box">
                        <div className="top d-flex flex-wrap">
                           <div className="checkbox-cust"><input type="checkbox" id="checkbox4" />
                              <label for="checkbox4"></label>
                           </div>
                           <div className="title">
                              <h4>First Defense</h4>
                              <h5>Stormwater management</h5>
                           </div>
                           <a href="javascript:void(0);">When product was released: 02/02/2020</a>
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
                                 <div class="upload-btn-wrapper">
                                    <input type="file" name="Upload Document" />
                                    <button className="btn common-btn-blue">
                                    <span>Upload Document</span></button>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
                  {/*<!--List box End-->*/}
               </div>
               {/*<!--Add product List End-->*/}
            </div>
            <div className="btn-block add-client">
                        <div className="upload-btn-wrapper">
                           <input type="file" name="Add new client" />
                           <button className="btn common-btn-blue">
                           <span>Add new client</span></button>
                        </div>
                     </div>
            {/*<!--Container End-->*/}
         </div>
			)
	}

}

export default Repaddproduct