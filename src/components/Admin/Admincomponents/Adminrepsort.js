import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Repclient} from '../../Apiurl'; 

class Adminrepsort extends React.Component{
	constructor(props){
		super(props)
		this.state={

		}
	}

	render(){
		return(
	 			 <div className="d-flex flex-wrap sort-by">
	                        <div className="sort-selected d-flex flex-wrap align-center">
	                           <h2>Sort by</h2>
	                        </div>
	                        <div className="drop-down-menu">
	                           <ul>
	                              <li>
	                                 <Link to={""} onClick={e=>e.preventDefault()} title="Purchase date newest">
	                                 Purchase date newest</Link>
	                              </li>
	                              <li>
	                                 <Link to={""} onClick={e=>e.preventDefault()} title="Purchase date oldest">
	                                 Purchase date oldest</Link>
	                              </li>
	                              <li>
	                                 <Link to={""} onClick={e=>e.preventDefault()} title="A-Z">
	                                 A-Z</Link>
	                              </li>
	                           </ul>
	                        </div>
                 </div>
			)
	}
}

export default Adminrepsort;