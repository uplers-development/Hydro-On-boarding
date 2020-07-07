import React from 'react';

const Repheader = (props) => {
  return (
    <div className="top-heading-continer d-flex flex-wrap align-center">
          <div className="name-of-heading d-flex flex-wrap">
             <img src={require("../../../images/dashboard-nav-blue.svg")} alt="profile-logo" />
             <h1>Dashboard</h1>
          </div>
          <div className="d-flex flex-wrap user-log">
             <div className="user-image-name d-flex flex-wrap align-center">
                <img src={require("../../../images/john-smith.png")} alt="Prfile image" />
                <h2>Username</h2>
             </div>
             <div className="drop-down-menu">
                <ul>
                   <li><a href="#" title="Profile">Profile</a></li>
                   <li><a href="#" title="Sign out">Sign out</a></li>
                </ul>
             </div>
          </div>
   </div>
  )
}

export default Repheader;