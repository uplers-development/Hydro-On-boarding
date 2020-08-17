import React from 'react';
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import Apiurl,{site_url,Admin} from '../../Apiurl'; 

class Adminnavbar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      menulisting:[],
    }
  }

  componentDidMount(){
    this.get_admin_header_item();
        console.log(this.props.historyPush);

  }

  get_admin_header_item(){
      let menulist={menu:"main-navigation-admin"};
      let status;
      fetch(Admin.menulisting.url,{
          headers:{
                  "Content-Type" : "application/json",
                  "X-CSRF-Token" : localStorage.getItem("access-token"),
                  "Authorization": "Basic "+localStorage.getItem("basic-auth"),
            },
            method:Admin.menulisting.method,
            body:JSON.stringify(menulist)
      }).then(res=>{status = res.status;
                     if(status===200) return res.json();
      }).then(data=>{
            if(status!==200){
               localStorage.clear();
              this.props.historyPush.history.push("/");
         }else{
            this.setState({menulisting:data})
            }
      })
   }

   render(){
  return(  
     <nav className="navbar teal-color-bg navbar-expand-md navbar-dark bg-primary fixed-left">
            <Link to={""} onClick={((e)=>{
                e.preventDefault();
                if(window.location.pathname==="/admin-resources"){
                  if(this.props.sendviewcall){
                    this.props.checktheviewercall(false,false);
                    this.props.historyPush.history.push("/admin-resources");
                  }
                }else{
                  this.props.historyPush.history.push("/admin-resources");
                }

            })} className="navbar-logo"><img src={require("../../../images/hydrop-whitet-logo.svg")} alt="Main white logo"/></Link>

            <ul>
              {this.state.menulisting.map((item,index)=>
                   <li key={index}><Link to={item.field_react_route} className={window.location.pathname===item.field_react_route ? "active" :''}  title={item.title}>
                      {item.field_icon_svg!=='' ? 
                      <div dangerouslySetInnerHTML={{ __html: item.field_icon_svg }} />
                        :
                      <img src={require("../../../images/bell-icon-logo.svg")}/>
                     }
                      <span>{item.title}</span></Link>
                  </li>
                )}

            </ul>
            {/*<!--List of menu end-->*/}
            <div className="pattern-block"><img src={require("../../../images/pattern-nav-bottom.svg")} alt="pattern-nav" /></div>
            <div className="nav-copyright">© 2020 Hydro International</div>
         </nav>
  )
}
}
export default Adminnavbar;