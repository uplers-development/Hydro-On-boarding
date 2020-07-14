import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import hydroImage from '../../images/hydro-biofilter-product.jpg';
import productImage from '../../images/first-defense.jpg';
import Repclientdetails from './repclientcomponents/Repclientdetails';
import Repproductselection from './repclientcomponents/Repproductselection';
import Repcontractdetails from './repclientcomponents/Repcontractdetails';
 {/*<!--Abouve image for Product list image-->*/}


class RepClients_details extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			rightSide_data:[],
		}
	}
	render(){
		return(<div>
				   <section className="main-wrapper">
					   	<div className="d-flex flex-wrap main-block">
							<div className="d-flex flex-wrap right-content-part">
								<div className="bottom-content-block">
									{/*<!-Client details main start-->*/}
										<div className="d-flex flex-wrap clients-detils-main">				
											<Repclientdetails/>
											<div className="container">
												<Repproductselection/>
												<Repcontractdetails/>
											</div>
										</div>
								</div>
							</div>			
						</div>
				  </section>
			</div>)
	}
}
		
export default RepClients_details;			   