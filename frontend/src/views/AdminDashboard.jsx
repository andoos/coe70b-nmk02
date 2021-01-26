import React from "react";

import { Container, Row, Col, CardDeck, CardColumns } from "reactstrap";

import AdminNavBar from "../components/AdminNavBar/AdminNavBar.jsx";
import DataTable from "../components/DataTable/DataTable.jsx";
import BarGraph from "../components/BarGraph/BarGraph.jsx";

//import "./assets/css/App.css";
//import BlackDashboardStyles from "./assets/css/black-dashboard-react.css";
//import NucleoIcons from "./assets/css/nucleo-icons.css";

function AdminDashboard() {
  return (
    <Container fluid>
      <AdminNavBar></AdminNavBar>
      <li></li>
      <Row>
        <Col>
          <DataTable />
        </Col>
        <Col>
          <DataTable />
        </Col>
        <Col>
          <DataTable />
        </Col>
      </Row>
      <Row>
        <Col>
          <BarGraph />
        </Col>
        <Col>
          <BarGraph />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
