import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from '../../constants/common'

class Adminresourcetable extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	adminresourcetabledata:[],
      	loader:true,
      	noDatacall:true,
      }
      //console.log(this.props.getdatafromfilter);
      this.singleSelect=this.singleSelect.bind(this);
      this.selectAllcheckbox=this.selectAllcheckbox.bind(this);
   }

   componentDidMount(){
   		this.get_resource_table();
   }

   selectAllcheckbox=(e)=>{
		 var ele=e.target;
		 var checkboxes = document.getElementsByTagName('input');
	     if (ele.checked) {
	         for (var i = 0; i < checkboxes.length; i++) {
	             if (checkboxes[i].type == 'checkbox') {
	                 checkboxes[i].checked = true;
	             }
	         }
	     }else {
	         for (var i = 0; i < checkboxes.length; i++) {
	             console.log(i)
	             if (checkboxes[i].type == 'checkbox') {
	                 checkboxes[i].checked = false;
	             }
	         }
	      }
	}

   singleSelect=(e)=>{
		var checkboxes = document.querySelectorAll('.resourceschecked');
		var ele=document.querySelector(".resourcesparentcheck");
		var checkedCheckboxes=document.querySelectorAll('.resourceschecked:checked').length;
		console.log(checkedCheckboxes);
		if(e.target.checked===false){
			document.querySelector(".resourcesparentcheck").checked=false
		}else{
			for(var i=1;i<=checkboxes.length ; i++){
				if(checkedCheckboxes===checkboxes.length){
					ele.checked=true;
				}else{
					ele.checked=false;
				}
			}
		}	
	}

   get_resource_table=()=>{
   	if(this.props.getdatafromfilter.length <= 0 ){
   		fetch(Admin.adminresourcelisting.url,{
   	 		 headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminresourcelisting.method,
	   	 }).then(res=>{return res.json()}).then(data=>{
	   	 		if(data.length>0){
	   	 			this.setState({noDatacall:false,adminresourcetabledata:data,loader:false})
	   	 		}else{
	   	 			this.setState({loader:false,noDatacall:true})
	   	 		}
	   	 });
   	}else{
   		this.setState({loader:false,adminresourcetabledata:this.props.getdatafromfilter});
   	}
   }

   render(){
   		let newresourcedata=this.props.getdatafromfilter.length > 0 ? this.props.getdatafromfilter :this.state.adminresourcetabledata;	
   		return(
   				<div className="resources-table table-outer">
				   <div className="table-responsive">
				      {/*<!--Table Start-->*/}
				      {!this.state.loader ? 
					      <table className="table table-striped">
					         <thead>
					            <tr>
					               <th>
					                  <div className="checkbox-cust">
					                     <input type="checkbox" className="resourcesparentcheck" id="checkbox" onChange={this.selectAllcheckbox}/>
					                     <label htmlFor="checkbox"></label>	 
					                  </div>
					                  <span>Title</span>
					               </th>
					               <th>Author</th>
					               <th>Data</th>
					               <th>Type</th>
					               <th>Last Modified</th>
					            </tr>
					         </thead>
					         <tbody>
					         {!this.state.noDatacall ?
					         	newresourcedata.map((item,index)=>
					            <tr key={index}>
					               <td>
					                  <div className="checkbox-cust">
					                     <input type="checkbox" id={"checkbox"+index} className="resourceschecked" name="checkbox" onChange={this.singleSelect} defaultValue={item.nid}/>
					                     <label htmlFor={"checkbox"+index}></label>	  
					                  </div>
					                  <div className="name-edit">
					                     <div className="right-detail">
					                        <h3>{item.title}</h3>
					                        <Link to={""} onClick={e=>e.preventDefault()} title="Draft">Draft</Link>
					                        <div className="action d-flex flex-wrap">
					                           <Link to={""} onClick={e=>e.preventDefault()} title="Edit">Edit</Link>	 
					                           <Link to={""} onClick={e=>e.preventDefault()} title="Delete">Delete</Link>	 
					                           <Link to={""} onClick={e=>e.preventDefault()} title="View">View</Link>	 
					                        </div>
					                     </div>
					                  </div>
					               </td>
					               <td>{item.uid}</td>
					               <td><span>Last Modified</span><span>{item.changed}</span></td>
					               <td>{item.field_resource_type}</td>
					               <td>{item.changed_1}</td>
					            </tr>
					          )
					          :
					          <>
					          	{cosmaticAsset.cosmatic.default.noDatafound}
					          </>
					      }
					         </tbody>
					      </table>
					      :
					      <>
					      	{cosmaticAsset.cosmatic.default.loader}
					   	  </>
					  	}
				      {/*<!--Table End-->*/}
				   </div>
				</div>
   			)
   }

}

export default Adminresourcetable;
