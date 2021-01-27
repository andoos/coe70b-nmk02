import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Container, Row, Col } from "reactstrap";

import AdminDashboard from "./views/AdminDashboard.jsx";

import "./assets/css/App.css";
import BlackDashboardStyles from "./assets/css/black-dashboard-react.css";
import NucleoIcons from "./assets/css/nucleo-icons.css";

import LoginScreen from './views/LoginScreen/LoginScreen.jsx'

function App() {
  /*const state = {
    loginCredentials: { username: "username", password: "password" },
    isAuthenticated: false,
  };*/
  return (
    <div className="App">
      <BrowserRouter>
      <Route path="/" exact component={LoginScreen}></Route>
      <Route path="/admin-dashboard" exact component={AdminDashboard}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
