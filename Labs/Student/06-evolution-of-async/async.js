const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const files = ["./support/demofile.txt", "./support/demofile.other.txt"];

let promises = files.map((name) => readFile(name, { encoding: "utf8" }));
Promise.all(promises).then((values) => {
  // <-- Uses .all
  console.log(values);
});
