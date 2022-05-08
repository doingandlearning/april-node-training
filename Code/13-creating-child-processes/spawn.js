"use strict";
const { spawnSync, spawn } = require("child_process");

// Example 1:

const result = spawnSync(process.execPath, [
  "-e",
  `console.log('subprocess stdio output')`,
]);
console.log(result);

// Example 2:

// const result = spawnSync(process.execPath, [`-e`, `process.exit(1)`]);
// console.log(result);

// Example 3:

// const sp = spawn(process.execPath, [
//   `-e`,
//   `console.log('subprocess stdio output')`,
// ]);

// console.log("pid is", sp.pid);

// sp.stdout.pipe(process.stdout);

// sp.on("close", (status) => {
//   console.log("exit status was", status);
// });

// Example 4:

// const sp = spawn(process.execPath, [`-e`, `process.exit(1)`]);

// console.log("pid is", sp.pid);

// sp.stdout.pipe(process.stdout);

// sp.on("close", (status) => {
//   console.log("exit status was", status);
// });
