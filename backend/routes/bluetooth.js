var express = require("express");
var router = express.Router();
var cors = require("cors");

const { db } = require("../database.js");

/* GET all bluetooth readings*/
router.get("/", cors(), function (req, res, next) {
  if (req.query.startTime == null && req.query.endTime == null) {
    sqlQuery = "SELECT * FROM hardware.BluetoothEvent;";
  } else {
    sqlQuery =
      "SELECT * FROM hardware.BluetoothEvent WHERE Timestamp > " +
      req.query.startTime +
      " AND Timestamp < " +
      req.query.endTime +
      ";";
  }
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
});

/* GET sum of all bluetooth readings for the hour */
router.get("/sum", cors(), function (req, res, next) {
  const sqlQuery =
    "SELECT HOUR(Timestamp) 'hr', COUNT(Timestamp) 'count' FROM hardware.BluetoothEvent WHERE DAY(Timestamp) = DAY(NOW()) GROUP BY hr;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/* api for graph data */
/* GET all bluetooth readings for a wrist id*/
router.get("/graph", cors(), function (req, res, next) {
  if (req.query.startTime == null && req.query.endTime == null) {
    sqlQuery =
      "SELECT 2 * Count(BluetoothEventID) AS Employee, DATE_FORMAT(FROM_UNIXTIME(Timestamp - (4 * 3600)), '%H:00') AS Hour FROM hardware.BluetoothEvent WHERE Timestamp >= 1615867200 AND Timestamp <= 1615953599 GROUP BY HOUR ORDER BY HOUR ASC;";
  } else {
    sqlQuery =
      "SELECT 2 * Count(BluetoothEventID) AS Employee, DATE_FORMAT(FROM_UNIXTIME(Timestamp - (4 * 3600)), '%H:00') AS Hour FROM hardware.BluetoothEvent WHERE Timestamp >=" +
      req.query.startTime +
      " AND Timestamp <= " +
      req.query.endTime +
      " GROUP BY HOUR ORDER BY HOUR ASC";
  }
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/* GET all bluetooth readings for a wrist id*/
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
