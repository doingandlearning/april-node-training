import { setTimeout } from "timers/promises";

const timeout = setTimeout(1000, "will be logged");

setImmediate(() => {
  clearTimeout(timeout);
});

console.log(await timeout);
