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
