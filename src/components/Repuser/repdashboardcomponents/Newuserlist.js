import React from 'react';
import {site_url} from '../../Apiurl';

const Newuserlist = (props) => {
    return (
       <div className="activity-right  d-flex flex-wrap">
		   <h4>New users</h4>
		   <ul>
		   	 {props.newusers && props.newusers.map((item,index)=>
		     	 <li key={index}>
		        	 <div className="profile-img">
			            <img src={item.user_picture!=='' ? site_url+item.user_picture : require("../../../images/john-smith.png")} alt="Prfile image" />
			         </div>
			         <span className="username">{item.name}</span>
			         <small className="added-date">Added: {item.created}</small>
			      </li>
			   )}
		   </ul>
		</div>
    )
}

export default Newuserlist;