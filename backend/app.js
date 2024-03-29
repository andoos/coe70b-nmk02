var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var employeeRouter = require("./routes/employee");
var credentialsRouter = require("./routes/credentials");
var temperatureRouter = require("./routes/temperature");
var bluetoothRouter = require("./routes/bluetooth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1/api/employee", employeeRouter);
app.use("/v1/api/credentials", credentialsRouter);
app.use("/v1/api/temperature", temperatureRouter);
app.use("/v1/api/bluetooth", bluetoothRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error
  res.status(err.status || 500).send("Error");
});

module.exports = app;
