import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';


class Adminproductmobilefilter extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	openContainer:false,
      }
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
												<li><a href="#" title="Product types 1">Product types 1</a></li>
												<li><a href="#" title="Product types 2">Product types 2</a></li>
											</ul>
											
											<div className="btn-block">
												<button className="common-btn-blue" onClick={((e)=>{
	                                 	e.preventDefault();
	                                 	this.setState({openContainer:false})
	                                 })}><span>Apply filters</span></button>
											</div>

										</div>

									</div>
								</div>
   			)
   }


}

export default Adminproductmobilefilter;