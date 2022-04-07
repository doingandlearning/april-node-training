import { setTimeout } from "timers/promises";

const ac = new AbortController();
const { signal } = ac;
const timeout = setTimeout(1000, "will be logged", { signal });

setImmediate(() => {
  // clearTimeout(timeout);
  ac.abort();
});

try {
  // throw new Error("I'm tired.");
  console.log(await timeout);
} catch (error) {
  if (error.code !== "ABORT_ERR") throw error;
  else console.log("Timeout aborted by controller.");
}
