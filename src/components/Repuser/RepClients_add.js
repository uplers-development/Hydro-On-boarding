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
class RepClients_add_old extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			menulisting:[],
         repinfo:null,
			fromProductSec:this.props.location.state.productPage!=="undefined" ? this.props.location.state.productPage :'',
			fromContractSec:this.props.location.state.contractPage!=="undefined" ? this.props.location.state.contractPage : '',
         sectionCalldiversion:null,
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
                  <Repheader menulisting={this.state.menulisting} repuserinfo={this.state.repinfo}/>
                  <div className="bottom-content-block with-filter">
                     <div className="d-flex flex-wrap clients-add-main">
                        <div className={this.state.sectionCalldiversion}>
                           {/*<Repaddclient/>*/}
                           {this.state.fromProductSec && <Repaddproduct/>}
                    		   {this.state.fromContractSec && <Repaddcontract checkcontractfrom={this.state.fromContractSec}/>}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
   </div>)  
	}
}
		
export default RepClients_add_old;			   