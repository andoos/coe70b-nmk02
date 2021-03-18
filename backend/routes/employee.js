var express = require("express");
var cors = require("cors");
var router = express.Router();

const { db } = require("../database.js");

/* GET all employee readings, query paramters to get readings for a day */
router.get("/", cors(), function (req, res, next) {
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

/* GET all employee readings, query paramters to get readings for a day */
router.get("/flag", cors(), function (req, res, next) {
  if (req.query.startTime == null && req.query.endTime == null) {
    sqlQuery = "SELECT * FROM hardware.Employees";
    db.query(sqlQuery, (err, result) => {
      res.send(result);
    });
  } else {
    const sqlQuery =
      "SELECT hardware.Employees.EmployeeName, COUNT(hardware.Employees.EmployeeName) AS Flags, hardware.Employees.ShiftStart, hardware.Employees.ShiftEnd FROM hardware.Employees INNER JOIN hardware.BluetoothEvent ON hardware.BluetoothEvent.Wrist_ID_A = hardware.Employees.Wrist_ID OR hardware.BluetoothEvent.Wrist_ID_B = hardware.Employees.Wrist_ID INNER JOIN hardware.TemperatureEvent ON hardware.TemperatureEvent.Wrist_ID = hardware.Employees.Wrist_ID WHERE hardware.TemperatureEvent.Temperature >= 38.0 AND hardware.Employees.ShiftStart >= " +
      req.query.startTime +
      " AND hardware.Employees.ShiftEnd <= " +
      req.query.endTime +
      " GROUP BY hardware.Employees.EmployeeName ORDER BY Flags DESC;";
    db.query(sqlQuery, (err, result) => {
      res.send(result);
    });
  }
});

/* GET employee name attached to a wrist ID, query parameter time to get employee name */
router.get("/:wristId", cors(), function (req, res, next) {
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
