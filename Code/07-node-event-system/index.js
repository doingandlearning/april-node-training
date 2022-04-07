const { EventEmitter } = require("events");

class AmidoEvent extends EventEmitter {
  constructor(opts) {
    super(opts);
    this.name = "AmidoEvent";
  }
  destroy(err) {
    if (err) {
      this.emit("error", err);
    }
    this.emit("close");
  }
}

const ee = new AmidoEvent();

const listener1 = (station) =>
  console.log(`I'm listener 1! I care we've just left ${station}`);
const listener2 = (station) =>
  console.log(`I'm listener 2! I care we've just left ${station}`);
const listener3 = (station) =>
  console.log(`I'm listener 3! I care we've just left ${station}`);

ee.on("train departure", listener1);
ee.on("train departure", listener2);

ee.emit("train departure", "Brighton");
ee.emit("train departure", "Worthing");
ee.removeListener("train departure", listener1);
ee.emit("train departure", "Goring");
// Got to destination [listener2]
ee.removeAllListeners("train departure");
ee.removeAllListeners();
// []
ee.emit("train departure", "Littlehampton");
ee.on("train departure", listener3);
ee.emit("train departure", "Goring");

ee.on("error", () => console.log("I'm handling errors responsibly."));
ee.emit("error");
