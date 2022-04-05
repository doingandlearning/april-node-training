const { EventEmitter } = require("events");
const ee = new EventEmitter();

const listener1 = () => {
  console.log("Listener 1");
};
const listener2 = () => {
  console.log("Listener 2");
};

ee.on("my-event", listener1);
ee.on("my-event2", listener2);

setInterval(() => {
  ee.emit("my-event");
  ee.emit("my-event2");
}, 200);

setTimeout(() => {
  ee.removeAllListeners();
}, 1000);

ee.on("error", (err) => console.log(err));

ee.emit("error", new Error("oh oh"));
