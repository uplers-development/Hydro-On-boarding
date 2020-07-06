import React from 'react';

const Newuserlist = (props) => {
	console.log(props.newusers)
    return (
       <div className="activity-right  d-flex flex-wrap">
		   <h4>New users</h4>
		   <ul>
		      <li>
		         <div className="profile-img">
		            <img src={require("../../../images/john-smith.png")} alt="Prfile image" />
		         </div>
		         <span className="username">John Smith</span>
		         <small className="added-date">Added: 00/00/00</small>
		      </li>
		      <li>
		         <div className="profile-img">
		            <img src={require("../../../images/girls-profile-img.png")} alt="Prfile image" />
		         </div>
		         <span className="username">John Smith</span>
		         <small className="added-date">Added: 00/00/00</small>
		      </li>
		      <li>
		         <div className="profile-img">
		            <img src={require("../../../images/jane-smith.png")} alt="Prfile image" />
		         </div>
		         <span className="username">John Smith</span>
		         <small className="added-date">Added: 00/00/00</small>
		      </li>
		      <li>
		         <div className="profile-img">
		            <img src={require("../../../images/jane-smith2.png")} alt="Prfile image" />
		         </div>
		         <span className="username">John Smith</span>
		         <small className="added-date">Added: 00/00/00</small>
		      </li>
		   </ul>
		</div>
    )
}

export default Newuserlist;