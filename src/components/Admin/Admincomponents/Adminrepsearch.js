import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Repclient} from '../../Apiurl'; 

class Adminrepsearch extends React.Component{
	constructor(props){
		super(props)
		this.state={

		}
	}

	render(){
		return(
			 <div className="auto-search-box">
                <form>
                   <div className="autocomplete-ss">
                      <input placeholder="Search client" id="myInput" type="text" name="hydro" />
                   </div>
                </form>
             </div>
			)
	}
}

export default Adminrepsearch;