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

  const [isRefreshData, setIsRefreshData] = useState(0); 

  const divStyle = {
    height: '400px',
    overflow: 'scroll',
  };

  return (
    <Container fluid>
      <AdminNavBar setRefresh = {setIsRefreshData}></AdminNavBar>
      <ul></ul>
      <Row>
        <Col>
          <div style={divStyle}><DataTable refresh = {isRefreshData} setRefresh = {setIsRefreshData} title = "Employees not Social Distancing" header1 = "Employee 1" header2 = "Employee 2" header3 = "Distance (m)" header4 = "Time" data = "bluetoothData"/></div>
          
          {/* {table.map(tbl => (
            <DataTable title = {tbl.title} data = {tbl.data}/>
          ))} */}

        </Col>
        <Col>
        <div style={divStyle}><DataTable refresh = {isRefreshData} setRefresh = {setIsRefreshData}  title = "Employees with High Temperatures" header1 = "Employee" header2 = "Temperature (Celsius)" header3 = "Shift Start" header4 = "Shift End" data = "temperatureData"/></div>
          
        </Col>
        <Col>
        <div style={divStyle}><DataTable refresh = {isRefreshData} setRefresh = {setIsRefreshData}  title = "Employees to be sent home" header1 = "Employee" header2 = "FLAG" header3 = "Shift Start" header4 = "Shift End" data = "flagData"/></div>
          
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
