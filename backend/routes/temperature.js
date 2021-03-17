var express = require("express");
var cors = require("cors");
var router = express.Router();

const { db } = require("../database.js");

/* GET all temperature readings*/
router.get("/", cors(), function (req, res, next) {
  if (req.query.startTime == null && req.query.endTime == null) {
    sqlQuery = "SELECT * FROM hardware.TemperatureEvent;";
  } else {
    sqlQuery =
      "SELECT * FROM hardware.TemperatureEvent WHERE Timestamp > " +
      req.query.startTime +
      " AND Timestamp < " +
      req.query.endTime +
      ";";
  }
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/* GET all temperature readings for a wrist id*/
router.get("/:wristId", function (req, res, next) {
  const sqlQuery =
    "SELECT * FROM hardware.TemperatureEvent WHERE Wrist_ID='" +
    req.params.wristId +
    "';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});



module.exports = router;
