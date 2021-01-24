import React from "react";

import { Container, Row, Col } from "reactstrap";

import LoginScreen from "./components/LoginScreen/LoginScreen.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import AdminHeader from "./components/AdminHeader/AdminHeader.js";
import DataTable from "./components/DataTable/DataTable.js";
import BarGraph from "./components/BarGraph/BarGraph.js";

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
      <AdminHeader></AdminHeader>
      <Container>
        <Row>
          <Col lg="=6">
            <DataTable></DataTable>
            <DataTable></DataTable>
          </Col>
          <Col lg="6">
            <DataTable></DataTable>
            <BarGraph></BarGraph>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
