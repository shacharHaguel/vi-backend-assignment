const router = require("express").Router();
const CircularJSON = require("circular-json");
const { getActorsWithMultipleCharacters } = require("../../logics/actorsLogic");

router.get("/actorsWithMultipleCharacters", async function (req, res, next) {
  const result = await getActorsWithMultipleCharacters();
  res.send(CircularJSON.stringify(result));
});

module.exports = router;
