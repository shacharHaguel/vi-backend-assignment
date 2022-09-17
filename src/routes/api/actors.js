const router = require("express").Router();
const { default: axios } = require("axios");
const { apiKey, moviesApiUrl } = require("../../appConfig");
const CircularJSON = require("circular-json");
const moviesCastPath =
  "3/movie/{movie_id}/credits?api_key={apiKey}&language=en-US";
const {
  getActorsWithMultipleCharacters,
  getMoviesPerActor,
} = require("../../logics/actorsLogic");

router.get("/", async function (req, res, next) {
  const moviesCastPath2 = moviesCastPath
    .replace("{movie_id}", 9738)
    .replace("{apiKey}", apiKey);
  const newUrl = `${moviesApiUrl}/${moviesCastPath2}`;

  try {
    const res3 = await axios.get(newUrl);
    res.send(JSON.parse(CircularJSON.stringify(res3)));
    console.log(res3);
  } catch (e) {
    console.log(e);
  }
});

router.get("/actorsWithMultipleCharacters", async function (req, res, next) {
  const result = await getActorsWithMultipleCharacters();
  res.send(CircularJSON.stringify(result));
});

router.get("/moviesPerActor", async function (req, res, next) {
  const moviesCastPath2 = moviesCastPath
    .replace("{movie_id}", 9738)
    .replace("{apiKey}", apiKey);
  const newUrl = `${moviesApiUrl}/${moviesCastPath2}`;

  try {
    const res3 = await axios.get(newUrl);
    res.send(JSON.parse(CircularJSON.stringify(res3)));
    console.log(res3);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
