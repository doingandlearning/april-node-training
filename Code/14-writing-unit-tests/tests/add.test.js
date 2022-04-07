// const add = require("../add.js");
import add from "../addesm.js";

test("throw when inputs are not numbers", async () => {
  expect(() => add("5", "5")).toThrowError(Error("inputs must be numbers"));
  expect(() => add("5", 5)).toThrowError(Error("inputs must be numbers"));
  expect(() => add(5, "5")).toThrowError(Error("inputs must be numbers"));
  expect(() => add(true, {})).toThrowError(Error("inputs must be numbers"));
});

test("adds two numbers", async () => {
  expect(add(5, 5)).toEqual(10);
  expect(add(-5, 5)).toEqual(0);
});
