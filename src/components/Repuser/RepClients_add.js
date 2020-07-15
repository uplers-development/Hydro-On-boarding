import React, { Component } from "react";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import hydroImage from '../../images/hydro-biofilter-product.jpg';
import Repaddclient from './repclientcomponents/Repaddclient'
import Repaddproduct from './repclientcomponents/Repaddproduct'
import Repaddcontract from './repclientcomponents/Repaddcontract'
class RepClients_add extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			rightSide_data:[],
			fromProductSec:this.props.location.state.productPage,
			fromContractSec:this.props.location.state.contractPage,
		}
	}
	render(){
		return(<div>
   {/*<!--Main wrapper start-->*/}
   <section className="main-wrapper">
      {/*<!-- Main block start-->*/}
      <div className="d-flex flex-wrap main-block">
         {/*<!--Nav fixed left block start-->*/}
         
         {/*<!--Nav fixed left block end-->*/}
         {/*<!--Main right content block start-->*/}
         <div className="d-flex flex-wrap right-content-part">
            <div className="top-heading">
               {/*<!--Top heading container start-->*/}
               <div className="top-heading-continer d-flex flex-wrap align-center">
                  <div className="name-of-heading d-flex flex-wrap">
                     <img src={require("../../images/clients_ic_blue.svg")} alt="profile-logo" />
                     <h1>Add client</h1>
                  </div>
                  <div className="d-flex flex-wrap user-log">
                     <div className="user-image-name d-flex flex-wrap align-center">
                        <img src={require("../../images/user-scond.png")} alt="Prfile image" />
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
               {/*<!--Top heading container end-->*/}
            </div>
            {/*<!--Main content bottom block start-->*/}
            <div className="bottom-content-block with-filter">
               {/*<!--Clients main blok start-->*/}
               <div className="d-flex flex-wrap clients-add-main">
                  {/*<!--Top filter block Start-->*/}
                  <div className="details-head-block fileter-block d-flex flex-wrap border-bottom">
                     <h3>Add new client details</h3>
                     <h4>Create a brand new client user and add them to this site</h4>
                  </div>
                  {/*<!--Top filter block End-->*/}
                  {/*<!--Top Add client block Start-->*/}
                  <div className="clients-add">
                     {/*<!--First form Start-->*/}

                    <Repaddclient/>
                    <Repaddproduct checkproductfrom={this.state.fromProductSec}/>
              		  <Repaddcontract checkcontractfrom={this.state.fromContractSec}/>
      
         <div className="btn-block add-client">
            <div className="upload-btn-wrapper">
               <input type="file" name="Add new client" />
               <button className="btn common-btn-blue">
               <span>Add new client</span></button>
            </div>
         </div>
      </div>
      {/*<!--Top Add client block Start-->*/}
</div>
{/*<!--Clients add main blok end-->*/}
</div>
{/*<!--Main content bottom block end-->*/}
</div>
{/*<!--Main right content block start-->*/}
</div>
</section>
</div>)
	}
}
		
export default RepClients_add;			   