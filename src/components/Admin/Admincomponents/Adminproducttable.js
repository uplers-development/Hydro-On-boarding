import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from '../../constants/common'
import adminProductImage from '../../../images/headcell2x.png';
import adminProductImage2 from '../../../images/hydro-gritcleanse2x.png';

class Adminproducttable extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	adminresourcetabledata:[],
      	loader:true,
      	noDatacall:true,
      	setSingleDeleteId:null,
      	checkdraftStatus:false,
      	openDraftPopup:false,
      	openDeletepopup:false,
      	draftstatus:'',
      	drafttext:'',
      }
	  console.log();
     /* this.singleSelect=this.singleSelect.bind(this);
      this.selectAllcheckbox=this.selectAllcheckbox.bind(this);*/
   }


   

   render(){
      return(
          <div className="admin-products-table table-outer">
   <div className="table-responsive">
      <table className="table table-striped striped-gray">
         <thead>
            <tr>
               <th>
                  <div className="checkbox-cust">
                     <input type="checkbox" id="checkbox0" />
                     <label htmlfor="checkbox0"></label>  
                  </div>
                  <span>Product</span>
               </th>
               <th>Author</th>
               <th>Data</th>
               <th>Type</th>
               <th>Last Modified</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td>
                  <div className="checkbox-cust">
                     <input type="checkbox" id="checkbox1" />
                     <label htmlfor="checkbox1"></label>  
                  </div>
                  <div className="name-edit">
                     <div className="img-c bg-cover" style={{backgroundImage: `url(${adminProductImage})`}}>
                  </div>
                  <div className="right-detail">
                     <h3>Lorem ipsum dolor</h3>
                     <a href="#" title="Draft">Draft</a>
                     <div className="action d-flex flex-wrap">
                        <a href="#" title="Edit">Edit</a>    
                        <a href="#" title="Delete">Delete</a>   
                        <a href="#" title="View">View</a>    
                     </div>
                  </div>
                  </div>
                  </td>
                  <td>Simon</td>          
                  <td><span>Last Modified</span><span>3 hours ago</span></td>          
                  <td>Stormwater Management</td>            
                  <td>18th March 2020</td>            
                  </tr>
                  </tbody>
                  </table>
               </div>
               </div>
         )
   }
}

export default Adminproducttable;
