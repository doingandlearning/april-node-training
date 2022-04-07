import { Router } from "express";

import * as BookControllers from "../controllers/bookController.js";

const router = new Router();

router.get("/", (req, res) => res.send("Getting directly."));

router
  .route("/books")
  .get(BookControllers.getAllBooks)
  .post(BookControllers.addNewBook);

router.route("/books/:id").get(BookControllers.getBookById);

export default router;
