var express = require("express");
var router = express.Router();

const { db } = require("../database.js");

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
