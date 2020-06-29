import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Apiurl from '../Apiurl'; 

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
			logout:false
		}
		this.Logout=this.Logout.bind(this);
	}

	componentDidMount(){
		this.GetProfile();
	}

	Logout=(e)=>{
		localStorage.clear();
		this.setState({logout:true})
	}

	logoutDone=()=>{
		if(this.state.logout){
			return <Redirect to="/Login"/>
		}
	}


	GetProfile=()=>{
		fetch(Apiurl.GetProfile.url,{
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

			this.setState({first_name:data.field_first_name.length>0 ?data.field_first_name[0].value : ''
						 ,last_name:data.field_last_name.length > 0 ? data.field_last_name[0].value :'',
						 email:data.mail.length>0 ? data.mail[0].value :''
						,contact_number:data.field_contact_number.length>0 ? data.field_contact_number[0].value :''
						,organization:data.field_organisation.length>0 ? data.field_organisation[0].value :''
						,time_zone:data.timezone.length>0 ? data.timezone[0].value :''
						,location:data.field_location.length>0 ?data.field_location[0].value : '',
						userPicture:data.user_picture.length>0 ? data.user_picture[0] :''
					})
			console.log(this.state.userPicture);
		})
	}

	render() {
		return (
			<div>
				<div className="d-flex flex-wrap user-log">
						<div className="user-image-name d-flex flex-wrap align-center">
							<img src={this.state.userPicture.url} alt="Prfile image"/>
							<h2>{this.state.first_name+ " "+this.state.last_name }</h2>
						</div>
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