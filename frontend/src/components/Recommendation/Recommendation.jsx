import React, { useState, useEffect } from "react";

import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

import { hotspots } from "../BarGraph/BarGraph.jsx";

function Recommendation(props) {

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();

    console.log(hotspots);
    let unsortedhotspots = hotspots;
    let sortedhotspots = hotspots;
    sortedhotspots.sort((a,b) => b - a);
    console.log(sortedhotspots);
    for(var j = sortedhotspots.length; j > 0; j--) {
        if(sortedhotspots[j] == 0) {
            sortedhotspots.splice(j, 1);
        }
    }
    console.log(sortedhotspots);

    // get the median number, the recommendation will recommend times where the count was greater than the median
    let lowMiddle = Math.floor((sortedhotspots.length - 1) / 2);
    let highMiddle = Math.ceil((sortedhotspots.length - 1) / 2);
    let median = (sortedhotspots[lowMiddle] + sortedhotspots[highMiddle]) / 2;
    console.log(median);
    let times = [];

    //ERROR: for some reason, hotspots gets trimmed into whatever sortedhotspots was, even though i never edit it... 
    console.log(unsortedhotspots);
    for (var i = 0; i < hotspots.length; i++) {
        if(i == 0) {
            times = [];
        }
        if (hotspots[i] > median) {
            console.log(hotspots[i]);
            var time = i + ':00';
            console.log(time);
            times.push(time);
        }
    }

    console.log(times);
    console.log(times.length);

    var strTime = "";

    for (var k = 0; k < times.length; k++) {
        if(times.length - k > 1) {
            strTime = strTime + times[k] + ', ';
        }
        else {
            strTime = strTime + times[k] + ".";
        }
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{props.title} for {year}/{month}/{date}</CardTitle>
        </CardHeader>
        <CardBody>
          <p>The following employees should be sent home until they produce a negative COVID-19 test or quarantine for 14 days: </p>
          <p>The following times are hotspots: {strTime}</p>
        </CardBody>
      </Card>
    );
  }
  
  export default Recommendation;
  