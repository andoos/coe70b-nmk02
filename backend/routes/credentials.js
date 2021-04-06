const { db } = require("../database.js");

var express = require("express");
var cors = require("cors");

var router = express.Router();

// GET /v1/api/credentials
// returns administrator username and password 
router.get("/", cors(),function (req, res) {
  sqlQuery = "SELECT * FROM hardware.UserCredentials WHERE Id = 1;";
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    res.send({
      username: result[0].Username,
      password: result[0].Password,
    });
  });
});

module.exports = router;
