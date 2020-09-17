import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Admin} from '../../Apiurl'; 



class Adminrproductbulkaction extends React.Component {
	constructor(props){
		super(props);
		this.state={
			openPopup:false,
			bulkIds:[]
		}
		this.bulkdelete=React.createRef();
		this.bulkDelete=this.bulkDelete.bind(this);
		this.selectAllcheckbox=this.selectAllcheckbox.bind(this);
	}

	selectAllcheckbox=(e)=>{
		e.preventDefault();
		this.bulkdelete.current.classList.toggle("active");
		var ele=document.querySelector(".productparentcheck");
		var checkboxes = document.getElementsByTagName('input');
		if(this.bulkdelete.current.classList.contains("active")){
		document.querySelector(".productparentcheck").checked=true;
		 if (ele.checked) {
			  for (var i = 0; i < checkboxes.length; i++) {
					if (checkboxes[i].type == 'checkbox') {
						 checkboxes[i].checked = true;
					}
			  }
		 }else {
			  for (var i = 0; i < checkboxes.length; i++) {
					console.log(i)
					if (checkboxes[i].type == 'checkbox') {
						 checkboxes[i].checked = false;
					}
			  }
		  }
		}else{
			document.querySelector(".productparentcheck").checked=false;	
			for (var i = 0; i < checkboxes.length; i++) {
				console.log(i)
				if (checkboxes[i].type == 'checkbox') {
					 checkboxes[i].checked = false;
				}
		  }
		}

	}


	bulkDelete=(e)=>{
		let collectId=[];
		document.querySelectorAll(".productcheck:checked").forEach((item,index)=>{
				collectId.push(item.value)
		})
		console.log(collectId);
		let clientbulkid={
				node_ids:collectId.toString()
			}
			try{
				fetch(Admin.adminProductbulkdelete.url,{
						headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
		                },
		                method:Admin.adminProductbulkdelete.method,
		                body:JSON.stringify(clientbulkid)
				}).then(res=>{
					return res.json();
				}).then(data=>{
					console.log(data);
					this.setState({openPopup:false});
					let status;
					fetch(Admin.adminproducttabledata.url,{
						headers:{
								"Content-Type" : "application/json",
								"X-CSRF-Token" : localStorage.getItem("access-token"),
								"Authorization": "Basic "+localStorage.getItem("basic-auth"),
							},
							method:Admin.adminproducttabledata.method
					}).then(res=>{
						status=res.status;
						return res.json()
					}).then(data=>{
						if(status===200){
							this.props.recordDelete(true,data);
							this.bulkdelete.current.classList.remove("active");
						}
					})
				})
				document.querySelector(".productparentcheck").checked=false;
				   document.querySelectorAll(".productcheck:checked").forEach((item,index)=>{
						item.checked=false;
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
				      <li><Link to={""} onClick={this.selectAllcheckbox} title="Delete" ref={this.bulkdelete}>Delete</Link></li>
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
									document.querySelectorAll(".productcheck").forEach((item,index)=>{
										document.querySelector(".productparentcheck").checked=false;
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

export default Adminrproductbulkaction;
