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
import Apiurl,{site_url} from './components/Apiurl'; 
import "./css/style.scss";

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
                    <Route path="/components/Repuser/RepDashboard"  component={RepDashboard} />
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