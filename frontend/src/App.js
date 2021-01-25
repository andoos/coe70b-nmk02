import React from "react";

import { Container, Row, Col } from "reactstrap";

import AdminDashboard from "./views/AdminDashboard.js"


import "./assets/css/App.css";
import BlackDashboardStyles from "./assets/css/black-dashboard-react.css";
import NucleoIcons from "./assets/css/nucleo-icons.css";

function App() {
  /*const state = {
    loginCredentials: { username: "username", password: "password" },
    isAuthenticated: false,
  };*/
  return (
    <div className="App">
      {/* <LoginScreen credentials={this.state.loginCredentials}></LoginScreen> */}
      <AdminDashboard></AdminDashboard>
    </div>
  );
}

export default App;
