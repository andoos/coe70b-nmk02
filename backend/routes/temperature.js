var express = require("express");
var router = express.Router();
var cors = require("cors");

const { db } = require("../database.js");

/* GET all temperature readings*/
router.get("/", cors(), function (req, res, next) {
  const sqlQuery = "SELECT * FROM hardware.TemperatureEvent;";
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
