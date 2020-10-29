import React from 'react';
import { Link, Redirect } from "react-router-dom";
import {site_url,base_url,Repclient} from '../../Apiurl'; 

class  Repclientsearchbox extends React.Component{
	constructor(props){
		super(props);
		this.state={
			searchfieldValuefirstname:'',
			searchfieldValuelastname:'',
			showCancelicon:false,
		}
		this.searchByName=this.searchByName.bind(this);
		this.searchRef = React.createRef();
	}


	searchByName=(e)=>{
		if(this.searchRef.current.value!==''){
			this.setState({showCancelicon:true});
			fetch(Repclient.Repclientdatatable.url+`&field_first_name_value=${this.searchRef.current.value}&field_last_name_value=${this.searchRef.current.value}`,{
					headers: {
		                	"Content-Type" : "application/json",
		                	"X-CSRF-Token" : localStorage.getItem("access-token"),
		                	"Authorization": "Basic "+localStorage.getItem("basic-auth"),
		                },
				}).then(res=>res.json()).then(data=>{
					this.props.getSearchedItems(data);
				});
		}else{
			this.setState({showCancelicon:false});
		}
	}

	render(){
		  return (
		    <div className="auto-search-box">
				<form>
					<div className="autocomplete-ss">
						<input placeholder="Search client" id="myInput" type="text" name="hydro" ref={this.searchRef}  onChange={this.searchByName}/>
						{this.state.showCancelicon ? <Link to={""} onClick={((e)=>{e.preventDefault(); document.querySelector("#myInput").value='' ; this.setState({showCancelicon:false});})} className="clear-search-value"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link> : ""}
					</div>
				</form>
			</div>
		  )
		}
	}
export default Repclientsearchbox;