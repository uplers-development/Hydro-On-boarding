import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Admin} from '../../Apiurl'; 

class Adminrepsearch extends React.Component{
	constructor(props){
		super(props)
		this.state={
			showCancelicon:false,
		}
		this.repnamesearch=React.createRef();
		this.admin_rep_search_item=this.admin_rep_search_item.bind(this);
	}


	admin_rep_search_item=(e)=>{
		let sortedselected;
		document.querySelectorAll(".rep-admin-sort ul li a").forEach((item,index)=>{
			if(item.classList.contains("active")){
				sortedselected=item.getAttribute("title");
			}
		})
		console.log(sortedselected);
		//return false;
		//&sort_by=&sort_order=${sortedselected!==undefined ? sortedselected :"All"}
		let status,datastatus;
		if(this.repnamesearch.current.value!==''){
		this.setState({showCancelicon:true});
		fetch(Admin.adminreptablelisting.url+`&field_first_name_value=${this.repnamesearch.current.value}&field_last_name_value=${this.repnamesearch.current.value}`,{
					headers:{
	                  "Content-Type" : "application/json",
	                  "X-CSRF-Token" : localStorage.getItem("access-token"),
	                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
	            	},
	            	method:Admin.adminreptablelisting.method
				}).then(res=>{
					status=res.status;
					return res.json()
				}).then(data=>{
					console.log(data);
					if(status===200){
						if(data.length>0){
							datastatus=true;
							this.props.getSearchedvalue(datastatus,data);
						}else{
							datastatus=false;
							this.props.getSearchedvalue(datastatus,data);
						}
					}
				});
		}else{
			this.setState({showCancelicon:false});
			datastatus=false;
			let data='';
		    this.props.getSearchedvalue(datastatus,data);
		}

	}


	render(){
		return(
			 <div className="auto-search-box">
                <form>
                   <div className="autocomplete-ss">
                      <input placeholder="Search client" id="admin-rep-search" type="text" name="hydro" ref={this.repnamesearch} onChange={this.admin_rep_search_item} />
                   	  {this.state.showCancelicon ? <Link to={""} onClick={((e)=>{e.preventDefault(); document.querySelector("#admin-rep-search").value='' ;  this.setState({showCancelicon:false}); this.admin_rep_search_item();})} className="clear-search-value"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link> : ''}
                   </div>
                </form>
             </div>
			)
	}
}

export default Adminrepsearch;