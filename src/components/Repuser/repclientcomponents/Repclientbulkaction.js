import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url} from '../../Apiurl'; 



class Repclientbulkaction extends React.Component {
	constructor(props){
		super(props);
		this.state={
			openPopup:false,
			bulkIds:[]
		}
		this.bulkDelete=this.bulkDelete.bind(this);
		this.selectAllcheckbox=this.selectAllcheckbox.bind(this);
	}

	selectAllcheckbox=(e)=>{
		e.preventDefault();
		let collectId=[]
		document.querySelectorAll(".clientchecked").forEach((item,index)=>{
			if(item.checked===true){
				collectId.push(item.value)
			}
		})
		console.log(collectId);
		this.setState({bulkIds:collectId});
	}

	bulkDelete=(e)=>{
		let clientbulkid={
				user_ids:this.state.bulkIds.toString()
			}
			try{
				fetch(`${base_url}json-api/bulk_delete.json?_format=json`,{
						headers: {
		                	"Content-Type" : "application/json",
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                method:'POST',
		                body:JSON.stringify(clientbulkid)
				}).then(res=>{
					return res.json();
				}).then(data=>{
					console.log(data);
					this.setState({openPopup:false});
		 			this.props.recordDelete(true);
				})
		 	}catch(err){
		 		console.log(err);
		 		alert(err);
		 		this.setState({openPopup:false});
		 	}
			
	}



render(){	
	  return (<>
	  			<div className="select-box">
				   <span>Bulk Actions</span>
				   <ul className="list">
				      <li><Link to={""} onClick={this.selectAllcheckbox} title="Delete">Delete</Link></li>
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
								<button className="btn common-btn-blue" onClick={this.bulkDelete}><span>YES</span></button>	
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