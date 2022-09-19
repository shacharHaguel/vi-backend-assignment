const router = require("express").Router();
const CircularJSON = require("circular-json");
const { getMoviesPerActor } = require("../../logics/moviesLogic");

router.get("/moviesPerActor", async function (req, res, next) {
  const result = await getMoviesPerActor();
  res.send(CircularJSON.stringify(result));
});

module.exports = router;
