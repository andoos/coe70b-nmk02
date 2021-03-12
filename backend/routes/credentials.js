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

/* GET temperature readings for a wrist id*/
router.get("/usercredentials", function (req, res, next) {
  const sqlQuery = "SELECT * FROM UserCredentials';";
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    res.send(result);
  });
  //res.render("index", { title: "Express" });
});

module.exports = router;
