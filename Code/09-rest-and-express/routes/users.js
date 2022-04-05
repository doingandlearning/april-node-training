const router = require("express").Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/:id/:name", (req, res) => {
  console.log(req.params);
  const { id, name } = req.params;
  res.send(`hello user ${id} from express, you're called ${name}`);
});

module.exports = router;
