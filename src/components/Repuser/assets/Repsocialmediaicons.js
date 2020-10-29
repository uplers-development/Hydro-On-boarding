import React from 'react';
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';




export  const Twitter = (props) => {
	return(
	 <li><Link to={""} onClick={((e)=>{
	 		e.preventDefault();
	 	 	window.open("https://twitter.com","_blank");	
	 	 })} title="Follow us">
	               <img src={require("../../../images/ic_twitter_blue.svg")} alt="Twitter" />
	               	</Link>
	            </li>

	  )
	
}

export  const Linkdin = (props) => {
	return(
		 <li><Link to={""} onClick={((e)=>{
	 		e.preventDefault();
	 	 	window.open("https://www.linkedin.com/","_blank");	
	 	 })} title="Follow us">
				              <img src={require("../../../images/ic_linkedin.svg")} alt="Linkedin" />
	               	</Link>
	            </li>
	  )
	
	
}