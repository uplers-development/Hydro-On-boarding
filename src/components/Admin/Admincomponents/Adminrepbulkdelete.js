import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Apiurl,{site_url,base_url,Repclient} from '../../Apiurl'; 


class Adminrepbulkaction extends React.Component {
constructor(props){
		super(props);
		this.state={
			//openPopup:false,
			//bulkIds:[]
		}
		//this.bulkDelete=this.bulkDelete.bind(this);
		//this.selectAllcheckbox=this.selectAllcheckbox.bind(this);
	}

	render(){
		return(
				 <div className="select-box">
	                     <span>Bulk Action</span>
	                     <ul className="list">
	                        <li>
	                           <Link to={""} onClick={e=>e.preventDefault()} title="Bulk Action 1">
	                           Bulk Action 1</Link>
	                        </li>
	                     </ul>
                  </div>
			)
	}
}

export default Adminrepbulkaction; 