import React from "react";

import { Container, Row, Col } from "reactstrap";

import LoginScreen from "./components/LoginScreen/LoginScreen.js";
import UpdateButton from "./components/UpdateButton/UpdateButton.js";
import LogoutButton from "./components/LogoutButton/LogoutButton.js";
import DataTable from "./components/DataTable/DataTable.js";

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
      <div>
        <h1>Administrator's Dashboard</h1>
        <UpdateButton /> <LogoutButton />
      </div>
      <Container>
        <Row>
          <Col><DataTable></DataTable><DataTable></DataTable></Col>
          <Col><DataTable></DataTable><DataTable></DataTable></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
