import express from "express";
import { fork } from "child_process";

const app = express();

app.get("/one", (req, res) => {
  const sum = longComputation();
  res.send({ sum });
});

app.get("/two", async (req, res) => {
  const sum = await longComputationPromise();
  res.send({ sum });
});

app.get("/three", (req, res) => {
  const child = fork("./longtask.mjs");

  child.on("message", (message) => {
    if (message === "Ready.") {
      child.send("start");
    } else {
      res.send({ sum: message });
    }
  });
});

app.listen(3000, () => console.log("listening on port 3000"));

function longComputation() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += 1;
  }
  return sum;
}

function longComputationPromise() {
  return new Promise((resolve, reject) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
      sum += 1;
    }
    resolve(sum);
  });
}
