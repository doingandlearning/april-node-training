import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => res.send("Also hello"));

app.listen(port, () => {
  console.log(`Server started, listening on port ${port}.`);
});
