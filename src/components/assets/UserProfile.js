import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl from '../Apiurl'; 


let divType = null;
class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state={
			first_name:null,
			last_name:null,
			email:null,
			contact_number:null,
			organization:null,
			time_zone:null,
			location:null,
			userPicture:[],
			logout:false,
			dataLoaded:false,
			openTooglecontent:false,
			hoverState:null,
			openPopup:false,
		}
		this.opentoogler=React.createRef();
		this.Logout=this.Logout.bind(this);
		this.renderClass=this.renderClass.bind(this);
		this.renderInHover=this.renderInHover.bind(this);
		this.renderOutHover=this.renderOutHover.bind(this);
		console.log(this.props.historyPush);
	}

	componentDidMount(){
		if(localStorage.getItem("access-token")!==null){
			this.GetProfile();
		}
	}

	Logout=(e)=>{
		e.preventDefault();
		this.setState({openPopup:true});
	}

	GetProfile=()=>{
		let target_id=JSON.parse(localStorage.getItem("user-type")).uid;
		fetch(Apiurl.GetProfile.url+`${target_id}?_format=json`,{
				headers: {
                	"Content-Type" : "application/json",
                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                },
                method:Apiurl.GetProfile.method,
		}).then(res=>{
			return res.json();
		}).then(data=>{
			console.log(data);
			console.log(data.field_first_name);
			if(data!==''){
			let clientuserpic=data.user_picture.length > 0 ? data.user_picture[0].url : '';
			this.setState({dataLoaded:true,first_name:data.field_first_name[0].value,last_name:data.field_last_name[0].value,userPicture:clientuserpic})
			console.log(this.state.userPicture);
			}
		})
	}


	renderClass=(e)=>{
		if(divType!==null ){
		if(!divType.parentNode.classList.contains("active")){
			divType.parentNode.classList.add("active")
		}else{
			divType.parentNode.classList.remove("active")
		}
		}
	}

	renderInHover=()=>{
		this.setState({hoverState:true})
		if(divType!==null ){
		if(!divType.parentNode.classList.contains('active')){
		  divType.parentNode.classList.add("active")
		}
		}
	}

	renderOutHover=()=>{
		this.setState({hoverState:false})
		if(divType!==null){
		if(divType.parentNode.classList.contains('active')){
		  divType.parentNode.classList.remove("active")
		}
		}
	}



	render() {
		return (
			<div>
				<div className="d-flex flex-wrap user-log " onMouseLeave={this.renderOutHover}>
					{this.state.dataLoaded ? 	
						<div className="user-image-name d-flex flex-wrap align-center" onMouseEnter={this.renderInHover} onClick={this.renderClass} ref={(input) => { divType = input; }}>
			
						<div className="person-profile-img bg-cover" style={{backgroundImage:`url(${this.state.userPicture!=='' ? this.state.userPicture : "../../images/profile-logo-blue.svg"})`}}>
						</div>
						
						<h2>{this.state.first_name+ " "+this.state.last_name }</h2>
					</div>
					:
					<div className="user-image-name d-flex flex-wrap align-center">
<div className="person-profile-img bg-cover" style={{backgroundImage:"url( ../../images/profile-logo-blue.svg)"}}>
						</div>

						<h2>{"First name " + " " +"Last name" }</h2>
					</div>
				}
				<div className="drop-down-menu">
					<ul>
						<li><Link to="./Profile" title="Profile">Profile</Link></li>
						<li><Link to={""} title="Sign out" onClick={this.Logout}>Sign out</Link></li>
					</ul>
				</div>
				</div>


				  {this.state.openPopup ? 
					<div id="modal" className="modal-container">
						<div className="modal d-flex flex-wrap align-center justify-center">
							<Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openPopup:false})})}
							className="close" title="Close"><img src={require("../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
							
						<div>
							<img className="svg" src={require("../../images/round-correct.svg")} alt="Right icon"/>
								<p>Are you sure you want to Sign out?</p>
							<div className="btn-blok">
								<button onClick={((e)=>{e.preventDefault();this.setState({openPopup:false});

							})} className="btn common-btn-blue"><span>CANCEL</span></button>
								<button className="btn common-btn-blue" onClick={((e)=>{
										console.log(this.props.historyPush)
										localStorage.clear();
										this.props.historyPush.history.push("/Login");
								})}><span>YES</span></button>	
							</div>
							
						</div>
						</div>
					</div>
					: <></>}
			</div>
		);
	}
}

export default UserProfile;