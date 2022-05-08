import { Transform } from "stream";

export class FilterByCountry extends Transform {
  constructor(country, options = {}) {
    options.objectMode = true;
    super(options);
    this.country = country;
  }

  _transform(chunk, encoding, callback) {
    if (chunk.country === this.country) {
      this.push(chunk);
    }
    callback();
  }

  // _flush(callback) {
  //   callback();
  // }
}
