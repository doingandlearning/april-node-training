import express from "express";
import { fork } from "child_process";
import e from "express";

const app = express();

app.get("/one/:id", (req, res) => {
  try {
    const result = nextPrime(req.params.id);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/two/:id", (req, res) => {
  const child = fork("./longtask.js", [req.params.id]);

  child.on("message", (message) => {
    if (message === "ready") {
      child.send("start");
    } else {
      res.send({ result: message });
    }
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));

function nextPrime(num) {
  const isPrime = (num) => {
    let sqrtnum = Math.floor(Math.sqrt(num));
    let prime = num !== 1;
    for (let i = 2; i < sqrtnum + 1; i++) {
      if (num % i === 0) {
        prime = false;
        break;
      }
    }
    return prime;
  };
  const nextPrime = (num = 1) => {
    while (!isPrime(++num)) {}
    return num;
  };

  return nextPrime(num);
}
