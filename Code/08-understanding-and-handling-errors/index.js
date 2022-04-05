"use strict";

function doTask(amount) {
  if (typeof amount !== "number")
    throw new TypeError("amount must be a number");
  if (amount <= 0) throw new RangeError("amount must be greater than zero");
  if (amount % 2) {
    const err = new OddError("amount");
    throw err;
  }
  return amount / 2;
}

class OddError extends Error {
  code = "ERR_MUST_BE_EVEN";

  constructor(varName = "") {
    super(`${varName} must be even.`);
  }

  get name() {
    return "OddError";
  }
}

// try {
//   const result = doTask(4);
//   result();
//   console.log("result", result);
// } catch (err) {
//   if (err instanceof TypeError) {
//     console.error("wrong type");
//   } else if (err instanceof RangeError) {
//     console.error("out of range");
//   } else if (err.code === "ERR_MUST_BE_EVEN") {
//     console.error("cannot be odd");
//   } else {
//     console.error("Unknown error", err);
//   }
// }

new Promise((_, reject) => reject()).catch(() => console.log("hi"));
process.stdin.resume();
