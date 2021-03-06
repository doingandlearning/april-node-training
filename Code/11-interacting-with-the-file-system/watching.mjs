"use strict";
import { join, resolve } from "path";
import { watch, readdirSync, statSync } from "fs";

const cwd = resolve(".");
const files = new Set(readdirSync("."));
watch(".", (evt, filename) => {
  try {
    const { ctimeMs, mtimeMs, ...rest } = statSync(join(cwd, filename));
    console.log(rest);
    if (files.has(filename) === false) {
      evt = "created";
      files.add(filename);
    } else {
      if (ctimeMs === mtimeMs) evt = "content-updated";
      else evt = "status-updated";
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      files.delete(filename);
      evt = "deleted";
    } else {
      console.error(err);
    }
  } finally {
    console.log(evt, filename);
  }
});
