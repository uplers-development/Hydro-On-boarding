import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Repclient} from '../../Apiurl'; 



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
			
			if(document.querySelector(".parentcheck:checked")===false){
				document.querySelectorAll(".clientchecked").forEach((item,index)=>{
					if(item.checked===true){
						collectId.push(item.value)
					}
				})
				console.log(collectId);
				this.setState({bulkIds:collectId});
		}else{
			 var ele=document.querySelector(".parentcheck");
			 ele.checked=true;
	         document.querySelectorAll(".clientchecked").forEach((item,index)=>{
					item.checked=true;
					if(item.checked===true){
						collectId.push(item.value)
					}
				})
				this.setState({bulkIds:collectId});
		      }
	}


	bulkDelete=(e)=>{
	
		console.log(this.state.bulkIds);
		let clientbulkid={
				user_ids:this.state.bulkIds.toString()
			}
			try{
				fetch(Repclient.RepBulkdelete.url,{
						headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                method:Repclient.RepBulkdelete.method,
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
								<button onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})
									document.querySelectorAll(".clientchecked").forEach((item,index)=>{
										document.querySelector(".parentcheck").checked=false;
										item.checked=false;
									})

							})} className="btn common-btn-blue"><span>CANCEL</span></button>
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