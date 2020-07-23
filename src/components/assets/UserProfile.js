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
			hoverState:null
		}
		this.opentoogler=React.createRef();
		this.Logout=this.Logout.bind(this);
		this.renderClass=this.renderClass.bind(this);
		this.renderInHover=this.renderInHover.bind(this);
		this.renderOutHover=this.renderOutHover.bind(this);
	}

	componentDidMount(){
		if(localStorage.getItem("access-token")!==null){
			this.GetProfile();
		}
	}

	Logout=(e)=>{
		e.preventDefault();
		localStorage.clear();
		this.setState({logout:true})
	}

	logoutDone=()=>{
		if(this.state.logout){
			return <Redirect to="/Login"/>
		}
	}


	GetProfile=()=>{
		fetch(`https://staging.project-progress.net/projects/hydro/user/${JSON.parse(localStorage.getItem("user-type")).uid}?_format=json`,{
				headers: {
                	"Content-Type" : "application/json",
                	"Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                },
                method:"GET",
		}).then(res=>{
			return res.json();
		}).then(data=>{
			console.log(data);
			console.log(data.field_first_name);
			if(data!==''){
			this.setState({dataLoaded:true,first_name:data.field_first_name[0].value,last_name:data.field_last_name[0].value,userPicture:data.user_picture[0]
					})
			console.log(this.state.userPicture);
			}
		})
	}


	renderClass=(e)=>{
		if(!divType.parentNode.classList.contains("active")){
			divType.parentNode.classList.add("active")
		}else{
			divType.parentNode.classList.remove("active")
		}
	}

	renderInHover=()=>{
		this.setState({hoverState:true})
		if(!divType.parentNode.classList.contains('active')){
		  divType.parentNode.classList.add("active")
		}
	}

	renderOutHover=()=>{
		this.setState({hoverState:false})
		if(divType.parentNode.classList.contains('active')){
		  divType.parentNode.classList.remove("active")
		}
	}



	render() {
		return (
			<div>
				<div className="d-flex flex-wrap user-log" onMouseLeave={this.renderOutHover}>
					{this.state.dataLoaded ? 	
						<div className="user-image-name d-flex flex-wrap align-center" onMouseEnter={this.renderInHover} onClick={this.renderClass} ref={(input) => { divType = input; }}>
						<img src={(typeof this.state.userPicture != "undefined" && this.state.userPicture != null)  ? this.state.userPicture.url : require("../../images/profile-logo-blue.svg")} alt="Prfile image"/>
						<h2>{this.state.first_name+ " "+this.state.last_name }</h2>
					</div>
					:
					<div className="user-image-name d-flex flex-wrap align-center">
						<img src={require("../../images/profile-logo-blue.svg")} alt="Prfile image"/>
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
				{this.state.logout ? this.logoutDone() :''}
			</div>
		);
	}
}

export default UserProfile;