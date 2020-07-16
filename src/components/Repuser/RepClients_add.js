import React, { Component } from "react";
import CommonBackground from '../../images/common-bg.jpg';
import Sidebar from '../assets/Sidebar';
import UserProfile from '../assets/UserProfile';
import Apiurl,{site_url} from '../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import Repheader from './assets/Repheader'
import Repnav from './assets/Repnav'
import hydroImage from '../../images/hydro-biofilter-product.jpg';
import Repaddclient from './repclientcomponents/Repaddclient'
import Repaddproduct from './repclientcomponents/Repaddproduct'
import Repaddcontract from './repclientcomponents/Repaddcontract'
class RepClients_add extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			menulisting:[],
      repinfo:null,
			fromProductSec:this.props.location.state!==undefined ? this.props.location.state.productPage :'',
			fromContractSec:this.props.location.state!==undefined ? this.props.location.state.contractPage : '',
      sectionCalldiversion:null,
      calltheRoute:this.props.location.state!==undefined ? false : true,
		}
	}

   componentWillMount(){
      if(localStorage.getItem("access-token")!==null){
         this.Rep_nav_menu();
         this.GetProfile();
         if(this.state.fromProductSec && !this.state.fromContractSec){
            this.setState({sectionCalldiversion:"clients-add only-add-product"})
         }
         else if(!this.state.fromProductSec && this.state.fromContractSec){
            this.setState({sectionCalldiversion:"clients-add only-add-contract"})
         }else{
          this.setState({sectionCalldiversion:null})
         }
      }else{
         this.props.history.push('/Login')
      }
      
   }


   Rep_nav_menu=()=>{
      let menulist={
         menu:"main-navigation-rep"
      }
      fetch(`https://staging.project-progress.net/projects/hydro/json-api/menu_list.json`,{
          headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
          },
          method:"POST",
          body:JSON.stringify(menulist)
      }).then(res=>res.json()).then(data=>this.setState({menulisting:data}));
   }

   GetProfile=()=>{
      try{
         fetch(Apiurl.GetProfile.url,{
               headers: {
                     "Content-Type" : "application/json",
                     "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                   },
                   method:Apiurl.GetProfile.method,
         }).then(res=>{
            return res.json();
         }).then(data=>{
            console.log(data);
            this.setState({repinfo:data})
         })
      }catch(err){
         console.log(err);
      }
   }

	render(){
		return(
      <div>
         <section className="main-wrapper">
            <div className="d-flex flex-wrap main-block">
               <Repnav repmenulisting={this.state.menulisting}/>
               <div className="d-flex flex-wrap right-content-part">
                  <div className="top-heading">
                    <Repheader menulisting={this.state.menulisting} repuserinfo={this.state.repinfo}/>
                  </div>
                  {!this.state.calltheRoute ? 
                  <div className="bottom-content-block with-filter">
                     <div className="d-flex flex-wrap clients-add-main">
                        <div className={this.state.sectionCalldiversion}>
                           {/*<Repaddclient/>*/}
                           {this.state.fromProductSec && <Repaddproduct callforproduct={this.state.calltheRoute}/>}
                    		   {this.state.fromContractSec && <Repaddcontract checkcontractfrom={this.state.fromContractSec}/>}
                        </div>
                     </div>
                  </div>
                  : 
                  <div className="bottom-content-block with-filter">
                     <div className="d-flex flex-wrap clients-add-main">
                        <div className="details-head-block fileter-block d-flex flex-wrap border-bottom">
                            <h3>Add new client details</h3> 
                            <h4>Create a brand new client user and add them to this site</h4> 
                        </div>
                        <div className="clients-add">
                           <Repaddclient/>
                           <Repaddproduct/>
                           <Repaddcontract/>
                        </div>
                        <div className="btn-block add-client">
                          <div className="upload-btn-wrapper">
                                <input type="file" name="Add new client" />
                                <button className="btn common-btn-blue">
                                  <span>Add new client</span></button>
                              </div>
                        </div>
                     </div>
                  </div>

                  }
               </div>
            </div>
         </section>
   </div>)  
	}
}
		
export default RepClients_add;			   