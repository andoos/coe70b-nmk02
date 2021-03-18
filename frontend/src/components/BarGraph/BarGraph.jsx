import React from "react";

import { Bar } from "react-chartjs-2";
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";

import {
  chartExample3,
} from "./charts.js";
import { useEffect, useState } from "react";

export var employeesNoDistancing = [];

function BarGraph() {
  
  const [bluetoothData, setbluetoothData] = useState([]);

  useEffect(() => {
    getBluetooth();
  }, []);

  const getBluetooth = async () => {
    const response = await fetch("http://localhost:5000/v1/api/bluetooth/graph");
    const data = await response.json();

    var hoursNoDistancing = [];
    var hoursCounter = 0;

    for (var i = 0; i < data.length; i++) {
      hoursNoDistancing.push(data[i].Hour)
    }
    for (var i = 0; i < 24; i++) {
      if (hoursNoDistancing.indexOf("0" + i + ":00") !== -1 || hoursNoDistancing.indexOf(i + ":00") !== -1) {
        employeesNoDistancing.push(data[hoursCounter].Employee);
        hoursCounter++;
      } else {
        employeesNoDistancing.push(0);
      }
    }
    console.log(employeesNoDistancing);
    setbluetoothData(data);
  }
  
  return (
    <Card className="card-chart">
      <CardHeader>
        <h5 className="card-category">Sum of Employees not Social Distancing</h5>
        {/* <CardTitle tag="h3">
          <i className="tim-icons icon-delivery-fast text-primary" /> 3,500€
        </CardTitle> */}
      </CardHeader>
      <CardBody>
        <div className="chart-area">
        <Bar data={chartExample3.data} options={chartExample3.options} />
        </div>
      </CardBody>
    </Card>
  );
}

// module.exports = {
//   employeesNoDistancing
// };
export default BarGraph;
