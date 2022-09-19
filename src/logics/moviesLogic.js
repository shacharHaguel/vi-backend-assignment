const { getActorsAndCharvterPerMovie } = require("../dataManager");

const getMoviesPerActor = async () => {
  const result = await getActorsAndCharvterPerMovie();

  return result.map((actor) => ({
    [actor.name]: [actor.movies.map((movie) => movie.name)],
  }));
};

module.exports = { getMoviesPerActor };
