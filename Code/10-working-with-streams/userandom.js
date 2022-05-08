import { RandomBytes } from "./random.js";

const randomStream = new RandomBytes();

const fullData = [];

randomStream
  .on("readable", () => {
    let chunk = randomStream.read();
    if (chunk) {
      fullData.push(chunk);
    }
  })
  .on("end", () => {
    console.log(Buffer.concat(fullData).toString());
  })
  .on("error", (error) => {
    console.error(error);
  });
