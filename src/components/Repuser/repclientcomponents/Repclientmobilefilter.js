import React from 'react';

class Repclientmobilefilter extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			 <div className="mobile-filter">
	                           <a href="javascript:void(0)" title="filter-btn" className="filter-open-btn">
	                           <img src={require("../../../images/ic_filter.svg")} alt="ic_filter" />
	                           </a>
	                           <div className="open-close-filter-block">
	                              <div className="top-head d-flex flex-wrap align-center">
	                                 <div className="top-title d-flex flex-wrap">
	                                    <img src={require("../../../images/ic_filter-blue.svg")} alt="ic_filter" />
	                                    <h4>Filters</h4>
	                                 </div>
	                                 <a href="javascript:void(0)" title="close-btn" className="filter-open-btn">
	                                 <img src={require("../../../images/ic_close.svg")} alt="ic_close" />
	                                 </a>
	                              </div>
	                              <div className="list-filter-mobile">
	                                 <h5>Bulk Action</h5>
	                                 <ul>
	                                    <li><a href="#" title="Delete">Delete</a></li>
	                                    <li><a href="#" title="Action 1">Action</a></li>
	                                 </ul>
	                                 <h5>Sort by</h5>
	                                 <ul>
	                                    <li className="active"><a href="#" title="Recently added">Recently added</a></li>
	                                    <li><a href="#" title="Oldest - Newest">Oldest - Newest</a></li>
	                                    <li><a href="#" title="Recently viewed">Recently viewed</a></li>
	                                    <li><a href="#" title="Moost Viewe">Moost Viewed</a></li>
	                                 </ul>
	                                 <div className="btn-block">
	                                    <button className="common-btn-blue"><span>Apply filters</span></button>
	                                 </div>
	                              </div>
	                           </div>
	                        </div>
		);
	}
}


export default Repclientmobilefilter;