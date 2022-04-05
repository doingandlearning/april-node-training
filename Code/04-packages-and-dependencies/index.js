import { realpath } from "fs/promises";
import url from "url";
import * as format from "./format.js";

let reverseAndUpper = () => {};

console.log(url.pathToFileURL("./app.js"));

const isMain =
  process.argv[1] &&
  (await realpath(url.fileURLToPath(import.meta.url))) ===
    (await realpath(process.argv[1]));

if (isMain) {
  const { default: pino } = await import("pino");
  const logger = pino();
  function sayHello() {
    logger.info("Hello!");
  }
  sayHello();
} else {
  reverseAndUpper = async (str) => {
    return format.upper(str).split("").reverse().join("");
  };
}

export default reverseAndUpper;
