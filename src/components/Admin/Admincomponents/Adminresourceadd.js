import React from 'react';
import { Link, Redirect,useHistory  } from "react-router-dom";
import Apiurl,{site_url,Admin} from '../../Apiurl'; 
import ReactHtmlParser from 'react-html-parser';
import ThumbnailImage from '../../../images/thumbnail-image.png';


class Adminresourceadd extends React.Component{
   constructor(props){
      super(props);
      this.state={
      	producttagChanged:'',
      }
      this.productTaginput=React.createRef();
	  this.productTag=this.productTag.bind(this);
	  this.clearProductTag=this.clearProductTag.bind(this);
   }

   productTag=(e)=>{
    e.preventDefault();
    console.log(this.productTaginput.current.value);
    if(this.productTaginput.current.value!=='') {
          
          let status;
          fetch(Admin.adminresourceProducttags.url,{
          		headers: {
                       "Content-Type" : "application/json",
                       "Authorization": 'Basic ' + localStorage.getItem("basic-auth"),
                 },
                 method:Admin.adminresourceProducttags.method
          }).then(res=>{
          	status=res.status;
          	return res.json();
          }).then(data=>{
          	if(status===200){
          		console.log(data);
          		   this.state.productSuggestion=[];
          		   data.filter((value,index,array)=>{
			            if(value.name.match(this.productTaginput.current.value)){
				              console.log(value);
				              this.state.productSuggestion.push(value)
			            }else{
			            	this.setState({producttagChanged:''})
			            }
		        	})

			       let suggestionforproduct=this.state.productSuggestion.map((item,index)=>{
			                                  return (<li key={index}>
			                                     <Link to={""} title={ReactHtmlParser(item.name)}onClick={(e)=>this.productId(e,item.name,item.tid)}>{ReactHtmlParser(item.name)}</Link> 
			                                  </li>)
			                                }) 
		      		this.setState({producttagChanged:suggestionforproduct})
			      console.log(this.state.productSuggestion);
			    }else{
			          this.setState({producttagChanged:''})
			        }


          		
          })
    }else{
		this.setState({producttagChanged:''})
    }
}


      productId=(e,title,gid)=>{
    e.preventDefault();
      var node = document.createElement("SPAN");
            node.classList.add("emailall");
            var node2=document.createElement("SPAN");
            node2.classList.add("remove-email");
            node.appendChild(node2).addEventListener("click",this.clearProductTag,true);
            var textnode = document.createTextNode(title);
            var id=document.createAttribute("nid");
            id.value=gid;
            node.appendChild(textnode);
            node.setAttributeNode(id);
            this.setState({producttagChanged:''});
            this.productTaginput.current.value='';
            document.querySelector(".shareall-email").appendChild(node);
            if(document.querySelectorAll(".shareall-email .emailall").length>0){
                document.querySelector("#product-tags").removeAttribute("placeholder")
            }
            this.productTaginput.current.focus();

  }

  clearProductTag =(e)=>{  
    e.preventDefault();
    e.target.parentNode.remove();
    this.productTaginput.current.focus();
     if(document.querySelectorAll(".shareall-email .emailall").length<=0){
          document.querySelector("#product-tags").setAttribute("placeholder","Product tags")
      }

}



   render(){
   		return(
   			<div className="d-flex flex-wrap admin-add-resources">
				   <div className="container">
				      <form>
				         <div className="upload-doc-block">
				            <div className="form-group d-flex flex-wrap align-center">
				               <label>Title*</label>
				               <div className="input-box">
				                  <input type="text" name="Title" id="title" placeholder="Title" />
				               </div>
				            </div>
				            <div className="form-group d-flex flex-wrap align-center">
				               <label>Description*</label>
				               <div className="input-box">
				                  <input type="text" name="Description" id="description" placeholder="Description"/>
				               </div>
				            </div>
				           {/* <div className="form-group d-flex flex-wrap align-center">
				           				               <label>Product tags*</label>
				           				               <div className="input-box">
				           				                  <input type="text" name="Product tags" id="product-tags" ref={this.productTaginput} onChange={this.productTag} />
				           				               </div>
				           				            </div>*/}
				            <div className="form-group d-flex flex-wrap align-center">
		                        <label>Product tags*</label>
	  								<div className="input-box suggestion">
	  									<div className="shareall-email">
	  									
	  									</div>
  		                        <input type="text" name="product-tags" placeholder="Product tags" id="product-tags" ref={this.productTaginput} onChange={this.productTag}/>
              								  <ul className="search-detail">
              									   {this.state.producttagChanged}
              								</ul>	
							             	</div>	
		                     </div>
				            <div className="upload-btn-block">
				               <div className="upload-btn-wrapper">
				                  <input type="file" name="Upload Document" />
				                  <button className="btn wide common-btn-blue">
				                  <span>Upload Document</span></button>
				               </div>
				            </div>
				         </div>

				         <div className="upload-thumbnail d-flex flex-wrap">
					            <div className="upload-btn-block">
					               <div className="upload-btn-wrapper">
					                  <input type="file" name="Upload thumbnail" />
					                  <button className="btn wide common-btn-blue">
					                  <span>Upload thumbnail</span></button>
					               </div>
					            </div>
				            	<div className="upload-thumbnail-img bg-cover" style={{backgroundImage: `url(${ThumbnailImage})`}}></div>
				   		</div>
					   <div className="btn-block">
						   <button className="btn wide common-btn-blue">
						   <span>Add Resource</span></button>
					   </div>
				  	 </form>
				</div>
			</div>
   			)
   }
}

export default Adminresourceadd;