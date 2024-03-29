import React from "react";

import { Bar } from "react-chartjs-2";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

import { useEffect, useState } from "react";

var employeesNoDistancing = [];

function BarGraph(props) {
  const [bluetoothData, setbluetoothData] = useState([]);
  const [refreshData, setRefreshData] = useState(1);

  // Convert date to epoch
  function getEpochForDate(date) {
    const rawDate = new Date(date).toLocaleString().split(",")[0];
    var startTime = new Date(rawDate + " 00:00:00").getTime() / 1000;
    var endTime = new Date(rawDate + " 23:59:59").getTime() / 1000;
    return [startTime, endTime];
  }

  useEffect(() => {
    if (refreshData == 1) {
      getBluetooth();
    }
    toggleRefresh();
  }, [refreshData, props.refresh]);

  const getBluetooth = async () => {
    var startTime, endTime;
    if (props.selectedDate) {
      [startTime, endTime] = getEpochForDate(props.selectedDate);
    } else {
      const today = new Date().toLocaleString().split(",")[0];
      startTime = new Date(today + " 00:00:00").getTime() / 1000;
      endTime = new Date(today + " 23:59:59").getTime() / 1000;
    }
    const response = await fetch(
      "v1/api/bluetooth/graph?startTime=" + startTime + "&endTime=" + endTime
    );
    const data = await response.json();

    var hoursNoDistancing = [];
    var hoursCounter = 0;

    for (var i = 0; i < data.length; i++) {
      hoursNoDistancing.push(data[i].Hour);
    }
    for (var i = 0; i < 24; i++) {
      if (
        hoursNoDistancing.indexOf("0" + i + ":00") !== -1 ||
        hoursNoDistancing.indexOf(i + ":00") !== -1
      ) {
        employeesNoDistancing.push(data[hoursCounter].Employee);
        hoursCounter++;
      } else {
        employeesNoDistancing.push(0);
      }
    }
    setbluetoothData(data);
  };

  const toggleRefresh = () => {
    if (props.refresh == 1) {
      setRefreshData(!refreshData);
      employeesNoDistancing = [];
      props.setRefresh(0);
    }
  };
  return (
    <Card className="card-chart">
      <CardHeader>
        <h4 className="card-category"></h4>
        <CardTitle tag="h4">
          {/*<i className="tim-icons icon-delivery-fast text-primary" /> 3,500€ */}
          Sum of Employees not Social Distancing
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart-area">
          <Bar
            data={(canvas) => {
              let ctx = canvas.getContext("2d");

              let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

              gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
              gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
              gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

              return {
                labels: [
                  "0:00",
                  "1:00",
                  "2:00",
                  "3:00",
                  "4:00",
                  "5:00",
                  "6:00",
                  "7:00",
                  "8:00",
                  "9:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                  "18:00",
                  "19:00",
                  "20:00",
                  "21:00",
                  "22:00",
                  "23:00",
                ], // X AXIS
                datasets: [
                  {
                    label: "Number of Employees in Close Contact",
                    fill: true,
                    backgroundColor: gradientStroke,
                    hoverBackgroundColor: gradientStroke,
                    borderColor: "#d048b6",
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    //data: [0, 2, 0, 9, 20, 9, 4, 2, 0, 6], // Y AXIS
                    data: employeesNoDistancing,
                  },
                ],
              };
            }}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
              tooltips: {
                backgroundColor: "#f5f5f5",
                titleFontColor: "#333",
                bodyFontColor: "#666",
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
              },
              responsive: true,
              scales: {
                yAxes: [
                  {
                    gridLines: {
                      drawBorder: false,
                      color: "rgba(225,78,202,0.1)",
                      zeroLineColor: "transparent",
                    },
                    ticks: {
                      suggestedMin: 0,
                      suggestedMax: Math.max(...employeesNoDistancing),
                      padding: 10,
                      fontColor: "#9e9e9e",
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      drawBorder: false,
                      color: "rgba(225,78,202,0.1)",
                      zeroLineColor: "transparent",
                    },
                    ticks: {
                      padding: 20,
                      fontColor: "#9e9e9e",
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default BarGraph;
export const hotspots = employeesNoDistancing;
