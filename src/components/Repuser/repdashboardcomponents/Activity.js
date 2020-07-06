import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url} from '../../Apiurl'; 

const Activity = (props) => {
  return (
    	<div className="activity-left d-flex flex-wrap">
				<h4>Recently published</h4>
					<ul>
					  {props.recentActivity.map((item,index)=>
						<li key={index}><Link to={""} title={item.title}>{item.title}</Link></li>
						)}
					</ul>
		</div>
  )
}

export default Activity;