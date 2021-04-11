const { db } = require("../database.js");

var express = require("express");
var cors = require("cors");

var router = express.Router();

// GET /v1/api/bluetooth
// returns all bluetooth events
// GET /v1/api/bluetooth?startTime={startTime}&endTime={endTime}
// returns all bluetooth events during the specified time range
router.get("/", cors(), function (req, res) {
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

// GET /v1/api/bluetooth/graph?startTime={startTime}&endTime={endTime}
// returns a hourly count of all bluetooth events in the specified time
router.get("/graph", cors(), function (req, res) {
  sqlQuery =
    "SELECT COUNT(*) AS Employee, t1.Hour FROM" +
    "(SELECT DISTINCT Wrist_ID_A AS Employee, DATE_FORMAT(FROM_UNIXTIME(Timestamp - (4 * 3600)), '%H:00') AS Hour FROM hardware.BluetoothEvent WHERE Timestamp >= " +
    req.query.startTime +
    " AND Timestamp <= " +
    req.query.endTime +
    " UNION SELECT DISTINCT Wrist_ID_B AS Employee, DATE_FORMAT(FROM_UNIXTIME(Timestamp - (4 * 3600)), '%H:00') AS Hour FROM hardware.BluetoothEvent WHERE Timestamp >= " +
    req.query.startTime +
    " AND Timestamp <= " +
    req.query.endTime +
    ") t1 GROUP BY HOUR ORDER BY HOUR ASC;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

module.exports = router;
