import { createReadStream } from "fs";
import { createGunzip } from "zlib";
import { parse } from "csv-parse";
import { FilterByCountry } from "./live-filter-by-country.js";
import { SumProfit } from "./live-sum-profit.js";
import { PassThrough } from "stream";

const csvParser = parse({ columns: true });

const monitor = new PassThrough({ objectMode: true });

let counter = 0;

monitor.on("data", () => counter++);
monitor.on("finish", () => console.log(`\n${counter} records processed.`));

createReadStream("data.csv.gz")
  .pipe(new createGunzip())
  .pipe(csvParser)
  .pipe(new FilterByCountry("Italy")) // ✅
  .pipe(monitor)
  .pipe(new SumProfit()) //
  .pipe(process.stdout);
