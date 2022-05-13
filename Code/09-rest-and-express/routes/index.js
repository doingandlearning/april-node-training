import { Router } from "express";
import { logging } from "../middlewares/logging.js";

const router = Router();

// const userRoutes = require("./users.js");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.use(logging);

// router.use("/users", userRoutes);

router.get("/", (req, res) => {
  res.send("hello from express");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ success: true, message: "Got it" });
});

export default router;
