import React from "react";

import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

// Bluetooth Data
const bluetoothData = [
  {employeeA: "Jacob", employeeB: "Kevin", distance: 1.3, duration: 20},
  {employeeA: "Raymond", employeeB: "Jane", distance: 0.5, duration: 5},
  {employeeA: "Debra", employeeB: "Dave", distance: 1.4, duration: 50}
]

// Temperature Data
const temperatureData = [
  {employee: "Debra", temperature: 39.3, shiftstart: 900, shiftend: 2100},
  {employee: "Andrew", temperature: 39, shiftstart: 600, shiftend: 1800},
  {employee: "Omar", temperature: 38.6, shiftstart: 900, shiftend: 2100},
  {employee: "Karen", temperature: 38, shiftstart: 330, shiftend: 1530}
]

// Flag Data
const flagData = [
  {employee: "Debra", flag: "TRUE", shiftstart: 900, shiftend: 2100}
]

// Render Bluetooth Data in Table
const renderbluetoothData = (employee, index) => {
  return(
    <tr key = {index}>
      <td>{employee.employeeA}</td>
      <td>{employee.employeeB}</td>
      <td>{employee.distance}</td>
      <td>{employee.duration}</td>
    </tr>
  )
}

// Render Temperature Data in Table
const rendertemperatureData = (employee, index) => {
  return(
    <tr key = {index}>
      <td>{employee.employee}</td>
      <td>{employee.temperature}</td>
      <td>{employee.shiftstart}</td>
      <td>{employee.shiftend}</td>
    </tr>
  )
}

// Render Flag Data in Table
const renderflagData = (employee, index) => {
  return(
    <tr key = {index}>
      <td>{employee.employee}</td>
      <td>{employee.flag}</td>
      <td>{employee.shiftstart}</td>
      <td>{employee.shiftend}</td>
    </tr>
  )
}
function DataTable(props) {
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
            {props.data == "bluetoothData" ? bluetoothData.map(renderbluetoothData) : null}
            {props.data == "temperatureData" ? temperatureData.map(rendertemperatureData) : null}
            {props.data == "flagData" ? flagData.map(renderflagData) : null}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default DataTable;
