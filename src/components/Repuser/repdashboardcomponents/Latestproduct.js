import React from 'react';
import { Link, Redirect } from "react-router-dom";

const Latestproduct = (props) => {
  return (
    <div className="latest-products">
	   <h3 className="common-title">Latest Products</h3>
	   <ul>
	   	{props.replatestproductslist.map((item,index)=>
	      <li key={index}><Link to={""} title={item.title}>{item.title}</Link></li>
	   	)}
	   </ul>
	</div>
  )
}

export default Latestproduct;