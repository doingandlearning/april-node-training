"use strict";
// console.log("initialized");
// process.stdin.pipe(process.stdout);

// // console.log("getting ready for the uppercase stream");
// // const { Transform } = require("stream");
// // const createUppercaseStream = () => {
// //   return new Transform({
// //     transform(chunk, enc, next) {
// //       const uppercased = chunk.toString().toUpperCase();
// //       next(null, uppercased);
// //     },
// //   });
// // };

// // const uppercase = createUppercaseStream();

// // process.stdin.pipe(uppercase).pipe(process.stdout);

// // console.log("terminal or piped");

// console.log(process.stdin.isTTY ? "terminal" : "piped to");
// // console.log(process.stderr.write("There is an error."));

process.on("finish", () => {
  console.log("Program exited - exitcode = ", process.exitCode);
});

process.exit(2);
