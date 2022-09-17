const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorhandler = require("errorhandler");

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorhandler());

app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// finally, let's start our server...
var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + server.address().port);
});
