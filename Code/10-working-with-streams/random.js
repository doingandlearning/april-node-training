import { Readable } from "stream";
import { randomBytes } from "crypto";

export class RandomBytes extends Readable {
  constructor(options) {
    super(options);
    this.emittedBytes = 0;
  }

  _read(size) {
    const chunk = randomBytes(size).toString("hex");
    this.push(chunk, "utf8");
    this.emittedBytes += chunk.length;
    if (Math.random() > 0.5) {
      this.push(null);
    }
  }
}
