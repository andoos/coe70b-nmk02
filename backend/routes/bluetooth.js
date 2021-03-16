var express = require("express");
var router = express.Router();
var cors = require('cors');

const { db } = require("../database.js");

/* GET all bluetooth readings*/
router.get("/", cors(), function (req, res, next) {
  const sqlQuery = "SELECT * FROM hardware.BluetoothEvent_NEW;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/* GET sum of all bluetooth readings for the hour */
router.get("/sum", cors(), function (req, res, next) {
  const sqlQuery = "SELECT HOUR(Timestamp) 'hr', COUNT(Timestamp) 'count' FROM hardware.BluetoothEvent_NEW WHERE DAY(Timestamp) = DAY(NOW()) GROUP BY hr;";
  db.query(sqlQuery, (err, result) => {
    res.send(result)
  })
})

/* GET all bluetooth readings for a wrist id*/
router.get("/:wristId", function (req, res, next) {
  const sqlQuery =
    "SELECT * FROM hardware.BluetoothEvent_NEW WHERE Wrist_ID_A='" +
    req.params.wristId +
    "';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

module.exports = router;