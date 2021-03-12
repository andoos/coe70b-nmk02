var express = require("express");
var router = express.Router();

const { db } = require("../database.js");

/* GET all bluetooth readings*/
router.get("/", function (req, res, next) {
  const sqlQuery = "SELECT * FROM hardware.BluetoothEvent_NEW;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

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
