const fs = require("fs");

function readFile(filename, encoding) {
  //TODO Create a promise version of the async readFile function
  fs.readFile("./blah.nofile", (err, data) => {
    if (err) {
      throw err
    }
    next(data);
  });
}

readFile("./support/demofile1.txt", "utf-8")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
