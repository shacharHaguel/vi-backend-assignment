const { default: axios } = require("axios");
const { apiKey, moviesApiUrl } = require("../appConfig");
const moviesCastPath =
  "3/movie/{movie_id}/credits?api_key={apiKey}&language=en-US";
const { actors, movies } = require("../../dataForQuestions");

const allMovies = async () => {
  const allMoviesData = await Promise.all(
    Object.values(movies).map((movieId) => {
      return getMovieCast(movieId);
    })
  );
  const allMoviesCast = allMoviesData.map((movie) => {
    const movieId = movie.data.id;
    const movieCast = movie.data.cast;
    const movieName = Object.keys(movies).find(
      (movieName) => movies[movieName] === movieId
    );
    const flatMovieCast = movieCast.map((act) => {
      return { name: act.name, character: act.character };
    });
    return { id: movie.data.id, name: movieName, cast: flatMovieCast };
  });
  return allMoviesCast;
};

const getMovieCast = (movieId) => {
  const moviesCastPath2 = moviesCastPath
    .replace("{movie_id}", movieId)
    .replace("{apiKey}", apiKey);

  const movieCastApiUrl = `${moviesApiUrl}/${moviesCastPath2}`;
  return axios.get(movieCastApiUrl);
};

const getActorsWithMultipleCharacters = async () => {
  const result = await allMovies();
  console.log(result);
  return result;
};

const getMoviesPerActor = () => {};

module.exports = { getActorsWithMultipleCharacters, getMoviesPerActor };
