var mysql = require("mysql");

// database connection
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

module.exports.db = db;
