import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';


class Adminproductfilter extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	adminproductdropdown:[]
      }
   }

   render(){
   		return(
   				<div className="select-box">
								<span>Product types</span>
								<ul className="list">
									<li><a href="#" title="Product types 1">Product types 1</a></li>
								</ul>
							</div>
   			)
   }


 }

 export default Adminproductfilter;