import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Repclient} from '../../Apiurl'; 

class Adminremobilefilter extends React.Component{
	constructor(props){
		super(props)
		this.state={

		}
	}

	render(){
		return(
				 <div className="mobile-filter">
	                    <Link to={""} title="filter-btn" className="filter-open-btn">
	                    <img src={require("../../../images/ic_filter.svg")} alt="ic_filter" />
	                    </Link>
	                    <div className="open-close-filter-block">
	                       <div className="top-head d-flex flex-wrap align-center">
	                          <div className="top-title d-flex flex-wrap">
	                             <img src={require("../../../images/ic_filter-blue.svg")} alt="ic_filter" />
	                             <h4>Filters</h4>
	                          </div>
	                          <Link to={""} title="close-btn" className="filter-open-btn">
	                          <img src={require("../../../images/ic_close.svg")} alt="ic_close" />
	                          </Link>
	                       </div>
	                       <div className="list-filter-mobile">
	                          <h5>Bulk Action</h5>
	                          <ul>
	                             <li>
	                                <Link to={""} title="Delete">
	                                Delete</Link>
	                             </li>
	                             <li>
	                                <Link to={""} title="Action 1">
	                                Action</Link>
	                             </li>
	                          </ul>
	                          <h5>Sort by</h5>
	                          <ul>
	                             <li className="active">
	                                <Link to={""} title="Recently added">
	                                Recently added</Link>
	                             </li>
	                             <li>
	                                <Link to={""} title="Oldest - Newest">
	                                Oldest - Newest</Link>
	                             </li>
	                             <li>
	                                <Link to={""} title="Recently viewed">
	                                Recently viewed</Link>
	                             </li>
	                             <li>
	                                <Link to={""} title="Moost Viewe">
	                                Moost Viewed</Link>
	                             </li>
	                          </ul>
	                          <div className="btn-block">
	                             <button className="common-btn-blue"><span>Apply filters</span></button>
	                          </div>
	                       </div>
	                    </div>
                 </div>
			)
	}
}
export default Adminremobilefilter;