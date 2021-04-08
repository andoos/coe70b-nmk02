import React, { useState, useEffect } from "react";

import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

// Render Bluetooth Data in Table
const renderbluetoothData = (employee, index) => {
  return (
    <tr key={index.idBluetoothEvent_NEW}>
      <td>{employee.EmployeeA}</td>
      <td>{employee.EmployeeB}</td>
      <td>{employee.Distance}</td>
      <td>{employee.Timestamp}</td>
    </tr>
  );
};

// Render Temperature Data in Table
const rendertemperatureData = (employee, index) => {
  return (
    <tr key={index.idTemperatureEvent_NEW}>
      <td>{employee.EmployeeName}</td>
      <td>{employee.Temperature}</td>
      <td>{employee.Timestamp}</td>
    </tr>
  );
};

// Render Flag Data in Table
const renderflagData = (employee, index) => {
  return (
    <tr key={index}>
      <td>{employee.EmployeeName}</td>
      <td>{employee.Flags}</td>
      <td>{employee.ShiftStart}</td>
      <td>{employee.ShiftEnd}</td>
    </tr>
  );
};

// Convert date to epoch
function getEpochForDate(date) {
  const rawDate = new Date(date).toLocaleString().split(",")[0];
  var startTime = new Date(rawDate + " 00:00:00").getTime() / 1000;
  var endTime = new Date(rawDate + " 23:59:59").getTime() / 1000;
  return [startTime, endTime];
}

function DataTable(props) {
  const [bluetoothData, setbluetoothData] = useState([]);
  const [temperatureData, settemperatureData] = useState([]);
  const [flagData, setflagData] = useState([]);
  const [refreshData, setRefreshData] = useState(1);

  useEffect(() => {
    if (props.data == "bluetoothData" && refreshData == 1) {
      getBluetooth();
    } else if (props.data == "temperatureData" && refreshData == 1) {
      getTemperature();
    } else if (props.data == "flagData" && refreshData == 1) {
      getFlag();
    }
    toggleRefresh();
  }, [refreshData, props.refresh]);

  const getBluetooth = async () => {
    var startTime, endTime;
    var response;
    console.log(props.selectedDate);
    if (props.selectedDate) {
      [startTime, endTime] = getEpochForDate(props.selectedDate);
      response = await fetch(
        "/v1/api/bluetooth?startTime=" + startTime + "&endTime=" + endTime
      );
    } else {
      response = await fetch(
        "/v1/api/bluetooth?startTime=1616158800&endTime=1616202000" // Hardcoded for March 19 9AM - 9PM
      );
    }
    const data = await response.json();
    setbluetoothData(data);
  };

  const getTemperature = async () => {
    var startTime, endTime;
    var response;
    console.log(props.selectedDate);
    if (props.selectedDate) {
      [startTime, endTime] = getEpochForDate(props.selectedDate);
      response = await fetch(
        "/v1/api/temperature?startTime=" + startTime + "&endTime=" + endTime
      );
    } else {
      response = await fetch(
        "/v1/api/temperature?startTime=1616158800&endTime=1616202000" // Hardcoded for March 19 9AM - 9PM
      );
    }
    const data = await response.json();
    settemperatureData(data);
  };

  const getFlag = async () => {
    var startTime, endTime;
    var response;
    console.log(props.selectedDate);
    if (props.selectedDate) {
      [startTime, endTime] = getEpochForDate(props.selectedDate);
      response = await fetch(
        "/v1/api/employee/flag?startTime=" + startTime + "&endTime=" + endTime
      );
    } else {
      response = await fetch(
        "/v1/api/employee/flag?startTime=1616158800&endTime=1616202000" // Hardcoded for March 19 9AM - 9PM
      );
    }
    const data = await response.json();
    setflagData(data);
  };

  const toggleRefresh = () => {
    if (props.refresh == 1) {
      setRefreshData(!refreshData);
      props.setRefresh(0);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{props.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <Table className="tablesorter">
          <thead className="text-primary">
            <tr>
              <th>{props.header1}</th>
              <th>{props.header2}</th>
              <th>{props.header3}</th>
              <th className="text-center">{props.header4}</th>
            </tr>
          </thead>
          <tbody>
            {props.data == "bluetoothData"
              ? bluetoothData.map(renderbluetoothData)
              : null}
            {props.data == "temperatureData"
              ? temperatureData.map(rendertemperatureData)
              : null}
            {props.data == "flagData" ? flagData.map(renderflagData) : null}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default DataTable;
