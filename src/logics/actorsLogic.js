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
  const result = await getActorsAndCharvterPerMovie();

  return result
    .filter((actor) => actor.movies.length > 1)
    .map((actor) => ({
      [actor.name]: [
        ...actor.movies.map((movie) => ({ [movie.name]: movie.character })),
      ],
    }));
};

const getMoviesPerActor = async () => {
  const result = await getActorsAndCharvterPerMovie();

  return result.map((actor) => ({
    [actor.name]: [...actor.movies.map((movie) => movie.name)],
  }));
};

const getActorsAndCharvterPerMovie = async () => {
  const allMoviesCast = await allMovies();
  const result = actors.map((actor) => ({ name: actor, movies: [] }));

  allMoviesCast.forEach((movie) => {
    const movieCast = movie.cast;
    movieCast.forEach((actor) => {
      const actorRes = result.find(
        (currActor) => currActor.name === actor.name
      );
      if (actorRes !== undefined) {
        actorRes.movies = [
          ...actorRes.movies,
          { name: movie.name, character: actor.character },
        ];
      }
    });
  });

  return result;
};

module.exports = { getActorsWithMultipleCharacters, getMoviesPerActor };
