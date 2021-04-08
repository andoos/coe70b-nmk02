import React, { useState } from "react";

import { Container, Row, Col } from "reactstrap";

import dashboardStyles from "./AdminDashboard.module.css";

import AdminNavBar from "../../components/AdminNavBar/AdminNavBar.jsx";
import DataTable from "../../components/DataTable/DataTable.jsx";
import BarGraph from "../../components/BarGraph/BarGraph.jsx";
import Recommendation from "../../components/Recommendation/Recommendation.jsx";

function AdminDashboard() {
  const [isRefreshData, setIsRefreshData] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);

  const divStyle = {
    height: "400px",
    overflow: "scroll",
    overflowX: "hidden",
    marginBottom: "24px",
  };

  return (
    <Container fluid>
      <AdminNavBar
        refresh={isRefreshData}
        setRefresh={setIsRefreshData}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></AdminNavBar>
      <ul></ul>
      <Row>
        <Col>
          <div style={divStyle}>
            <DataTable
              refresh={isRefreshData}
              setRefresh={setIsRefreshData}
              selectedDate={selectedDate}
              title="Employees not Social Distancing"
              header1="Employee 1"
              header2="Employee 2"
              header3="Distance (m)"
              header4="Time"
              data="bluetoothData"
            />
          </div>
        </Col>
        <Col>
          <div style={divStyle}>
            <DataTable
              refresh={isRefreshData}
              setRefresh={setIsRefreshData}
              selectedDate={selectedDate}
              title="Employees with High Temperatures"
              header1="Employee"
              header2="Temperature (Celsius)"
              header3="Time"
              data="temperatureData"
            />
          </div>
        </Col>
        <Col>
          <div style={divStyle}>
            <DataTable
              refresh={isRefreshData}
              setRefresh={setIsRefreshData}
              selectedDate={selectedDate}
              title="Flagged Employees"
              header1="Employee"
              header2="Flags"
              header3="Shift Start"
              header4="Shift End"
              data="flagData"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <BarGraph
            refresh={isRefreshData}
            setRefresh={setIsRefreshData}
            selectedDate={selectedDate}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Recommendation
            title="Summary"
            refresh={isRefreshData}
            setRefresh={setIsRefreshData}
            selectedDate={selectedDate}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
