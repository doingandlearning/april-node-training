"use strict";
console.log("Current Directory", process.cwd());
console.log("Process Platform", process.platform);
console.log("Process ID", process.pid);

// console.log("Process Uptime", process.uptime());
// setTimeout(() => {
//   console.log("Process Uptime", process.uptime());
// }, 1000);

// const outputStats = () => {
//   const uptime = process.uptime();
//   const { user, system } = process.cpuUsage();
//   console.log(uptime, user, system, (user + system) / 1000000);
// };

// outputStats();

// setTimeout(() => {
//   outputStats();
//   const now = Date.now();
//   // make the CPU do some work:
//   while (Date.now() - now < 5000) {}
//   outputStats();
// }, 500);

const stats = [process.memoryUsage()];

let iterations = 5;

while (iterations--) {
  const arr = [];
  let i = 10000;
  // make the CPU do some work:
  while (i--) {
    arr.push({ [Math.random()]: Math.random() });
  }
  stats.push(process.memoryUsage());
}

console.table(stats);
