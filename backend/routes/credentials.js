var express = require("express");
var router = express.Router();

const { db } = require("../database.js");

/* GET user credentials stored in user credentials table*/
router.get("/", function (req, res, next) {
  const sqlQuery = "SELECT * FROM UserCredentials;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
  //res.render("index", { title: "Express" });
});

module.exports = router;
