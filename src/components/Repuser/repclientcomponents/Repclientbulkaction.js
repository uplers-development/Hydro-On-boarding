import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url} from '../../Apiurl'; 



class Repclientbulkaction extends React.Component {
	constructor(props){
		super(props);
		this.state={
			openPopup:false
		}
	}

render(){	
	  return (<>
	  			<div className="select-box">
				   <span>Bulk Action</span>
				   <ul className="list">
				      <li><Link to={""} onClick={(e)=>e.preventDefault()}title="Delete">Delete</Link></li>
				   </ul>
				</div>
				<div className="btn-block mobile-hide">
				   <button className="common-btn-blue" onClick={(e)=>this.setState({openPopup:true})}><span>APPLY</span></button>
				</div>
				{this.state.openPopup ? 
					<div id="modal" className="modal-container">
						<div className="modal d-flex flex-wrap align-center justify-center">
							<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})})}
							className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
							
						<div>
							<img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
								<p>Are you sure you want to delete records?</p>

							<div className="btn-blok">
								<button onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})})} className="btn common-btn-blue"><span>CANCEL</span></button>
								<button className="btn common-btn-blue"><span>YES</span></button>	
							</div>
							
						</div>
						</div>
					</div>
					: <></>}

				</>
			)
	}
}

export default Repclientbulkaction;