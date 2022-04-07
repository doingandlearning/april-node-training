"use strict";
const { EventEmitter } = require("events");

process.nextTick(console.log, "passed!");
process.stdin.resume();
const ee = new EventEmitter();

ee.on("error", () => console.log("Fixed the crash."));
// Fix this so it doesn't crash
ee.emit("error", Error("timeout"));
