import React, { useState, useEffect } from "react";

import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

import { hotspots } from "../BarGraph/BarGraph.jsx";
//import the flag data to get the names that are above the median count

var employeesNoDistancing = [];
var med = 0;

var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();

function Recommendation(props) {
  const [hotspotData, sethotspotData] = useState(0);
  const [employeeData, setemployeeData] = useState(0);
  const [refreshData, setRefreshData] = useState(1);

  // Convert date to epoch
  function getEpochForDate(date) {
    var rawDate = new Date(date);
    year = rawDate.getFullYear();
    month = rawDate.getMonth() + 1;
    day = rawDate.getDate();
    rawDate = rawDate.toLocaleString().split(",")[0];
    var startTime = new Date(rawDate + " 00:00:00").getTime() / 1000;
    var endTime = new Date(rawDate + " 23:59:59").getTime() / 1000;
    return [startTime, endTime];
  }

  useEffect(() => {
    if (refreshData == 1) {
      getHotspot();
      getEmployees();
    }
    toggleRefresh();
  }, [refreshData, props.refresh]);

  const toggleRefresh = () => {
    if (props.refresh == 1) {
      setRefreshData(!refreshData);
      employeesNoDistancing = [];
      props.setRefresh(0);
    }
  };

  const getHotspot = async () => {
    var startTime, endTime;
    var response;
    if (props.selectedDate) {
      [startTime, endTime] = getEpochForDate(props.selectedDate);
      response = await fetch(
        "/v1/api/bluetooth/graph?startTime=" + startTime + "&endTime=" + endTime
      );
    } else {
      response = await fetch(
        "/v1/api/bluetooth/graph?startTime=1616158800&endTime=1616202000" // Hardcoded for March 19 9AM - 9PM
      );
    }
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
    med = median;
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

  // Render Employee Names
  const renderEmployeeNameData = (employee, index) => {
    return employee.EmployeeName;
  };
  // Render Employee Flag counts
  const renderEmployeeFlagsData = (employee, index) => {
    return employee.Flags;
  };
  // get the Employees that appear in the Flag table, will take the ones who's Flags count is 2 * median hotspot count (obtained in getHotspot)
  const getEmployees = async () => {
    var startTime, endTime;
    var response;
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
    console.log(data);

    let names = data.map(renderEmployeeNameData);
    let flags = data.map(renderEmployeeFlagsData);
    console.log(names);
    console.log(flags);

    let bademployees = [];
    // the med*2 is multiplying the median by 2, there's no actual reason for this, pls change this to something that makes more sense if you think of it lol
    for (var i = 0; i < flags.length; i++) {
      if (flags[i] > med * 2) {
        bademployees.push(names[i]);
      }
    }

    let strEmp = "";
    for (var j = 0; j < bademployees.length; j++) {
      if (j == bademployees.length - 1) {
        strEmp = strEmp + bademployees[j] + ".";
      } else {
        strEmp = strEmp + bademployees[j] + ", ";
      }
    }

    setemployeeData(strEmp);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          {props.title} for {year}/{month}/{day}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <p>
          The following employees should be sent home until they produce a
          negative COVID-19 test or quarantine for 14 days: {employeeData}
        </p>
        <p>The following times are hotspots: {hotspotData}</p>
      </CardBody>
    </Card>
  );
}

export default Recommendation;
