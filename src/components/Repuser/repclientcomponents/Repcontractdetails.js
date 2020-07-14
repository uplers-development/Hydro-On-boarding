import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{base_url,site_url} from '../../Apiurl'; 
import productImage from '../../../images/first-defense.jpg';

class Repcontractdetails extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
			<div className="contract-list">
				<div className="contract-box d-flex flex-wrap">
					<div className="contract-content">
					<a href="#" title="First Defense">Downstream Defender</a>
					<h4>Subheader</h4>
					</div>
					<div className="date"><p>Contract expires: 02/02/2025</p></div>
				</div>

				<div className="contract-box d-flex flex-wrap active">
					<div className="contract-content">
					<a href="#" title="First Defense">Title of contract</a>
					<h4>Subheader</h4>
					</div>
					<div className="date"><p>Contract expires: 02/02/2025</p></div>
				</div>
			</div>
			)
	}

}

export default Repcontractdetails;