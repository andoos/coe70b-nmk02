import React from "react";

import { Bar } from "react-chartjs-2";
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";

import {
  chartExample3,
} from "./charts.js";

function BarGraph() {
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

export default BarGraph;
