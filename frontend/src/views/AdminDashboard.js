import React from "react";

import { Container, Row, Col } from "reactstrap";

import AdminNavBar from "../components/AdminNavBar/AdminNavBar.js";
import DataTable from "../components/DataTable/DataTable.js";
import BarGraph from "../components/BarGraph/BarGraph.js";

//import "./assets/css/App.css";
//import BlackDashboardStyles from "./assets/css/black-dashboard-react.css";
//import NucleoIcons from "./assets/css/nucleo-icons.css";

function AdminDashboard() {
  return (
      <Container fluid>
          <AdminNavBar></AdminNavBar>
        <Row>
          <Col>
            <DataTable></DataTable>
            <DataTable></DataTable>
          </Col>
          <Col>
            <DataTable></DataTable>
            <BarGraph></BarGraph>
          </Col>
        </Row>
      </Container>
  );
}

export default AdminDashboard;