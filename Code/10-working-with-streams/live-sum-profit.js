import { Transform } from "stream";

export class SumProfit extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.total = 0;
  }
  _transform(chunk, encoding, callback) {
    this.total += parseFloat(chunk.profit, 10);
    callback();
  }
  _flush(callback) {
    this.push(this.total.toString());
    callback();
  }
}
