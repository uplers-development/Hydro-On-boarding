import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import {cosmaticAsset} from '../../constants/common'
import adminProductImage from '../../../images/headcell2x.png';

let newproductdata,noDatacall;

class Adminproducttable extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	producttabledata:[],
      	loader:true,
      	noDatacall:true,
      	setSingleDeleteId:null,
      	checkdraftStatus:false,
      	openDraftPopup:false,
      	openDeletepopup:false,
      	draftstatus:'',
      	drafttext:'',
      }
	  console.log();
      this.singleSelect=this.singleSelect.bind(this);
      this.selectAllcheckbox=this.selectAllcheckbox.bind(this);
   }

   componentDidMount(){
      this.get_admin_product_data();
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
      var checkboxes = document.querySelectorAll('.productcheck');
      var ele=document.querySelector(".productparentcheck");
      var checkedCheckboxes=document.querySelectorAll('.productcheck:checked').length;
      console.log(checkedCheckboxes);
      if(e.target.checked===false){
         document.querySelector(".productparentcheck").checked=false
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

delete_single_product=(e)=>{
   e.preventDefault();
   fetch(Admin.adminproductdelete.url+`${this.state.setSingleDeleteId}?_format=json`,{
             headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminproductdelete.method,
          }).then(data=>{
               console.log(data);
               if(data.status===204){
                  this.setState({openDeletepopup:false})
                  this.get_admin_product_data();
               }
          });
}  

 get_admin_product_data=()=>{
      if(this.props.getdatafromfilter.length <= 0 ){
      fetch(Admin.adminproducttabledata.url,{
             headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.adminproducttabledata.method,
       }).then(res=>{return res.json()}).then(data=>{console.log(data)
         if(data.length>0){
              this.setState({noDatacall:false,producttabledata:data,loader:false})
            }else{
               this.setState({loader:false,noDatacall:true})
            }
       });
    }else{
         this.setState({loader:false,producttabledata:this.props.getdatafromfilter});

    }
   }

   draft_product=(e,draftid)=>{
         e.preventDefault();
         let target_=e.target;
         let target_value=e.target.textContent==="Draft" ? false : true;
         console.log(target_value);
         let options={
            "type":[{target_id:"products"}],
            "status": [{value: target_value}]
         };
         console.log(options);
         let status;
         fetch(Admin.admindraftproduct.url+`${draftid}?_format=json`,{
             headers:{
                  "Content-Type" : "application/json",
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.admindraftproduct.method,
            body:JSON.stringify(options)
          }).then(res=>{
            status=res.status;
            return res.json()
          }).then(data=>{
            console.log(data);
            if(status===200){
               if(data.status[0].value===true){
                  target_.textContent='Draft';
                  target_.setAttribute("title","Draft");
                  this.setState({openDraftPopup:true,drafttext:"Product Published."});
               }else{
                  target_.textContent='Published';
                  target_.setAttribute("title","Published");
                  this.setState({openDraftPopup:true,drafttext:"Product saved as Draft."});
               }
            }
          });
   }




   render(){

      let checkloading=this.props.getifilteredstatus ? this.state.loader : !this.state.loader;
      //let newproductdata=this.props.getdatafromfilter.length > 0 ? this.props.getdatafromfilter :this.state.producttabledata;   
      
       if(this.props.checkifselected && this.props.getdatafromfilter.length > 0){
        noDatacall=!this.state.noDatacall;
        newproductdata=this.props.getdatafromfilter;
      }
      else if(this.props.checkifselected && this.props.getdatafromfilter.length <= 0){
        newproductdata='';
        noDatacall=this.state.noDatacall;
      }
      else if(!this.props.checkifselected){
        newproductdata=this.state.producttabledata;
        noDatacall=!this.state.noDatacall;
      }

      return(
          <div className="admin-products-table table-outer">
                  <div className="table-responsive">
                     {checkloading ? 
                     <table className="table table-striped striped-gray">
                        <thead>
                           <tr>
                              <th>
                                 <div className="checkbox-cust">
                                    <input type="checkbox" className="productparentcheck" id="checkbox" onChange={this.selectAllcheckbox} />
                                    <label htmlFor="checkbox"></label>  
                                 </div>
                                 <span>Product</span>
                              </th>
                              <th>Author</th>
                              <th>Data</th>
                              <th>Type</th>
                              <th>Last Modified</th>
                           </tr>
                        </thead>
                        <tbody>
                           {noDatacall ?
                                 newproductdata.map((item,index)=>
                                 <tr key={index}>
                                    <td>
                                      <div className="checkbox-cust">
                                          <input type="checkbox" id={"checkbox"+index} className="productcheck" name="checkbox" onChange={this.singleSelect} defaultValue={item.nid}/>
                                          <label htmlFor={"checkbox"+index}></label>     
                                        </div>
                                       <div className="name-edit">
                                          <div className="img-c bg-cover" style={{backgroundImage: `url(${item.field_product_image!='' ? site_url+item.field_product_image : adminProductImage})`}}>
                                       </div>
                                       <div className="right-detail">
                                          <h3>{ReactHtmlParser(item.title)}</h3>
                                          <Link to={""} onClick={((e)=>this.draft_product(e,item.nid))} title={item.status==="true" ? "Draft" : "Publish"}>{item.status==="true" ? "Draft" : "Publish"}</Link>
                                          <div className="action d-flex flex-wrap">
                                             <Link to={""} onClick={((e)=>{e.preventDefault();this.props.checktheviewcalled(false,false,true,item.nid)})} title="Edit">Edit</Link>     
                                             <Link to={""} onClick={((e)=>
                                                   {     e.preventDefault();
                                                         this.setState({openDeletepopup:true,setSingleDeleteId:item.nid})}
                                                   )} title="Delete">Delete</Link>   
                                             <Link to={""} onClick={((e)=>{e.preventDefault();this.props.checktheviewcalled(false,false,true,item.nid)})} title="View">View</Link>       
                                          </div>
                                       </div>
                                       </div>
                                       </td>
                                       <td>{item.uid}</td>          
                                       <td><span>Last Modified</span><span>{item.created}</span></td>          
                                       <td>{ReactHtmlParser(item.field_product_category)}</td>            
                                       <td>{item.created_1}</td>            
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
                  </div>
                  {this.state.openDraftPopup ? 

                     <div id="modal" className="modal-container">
                                    <div className="modal d-flex flex-wrap align-center justify-center">
                                       <Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openDraftPopup:false});
                                       })}
                                       className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
                                       
                                    <div>
                                       <img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
                                          <h2>{this.state.drafttext}</h2>
                                    </div>
                                    </div>
                                 </div>
                        : <></>
               }
                  {this.state.openDeletepopup ? 

                     <div id="modal" className="modal-container">
                                    <div className="modal d-flex flex-wrap align-center justify-center">
                                       <Link to={""} onClick={((e)=>{e.preventDefault();this.setState({openDeletepopup:false})})}
                                       className="close" title="Close"><img src={require("../../../images/close-icon-gray.svg")} alt="Close icon" /></Link>
                                       
                                    <div>
                                       <img className="svg" src={require("../../../images/round-correct.svg")} alt="Right icon"/>
                                          <p>Are you sure you want to delete records?</p>

                                       <div className="btn-blok">
                                          <button onClick={((e)=>{e.preventDefault();this.setState({openDeletepopup:false})})} className="btn common-btn-blue"><span>CANCEL</span></button>
                                          <button className="btn common-btn-blue" onClick={this.delete_single_product}><span>YES</span></button>  
                                       </div>
                                       
                                    </div>
                                    </div>
                                 </div>
                        : <></>
               }
         </div>
         )
   }
}

export default Adminproducttable;
