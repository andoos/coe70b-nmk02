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

/* GET user credentials stored in user credentials table*/
router.get("/", function (req, res, next) {
  const sqlQuery = "SELECT * FROM hardware.UserCredentials WHERE Id = 1;";
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    res.send({
      username: result[0].Username,
      password: result[0].Password,
    });
  });
  //res.render("index", { title: "Express" });
});

module.exports = router;
