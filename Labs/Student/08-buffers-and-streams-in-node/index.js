// TODO: Initialize project and get it in module mode
// TODO: Install csv-parse
import { parse } from "csv-parse";
import { createReadStream, symlinkSync } from "fs";
import { FilterFieldByValue } from "./filterFieldByValue.js";
import { createGunzip } from "zlib";

const csvParser = parse({ columns: true });

// Crime per area
// Most common crime per in Croydon
const crimes = {};
createReadStream("london_crime_by_lsoa.csv.gz")
  .pipe(new createGunzip())
  .pipe(csvParser)
  .pipe(new FilterFieldByValue("lsoa_code", "E01001116"))
  .on("data", (rowString) => {
    const row = JSON.parse(rowString);
    crimes[row.major_category] = crimes[row.major_category]
      ? crimes[row.major_category] + 1
      : 1;
    // console.log(crimes);
  })
  .on("finish", () => {
    const max = Math.max(...Object.values(crimes));
    const maxCrime = Object.keys(crimes).find((key) => crimes[key] === max);
    console.log(`The most frequent crime in Croydon is ${maxCrime}.`);
  });

// Fraud or Forgery
