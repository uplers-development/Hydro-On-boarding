import React, { Component } from "react";
import { BrowserRouter, Route,Redirect } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import Newsfeeds from "./components/stores/Newsfeeds";
import Product from "./components/stores/Product";
import Resources from "./components/stores/Resources";
import Contract from "./components/stores/Contract";
import Repcontact from "./components/stores/Repcontact";
import RepDashboard from "./components/Repuser/RepDashboard";
import RepClients from "./components/Repuser/RepClients";
import RepClients_add from "./components/Repuser/RepClients_add";
import RepClients_details from "./components/Repuser/RepClients_details";
import Announcements from "./components/Repuser/Announcements";
import Admin_Resource from "./components/Admin/Admin_Resource";
import Admin_addResource from "./components/Admin/Admin_addResource";
import Admin_Reps from "./components/Admin/Admin_Reps";
import Admin_add_rep from "./components/Admin/Admin_add_rep";
import Admin_Products from "./components/Admin/Admin_Products";
import Admin_add_Products from "./components/Admin/Admin_add_Products";
import Apiurl,{site_url} from './components/Apiurl'; 
import "./css/style.scss";



console.log(process.env.NODE_ENV);
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      sidebarItem:[]
    }
  }



  componentDidMount(){
    //console.log(localStorage.getItem("user-type"));
    //let LeftSideAPi;
    /*if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="admin"){
      LeftSideAPi=Apiurl.Leftsidebar_adminuser.url
    }
    if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="client"){
      LeftSideAPi=Apiurl.Leftsidebar_client.url
    }
    if(JSON.parse(localStorage.getItem("user-type")).roles[1]==="rep"){
      LeftSideAPi=Apiurl.Leftsidebar_repuser.url
    }*/


      fetch(Apiurl.Leftsidebar_client.url,{
                  method:Apiurl.Leftsidebar_client.method,
        }).then(res=>{
          return res.json()
        }).then(data=>{
          console.log(data);
          this.setState({sidebarItem:data});
        })
  }

   render() {
      return (
           <div className="App">
              <BrowserRouter>
                <div className="Routes">
                    <Route path="/" exact component={Login} />
                    <Route path="/Login"  component={Login} />
                    <Route path="/RepDashboard"  component={RepDashboard} />
                    <Route path="/RepClients"  component={RepClients} />		  	
                    <Route path="/Admin_Resource"  component={Admin_Resource} />		  	
                    <Route path="/Admin_addResource"  component={Admin_addResource} />		  	
                    <Route path="/Admin_Reps"  component={Admin_Reps} />		  	
                    <Route path="/Admin_add_rep"  component={Admin_add_rep} />		  	
                    <Route path="/Admin_Products"  component={Admin_Products} />		  	
                    <Route path="/Admin_add_Products"  component={Admin_add_Products} />		  	
                    <Route path="/RepClients_details" component={RepClients_details} />
		  			       <Route path="/Announcements" component={Announcements} />
		  
                    <Route path="/RepClients_add"  component={RepClients_add} />
                    {this.state.sidebarItem.length > 0 ?
                      <>
		  
                    <Route path="/Profile"  component={Profile} />
                    <Route path="/Welcome"  component={Welcome} />
                    <Route path="/Dashboard"  component={Dashboard} />
                    <Route path={this.state.sidebarItem[0].field_react_route}  component={Newsfeeds} />
                    <Route path={this.state.sidebarItem[1].field_react_route}  component={Product} />
                    <Route path={this.state.sidebarItem[2].field_react_route}  component={Resources} />
                    <Route path={this.state.sidebarItem[3].field_react_route}  component={Contract} />
                    <Route path={this.state.sidebarItem[4].field_react_route}  component={Repcontact} />
                  </>
                  :
                  <>
                    <Route path="/Login"  component={Login} />
                  </>}
                    
                </div>
             </BrowserRouter>
          </div>
        )
   }

}

export default App;