function longComputation() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += 1;
  }
  return sum;
}

process.send("Ready.");

process.on("message", (message) => {
  if (message === "start") {
    const sum = longComputation();
    process.send(sum);
  }
});
