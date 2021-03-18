var express = require("express");
var cors = require("cors");
var router = express.Router();

const { db } = require("../database.js");
const e = require("express");

/* GET all temperature readings */
router.get("/", cors(), function (req, res, next) {
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

/* GET all temperature readings for a wrist id*/
router.get("/:wristId", function (req, res, next) {
  sqlQuery =
    "SELECT * FROM hardware.TemperatureEvent WHERE Wrist_ID='" +
    req.params.wristId +
    "';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

module.exports = router;
