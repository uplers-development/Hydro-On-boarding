import React, { Component } from "react";
import { BrowserRouter, Route,Redirect } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import Newsfeeds from "./components/Newsfeeds";
import "./css/style.scss";

class App extends Component {
   render() {
      return (
           <div className="App">
              <BrowserRouter>
                <div className="Routes">
                    <Route path="/" exact component={Login} />
                    <Route path="/Login"  component={Login} />
                    <Route path="/Profile"  component={Profile} />
                    <Route path="/Welcome"  component={Welcome} />
                    <Route path="/Dashboard"  component={Dashboard} />
                    <Route path="/Newsfeeds"  component={Newsfeeds} />
                </div>
             </BrowserRouter>
          </div>
        )
   }

}

export default App;