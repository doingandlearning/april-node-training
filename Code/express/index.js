import express from "express";

import BookRoutesV1 from "./routes/bookRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", BookRoutesV1);

app.listen(3000, () => console.log("Listening on port 3000"));
