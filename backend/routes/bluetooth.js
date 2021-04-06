var express = require("express");
var router = express.Router();
var cors = require("cors");

const { db } = require("../database.js");
const { request } = require("express");

/* GET all bluetooth readings */
router.get("/", cors(), function (req, res, next) {
  if (req.query.startTime == null && req.query.endTime == null) {
    sqlQuery = "SELECT * FROM hardware.BluetoothEvent;";
    db.query(sqlQuery, (err, result) => {
      res.send(
        result.map((element) => {
          return {
            BluetoothEventID: element.BluetoothEventID,
            Distance: element.Distance,
            Wrist_ID_A: element.Wrist_ID_A,
            Wrist_ID_B: element.Wrist_ID_B,
            Timestamp: new Date(element.Timestamp * 1000).toLocaleString(),
          };
        })
      );
    });
  } else {
    sqlQuery =
      "SELECT t1.BluetoothEventID, t2.EmployeeName AS EmployeeA, t3.EMployeeName AS EmployeeB, t1.Distance, t1.Timestamp FROM (SELECT * FROM hardware.BluetoothEvent WHERE Timestamp > " +
      req.query.startTime +
      " AND Timestamp < " +
      req.query.endTime +
      ") t1 INNER JOIN (SELECT * FROM hardware.Employees WHERE ShiftStart >= " +
      req.query.startTime +
      " AND ShiftEnd <= " +
      req.query.endTime +
      ") t2 ON t1.Wrist_ID_A = t2.Wrist_ID INNER JOIN (SELECT * FROM hardware.Employees WHERE ShiftStart >= " +
      req.query.startTime +
      " AND ShiftEnd <= " +
      req.query.endTime +
      ") t3 ON t1.Wrist_ID_B = t3.Wrist_ID ORDER BY t1.Timestamp ASC;";
    db.query(sqlQuery, (err, result) => {
      res.send(
        result.map((element) => {
          return {
            BluetoothEventID: element.BluetoothEventID,
            Distance: element.Distance,
            EmployeeA: element.EmployeeA,
            EmployeeB: element.EmployeeB,
            Timestamp: new Date(element.Timestamp * 1000).toLocaleString(),
          };
        })
      );
    });
  }
});

/* GET count of bluetooth events per hour */
router.get("/graph", cors(), function (req, res, next) {
  if (req.query.startTime == null && req.query.endTime == null) {
    sqlQuery =
      "SELECT Count(BluetoothEventID) AS Employee, DATE_FORMAT(FROM_UNIXTIME(Timestamp - (4 * 3600)), '%H:00') AS Hour FROM hardware.BluetoothEvent WHERE Timestamp >= 1616158800 AND Timestamp <= 1616202000 GROUP BY HOUR ORDER BY HOUR ASC;";
  } else {
    sqlQuery =
      "SELECT Count(BluetoothEventID) AS Employee, DATE_FORMAT(FROM_UNIXTIME(Timestamp - (4 * 3600)), '%H:00') AS Hour FROM hardware.BluetoothEvent WHERE Timestamp >=" +
      req.query.startTime +
      " AND Timestamp <= " +
      req.query.endTime +
      " GROUP BY HOUR ORDER BY HOUR ASC";
  }
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/* GET all bluetooth events by wrist id */
router.get("/:wristId", function (req, res, next) {
  sqlQuery =
    "SELECT * FROM hardware.BluetoothEvent WHERE Wrist_ID_A='" +
    req.params.wristId +
    "';";
  db.query(sqlQuery, (err, result) => {
    result;
    res.send(
      result.map((element) => {
        return {
          BluetoothEventID: element.BluetoothEventID,
          Distance: element.Distance,
          Wrist_ID_A: element.Wrist_ID_A,
          Wrist_ID_B: element.Wrist_ID_B,
          Timestamp: new Date(element.Timestamp * 1000).toLocaleString(),
        };
      })
    );
  });
});

module.exports = router;
