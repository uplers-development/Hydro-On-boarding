import React, { Component } from "react";
import { BrowserRouter, Route,Redirect } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Welcome from "./components/Welcome";
import Clients from "./components/Clients";
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
import Announcementlist from "./components/Repuser/announcement-list";
import AdminResource from "./components/Admin/admin-resources";
import AdminRep from "./components/Admin/admin-reps";
import AdminProduct from "./components/Admin/admin-products";
import Adminclients from "./components/Admin/admin-clients";
import Addadminclient from "./components/Admin/admin-add-client";
import Admin_add_rep from "./components/Admin/Admin_add_rep";
import AdminProfile from "./components/Admin/Html/Admin_Profile";
import Apiurl,{site_url,Client} from './components/Apiurl'; 
import "./css/style.scss";


//console.log=function(){}
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      sidebarItem:[]
    }
  }



  componentDidMount(){
      fetch(Apiurl.Leftsidebar_client.url,{
                  method:Apiurl.Leftsidebar_client.method,
        }).then(res=>{
          return res.json()
        }).then(data=>{
         // console.log(data);
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
                    <Route path="/admin-resources"  component={AdminResource} />        
                    <Route path="/admin-products"  component={AdminProduct} />        
                    <Route path="/admin-clients"  component={Adminclients} />        
                    <Route path="/admin-add-client"  component={Addadminclient} />        
                    <Route path="/admin-reps"  component={AdminRep} />        
                    <Route path="/Admin_add_rep"  component={Admin_add_rep} />        
                    <Route path="/RepClients_details" component={RepClients_details} />
                    <Route path="/AdminProfile" component={AdminProfile} />
                    <Route path="/Announcements" component={Announcements} />
		  			        <Route path="/announcement-list" component={Announcementlist} />
		  
                    <Route path="/RepClients_add"  component={RepClients_add} />
                    {this.state.sidebarItem.length > 0 ?
                      <>
		  
                    <Route path="/Profile"  component={Profile} />
                    <Route path="/Welcome"  component={Welcome} />
                    <Route path="/Clients"  component={Clients} />
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