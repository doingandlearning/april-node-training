"use strict";
const { execSync, exec } = require("child_process");

try {
  const result = execSync(`"${process.execPath}" -p "1+1"`);
  console.log(result.toString());
} catch (err) {
  console.error("CAUGHT ERROR:", err);
}

// try {
//   execSync(`"${process.execPath}" -e "process.exit(1)"`);
// } catch (err) {
//   console.error("CAUGHT ERROR:", err);
// }
// try {
//   execSync(`"${process.execPath}" -e "throw SyntaxError('kaboom')"`);
// } catch (err) {
//   console.error("CAUGHT ERROR:", err.output[2].toString());
// }

// exec(
//   `"${process.execPath}" -e "console.log('A');console.error('B')"`,
//   (err, stdout, stderr) => {
//     console.log("err", err);
//     console.log("subprocess stdout: ", stdout.toString());
//     console.log("subprocess stderr: ", stderr.toString());
//   }
// );

// exec(
//   `"${process.execPath}" -e "throw Error('throwing')"`,
//   (err, stdout, stderr) => {
//     console.log("err", err);
//     console.log("subprocess stdout: ", stdout.toString());
//     console.log("subprocess stderr: ", stderr.toString());
//   }
// );
