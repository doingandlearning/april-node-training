const router = require("express").Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/:id/:name", userController.getByIdAndName);

module.exports = router;
