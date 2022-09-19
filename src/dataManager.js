const { default: axios } = require("axios");
const { apiKey, moviesApiUrl } = require("./appConfig");
const moviesCastPath =
  "3/movie/{movie_id}/credits?api_key={apiKey}&language=en-US";
const { actors, movies } = require("../dataForQuestions");

const allMovies = async () => {
  const allMoviesData = await Promise.all(
    Object.values(movies).map((movieId) => {
      return getMovieCast(movieId);
    })
  );
  const allMoviesCast = allMoviesData.map((movie) => {
    const { id: movieId, cast: movieCast } = movie.data;

    const movieName = Object.keys(movies).find(
      (movieName) => movies[movieName] === movieId
    );

    const flatMovieCast = movieCast.map(({ name, character }) => {
      return { name, character };
    });

    return { id: movieId, name: movieName, cast: flatMovieCast };
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

const getActorsAndCharvterPerMovie = async () => {
  const allMoviesCast = await allMovies();
  const actorNameToMovies = {};

  actors.forEach((actor) => {
    actorNameToMovies[actor] = [];
  });

  allMoviesCast.forEach(({ name: movieName, cast: movieCast }) => {
    movieCast.forEach(({ name: actorName, character: actorCharacter }) => {
      if (!actorNameToMovies[actorName]) {
        return;
      }

      actorNameToMovies[actorName].push({
        name: movieName,
        character: actorCharacter,
      });
    });
  });

  return Object.keys(actorNameToMovies).map((actorName) => ({
    name: actorName,
    movies: actorNameToMovies[actorName],
  }));
};

module.exports = { getActorsAndCharvterPerMovie };
