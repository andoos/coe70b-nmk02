var express = require("express");
var mysql = require("mysql");
var router = express.Router();

const db = mysql.createConnection({
  host: "nmk02-mysql-test.csqhhjgbuho8.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Omar1234",
  database: "hardware",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

/* GET all temperature readings*/
router.get("/", function (req, res, next) {
  const sqlQuery = "SELECT * FROM hardware.TemperatureEvent_NEW;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

/* GET all temperature readings for a wrist id*/
router.get("/:wristId", function (req, res, next) {
  const sqlQuery =
    "SELECT * FROM hardware.TemperatureEvent_NEW WHERE Wrist_ID='" +
    req.params.wristId +
    "';";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

module.exports = router;
