const { db } = require("../database.js");

var express = require("express");
var cors = require("cors");

var router = express.Router();

// GET /v1/api/employee
// returns all employee readings
// GET /v1/api/employee?startTime={startTime}&endTime={endTime}
// returns employee readings during the specified time range
router.get("/", cors(), function (req, res) {
  if (req.query.startTime == null && req.query.endTime == null) {
    sqlQuery = "SELECT * FROM hardware.Employees";
    db.query(sqlQuery, (err, result) => {
      res.send(result);
    });
  } else {
    const sqlQuery =
      "SELECT * FROM hardware.Employees WHERE ShiftStart >= " +
      req.query.startTime +
      " AND ShiftEnd <= " +
      req.query.endTime +
      ";";
    db.query(sqlQuery, (err, result) => {
      res.send(result);
    });
  }
});

// GET /v1/api/employee/flag
// query to be fixed
router.get("/flag", cors(), function (req, res) {
  if (req.query.startTime == null && req.query.endTime == null) {
    sqlQuery = "SELECT * FROM hardware.Employees";
    db.query(sqlQuery, (err, result) => {
      res.send(result);
    });
  } else {
    const sqlQuery =
      "SELECT t.ename, COUNT(t.ename) as Flags, t.shiftstart, t.shiftend FROM hardware.BluetoothEvent as bt INNER JOIN (SELECT hardware.Employees.EmployeeName as ename, hardware.Employees.Wrist_ID as wristid, hardware.Employees.ShiftStart as shiftstart, hardware.Employees.ShiftEnd FROM hardware.TemperatureEvent INNER JOIN hardware.Employees ON hardware.TemperatureEvent.Wrist_ID = hardware.Employees.Wrist_ID WHERE hardware.TemperatureEvent.Temperature > 38.0 AND hardware.Employees.ShiftStart >= " +
      req.query.startTime +
      " AND hardware.Employees.ShiftEnd <= " +
      req.query.endTime +
      " GROUP BY hardware.Employees.EmployeeName) as t ON t.wristid = bt.Wrist_ID_A OR t.wristid = bt.Wrist_ID_B WHERE bt.Timestamp between " +
      req.query.startTime +
      " and " +
      req.query.endTime +
      " GROUP BY t.ename order by Flags desc;";
    db.query(sqlQuery, (err, result) => {
      res.send(
        result.map((element) => {
          return {
            //TemperatureEventID: element.TemperatureEventID,
            EmployeeName: element.ename,
            Flags: element.Flags,
            ShiftStart: new Date(element.ShiftStart * 1000).toLocaleString(),
            ShiftEnd: new Date(element.ShiftEnd * 1000).toLocaleString(),
          };
        })
      );
    });
  }
});

// GET /v1/api/employee/{wristId}
// returns all employee readings
// GET /v1/api/employee/{wristId}?startTime={startTime}&endTime={endTime}
// returns all employee readings during the specified time range
router.get("/:wristId", cors(), function (req, res) {
  if (req.query.time == null) {
    sqlQuery =
      "SELECT * FROM hardware.Employees WHERE Wrist_ID = '" +
      req.params.wristId +
      "';";
    db.query(sqlQuery, (err, result) => {
      res.send(result);
    });
  } else {
    sqlQuery =
      "SELECT * FROM hardware.Employees WHERE Wrist_ID = '" +
      req.params.wristId +
      "' AND ShiftStart < " +
      req.query.time +
      " AND ShiftEnd > " +
      req.query.time +
      ";";
    db.query(sqlQuery, (err, result) => {
      res.send({
        name: result[0].EmployeeName,
        shiftStart: new Date(result[0].ShiftStart * 1000).toLocaleString(),
        shiftEnd: new Date(result[0].ShiftEnd * 1000).toLocaleString(),
      });
    });
  }
});

module.exports = router;
