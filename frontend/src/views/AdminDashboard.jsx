import React, { useState } from "react";

import { Container, Row, Col, CardDeck, CardColumns } from "reactstrap";

import AdminNavBar from "../components/AdminNavBar/AdminNavBar.jsx";
import DataTable from "../components/DataTable/DataTable.jsx";
import BarGraph from "../components/BarGraph/BarGraph.jsx";

//import "./assets/css/App.css";
//import BlackDashboardStyles from "./assets/css/black-dashboard-react.css";
//import NucleoIcons from "./assets/css/nucleo-icons.css";

function AdminDashboard() {
  const [table, setTable] = useState([
    { title: "Employees not Social Distancing", header1: "Employee 1", header2: "Employee 2", header3: "Distance (m)", header4: "Duration (mins)"},
    { title: "Employees with High Temperatures", data: ""},
    { title: "Employees to be sent home", data: ""},    
  ])


  return (
    <Container fluid>
      <AdminNavBar></AdminNavBar>
      <li></li>
      <Row>
        <Col>
          <DataTable title = "Employees not Social Distancing" header1 = "Employee 1" header2 = "Employee 2" header3 = "Distance (m)" header4 = "Duration (mins)" data = "bluetoothData"/>
          {/* {table.map(tbl => (
            <DataTable title = {tbl.title} data = {tbl.data}/>
          ))} */}
        </Col>
        <Col>
          <DataTable title = "Employees with High Temperatures" header1 = "Employee" header2 = "Temperature (Celsius)" header3 = "Shift Start" header4 = "Shift End" data = "temperatureData"/>
        </Col>
        <Col>
          <DataTable title = "Employees to be sent home" header1 = "Employee" header2 = "FLAG" header3 = "Shift Start" header4 = "Shift End" data = "flagData"/>
        </Col>
      </Row>
      <Row>
        <Col>
          <BarGraph />
        </Col>
        {/* <Col>
          <BarGraph />
        </Col> */}
      </Row>
    </Container>
  );
}

export default AdminDashboard;
