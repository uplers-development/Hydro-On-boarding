import React from 'react';
import { Link, Redirect } from "react-router-dom";
import {site_url,base_url,Repclient} from '../../Apiurl'; 

class  Repclientsearchbox extends React.Component{
	constructor(props){
		super(props);
		this.state={
			searchfieldValuefirstname:'',
			searchfieldValuelastname:'',
		}
		this.searchByName=this.searchByName.bind(this);
		this.searchRef = React.createRef();
	}


	searchByName=(e)=>{
			fetch(Repclient.Repclientdatatable.url+`&field_first_name_value=${this.searchRef.current.value}&field_last_name_value=${this.searchRef.current.value}`,{
					headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
		                },
				}).then(res=>res.json()).then(data=>{
					this.props.getSearchedItems(data);
				});
	}

	render(){
		  return (
		    <div className="auto-search-box">
				<form>
					<div className="autocomplete-ss">
						<input placeholder="Search client" id="myInput" type="text" name="hydro" ref={this.searchRef}  onChange={this.searchByName}/>
						<Link to={""} onClick={((e)=>{e.preventDefault(); document.querySelector("#myInput").value=''})} className="clear-search-value">clear</Link>
					</div>
				</form>
			</div>
		  )
		}
	}
export default Repclientsearchbox;