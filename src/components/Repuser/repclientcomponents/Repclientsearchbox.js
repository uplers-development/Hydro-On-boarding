import React from 'react';
import {site_url,base_url} from '../../Apiurl'; 

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
			fetch(`${base_url}/jsonapi/clients?_format=json&field_first_name_value=${this.searchRef.current.value}&field_last_name_value=${this.searchRef.current.value}`,{
					headers: {
		                	"Content-Type" : "application/json",
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
					</div>
				</form>
			</div>
		  )
		}
	}
export default Repclientsearchbox;