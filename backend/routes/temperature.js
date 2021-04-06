const { db } = require("../database.js");

var express = require("express");
var cors = require("cors");

var router = express.Router();

// GET v1/api/temperature
// returns all temperature events
// GET v1/api/temperature?startTime={startTime}&endTime={endTime}
// returns all temperature events during the specified time range
router.get("/", cors(), function (req, res) {
  if (req.query.startTime == null && req.query.endTime == null) {
    sqlQuery = "SELECT * FROM hardware.TemperatureEvent;";
    db.query(sqlQuery, (err, result) => {
      res.send(
        result.map((element) => {
          return {
            TemperatureEventID: element.TemperatureEventID,
            Temperature: element.Temperature,
            Wrist_ID: element.Wrist_ID,
            Timestamp: new Date(element.Timestamp * 1000).toLocaleString(),
          };
        })
      );
    });
  } else {
    sqlQuery =
      "SELECT t1.TemperatureEventID, t1.Temperature, t1.Timestamp, t2.EmployeeName FROM (SELECT * FROM hardware.TemperatureEvent WHERE Timestamp > " +
      req.query.startTime +
      " AND Timestamp < " +
      req.query.endTime +
      ") t1 INNER JOIN (SELECT * FROM hardware.Employees WHERE ShiftStart >= " +
      req.query.startTime +
      " AND ShiftEnd <= " +
      req.query.endTime +
      ") t2 ON t1.Wrist_ID = t2.Wrist_ID ORDER BY t1.Timestamp ASC;";
    db.query(sqlQuery, (err, result) => {
      res.send(
        result.map((element) => {
          return {
            TemperatureEventID: element.TemperatureEventID,
            Temperature: element.Temperature,
            EmployeeName: element.EmployeeName,
            Timestamp: new Date(element.Timestamp * 1000).toLocaleString(),
          };
        })
      );
    });
  }
});

// GET v1/api/temperature/{wristId}
// returns temperature events for a wrist id
router.get("/:wristId", function (req, res) {
  sqlQuery =
    "SELECT * FROM hardware.TemperatureEvent WHERE Wrist_ID='" +
    req.params.wristId +
    "';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

module.exports = router;
