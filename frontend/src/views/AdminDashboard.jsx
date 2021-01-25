import React from "react";

import { Container, Row, Col } from "reactstrap";

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
        <Row>
          <Col>
            <DataTable></DataTable>
            <DataTable></DataTable>
          </Col>
          <Col>
            <DataTable></DataTable>
            <BarGraph style={{width: "100%"}}></BarGraph>
          </Col>
        </Row>
      </Container>
  );
}

export default AdminDashboard;