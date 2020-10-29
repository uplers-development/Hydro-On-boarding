import React from 'react';

const Overview = (props) => {
  return (
    <div className="right-dashboard-top">
	   <h3 className="common-title">Overview</h3>
	   <h4>At a Glance</h4>
	   <ul>
	      <li>
	         <span>Number of products</span>
	         <small>{props.repglance.products}</small>
	      </li>
	      <li>
	         <span>Total of clients</span>
	         <small>{props.repglance.clients}</small>
	      </li>
	      <li>
	         <span>Total Contracts</span>
	         <small>{props.repglance.contracts}</small>
	      </li>
	   </ul>
	</div>
  )
}

export default Overview;