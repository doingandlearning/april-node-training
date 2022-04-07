"use strict";
// const req = require("../req-prom.js");

import req from "../req-prom-esm.js";
import { setTimeout } from "timers";

global.setTimeout = setTimeout;

test("handles network errors", async () => {
  await expect(req("http://error.com")).rejects.toStrictEqual(
    Error("network error")
  );
});

test("responds with data", async () => {
  const data = await req("http://example.com");
  expect(Buffer.isBuffer(data)).toBeTruthy();
  expect(data).toStrictEqual(Buffer.from("some data"));
});
