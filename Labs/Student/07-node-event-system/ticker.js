const EventEmitter = require("events");

// Part 1
// Ticker: Write a function that accepts a number and a callback as the
// arguments. The function will return an EventEmitter that emits an event
// called tick every 50 milliseconds until the number of milliseconds is passed
// from the invocation of the function. The function will also call the callback
// when the number of milliseconds has passed, providing, as the result, the
// total count of tick events emitted. Hint: you can use setTimeout() to
// schedule another setTimeout() recursively or you could use setInterval().

class TickEmitter extends EventEmitter {
  constructor(opts) {
    super(opts);
  }
}

function tickingTimer(ms, cb) {
  const emitter = new TickEmitter();
  let time = 0;
  let count = 0;

  process.nextTick(() => {
    emitter.emit("tick");
    count++;
  });

  let date = new Date();

  if (date % 5 === 0) {
    emitter.emit("error", new Error("Multiple of 5"));
  }

  const interval = setInterval(() => {
    time += 50;

    date = new Date();

    if (date % 5 === 0) {
      emitter.emit("error", new Error("Multiple of 5"));
    }

    if (time > ms) {
      clearInterval(interval);
      cb();
      console.log("This many: ", count);
      return count;
    }
    emitter.emit("tick");
    count++;
  }, 50);

  return emitter; // TODO: create event emitter
}

tickingTimer(50, () => console.log("all done!"))
  .on("tick", () => console.log("Tick tock!"))
  .on("error", (error) => console.error(error));

// Part 2
// A simple modification:
// Modify the function created in exercise 3.2 so that it emits a tick event
// immediately after the function is invoked.

// Part 3:
// Playing with errors:
// Modify the function created in exercise 3.3 so that it produces an error if
// the timestamp at the moment of a tick (including the initial one that we
// added as part of exercise 3.3) is divisible by 5. Propagate the error using
// both the callback and the event emitter. Hint: use Date.now() to get the
// timestamp and the remainder (%) operator to check whether the timestamp is
// divisible by 5.
