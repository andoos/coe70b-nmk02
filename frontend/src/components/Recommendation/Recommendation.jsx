import React, { useState, useEffect } from "react";

import { Card, CardBody, CardHeader, CardTitle} from "reactstrap";

import { hotspots } from "../BarGraph/BarGraph.jsx";
//import the flag data to get the names that are above the median count

var employeesNoDistancing = [];

function Recommendation(props) {
  const [hotspotData, sethotspotData] = useState(0);
  const [refreshData, setRefreshData] = useState(1);

  useEffect(() => {
    if (refreshData == 1) {
      getHotspot();
    }
    toggleRefresh();
  }, [refreshData, props.refresh]);

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();

  const toggleRefresh = () => {
    if (props.refresh == 1) {
      setRefreshData(!refreshData);
      employeesNoDistancing = [];
      props.setRefresh(0);
    }
  };

  const getHotspot = async () => {
    const response = await fetch(
      "http://localhost:5000/v1/api/bluetooth/graph?startTime=1616158800&endTime=1616202000"
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

    let unsortedhotspots = [];
    let sortedhotspots = [];

    for (var i = 0; i < employeesNoDistancing.length; i++) {
      unsortedhotspots.push(employeesNoDistancing[i]);
      sortedhotspots.push(employeesNoDistancing[i]);
    }

    sortedhotspots.sort((a, b) => b - a);
    for (var j = sortedhotspots.length; j > 0; j--) {
      if (sortedhotspots[j] == 0) {
        sortedhotspots.splice(j, 1);
      }
    }

    // get the median number, the recommendation will recommend times where the count was greater than the median
    let lowMiddle = Math.floor((sortedhotspots.length - 1) / 2);
    let highMiddle = Math.ceil((sortedhotspots.length - 1) / 2);
    let median = (sortedhotspots[lowMiddle] + sortedhotspots[highMiddle]) / 2;

    let times = [];

    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        times = [];
      }
      if (unsortedhotspots[i] > median) {
        var time = i + ":00";
        times.push(time);
      }
    }

    var strTime = "";

    for (var k = 0; k < times.length; k++) {
      if (times.length - k > 1) {
        strTime = strTime + times[k] + ", ";
      } else {
        strTime = strTime + times[k] + ".";
      }
    }
    sethotspotData(strTime);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          {props.title} for {year}/{month}/{date}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <p>
          The following employees should be sent home until they produce a
          negative COVID-19 test or quarantine for 14 days:{" "}
        </p>
        <p>The following times are hotspots: {hotspotData}</p>
      </CardBody>
    </Card>
  );
}

export default Recommendation;
