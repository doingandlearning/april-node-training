const finalhandler = require("finalhandler");
const http = require("http");
const morgan = require("morgan");

// create "middleware"
const logger = morgan("combined");

http
  .createServer(function (req, res) {
    const done = finalhandler(req, res);
    logger(req, res, function (err) {
      if (err) return done(err);

      // respond to request
      res.setHeader("content-type", "text/plain");
      res.end("hello, world!");
    });
  })
  .listen(3000);
