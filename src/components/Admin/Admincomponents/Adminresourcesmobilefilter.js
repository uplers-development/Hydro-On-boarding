import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';


class Adminresourcesmobilefilter extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	openContainer:false,
      }
   }

   render(){
   		return(
			<div className={this.state.openContainer ? "mobile-filter filter-active" : "mobile-filter"}>
	                           <Link to={""} title="filter-btn" className="filter-open-btn" onClick={((e)=>{
	                                 	e.preventDefault()
	                                 	this.setState({openContainer:true})
	                                 })}>
			   <img src={require("../../../images/ic_filter.svg")} alt="ic_filter" />
			   </Link>
			   <div className="open-close-filter-block">
			      <div className="top-head d-flex flex-wrap align-center">
			         <div className="top-title d-flex flex-wrap">
			            <img src={require("../../../images/ic_filter-blue.svg")} alt="ic_filter" />
			            <h4>Filters</h4>
			         </div>
			         <Link to={""} onClick={e=>
			         e.preventDefault()} title="close-btn" className="filter-open-btn">
			         <img src={require("../../../images/ic_close.svg")} alt="ic_close" />
			         </Link>
			      </div>
			      <div className="list-filter-mobile">
			         <h5>Content Types</h5>
			         <ul>
			            <li>
			               <Link to={""} title="Content Types 1">
			               Content Types 1</Link>
			            </li>
			            <li>
			               <Link to={""} title="Content Types 2">
			               Content Types 2</Link>
			            </li>
			         </ul>
			         <div className="btn-block">
			            <button className="common-btn-blue"onClick={((e)=>{
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

export default Adminresourcesmobilefilter;