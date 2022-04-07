"use strict";
import { promisify } from "util";
const timeout = promisify(setTimeout);

export default async function (url) {
  await timeout(300);
  if (url === "http://error.com") throw Error("network error");
  return Buffer.from("some data");
}
