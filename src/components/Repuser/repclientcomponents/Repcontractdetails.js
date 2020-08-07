import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url,Repclient} from '../../Apiurl'; 
import productImage from '../../../images/first-defense.jpg';
import ReactHtmlParser from 'react-html-parser';

class Repcontractdetails extends React.Component{
	constructor(props){
		super(props);
		this.state={
			clientcontractDetails:[]
		}
	}


	componentDidMount(){
		this.Get_client_contract_Details();
		console.log(this.state.clientcontractDetails);
	}


	Get_client_contract_Details=()=>{
			fetch(Repclient.Repclientcontractdetails.url+`${this.props.repclientuid}?_format=json`,{
			    headers:{
			            "Content-Type" : "application/json",
			            "X-CSRF-Token" : localStorage.getItem("access-token"),
			            "Authorization": "Basic "+localStorage.getItem("basic-auth"),
			    },
			    method:Repclient.Repclientcontractdetails.method,
  			}).then(res=>res.json()).then(data=>this.setState({clientcontractDetails:data}));
		}

	call_the_contract_details=(e,nid,fieldcontractdocument)=>{
		e.preventDefault();
		console.log(nid);
		window.open(site_url+fieldcontractdocument,"_target");

	}

	render(){
		return(
			<div className="contract-list">
			{this.state.clientcontractDetails.map((item,index)=>
				<div className="contract-box d-flex flex-wrap" key={index}>
					<div className="contract-content">
					<Link to={""} onClick={(e)=>this.call_the_contract_details(e,item.nid,item.field_contract_document)} title={ReactHtmlParser(item.title)}>{ReactHtmlParser(item.title)}</Link>
					<h4>{ReactHtmlParser(item.field_sub_title)}</h4>
					</div>
					<div className="date"><p>Contract expires: {item.field_contract_expiry}</p></div>
				</div>
			)}
			</div>
			
			)
	}

}

export default Repcontractdetails;