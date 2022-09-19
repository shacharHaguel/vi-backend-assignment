const { getActorsAndCharvterPerMovie } = require("../dataManager");

const getActorsWithMultipleCharacters = async () => {
  const result = await getActorsAndCharvterPerMovie();

  return result
    .filter((actor) => actor.movies.length > 1)
    .map((actor) => ({
      [actor.name]: [
        actor.movies.map((movie) => ({ [movie.name]: movie.character })),
      ],
    }));
};

module.exports = { getActorsWithMultipleCharacters };
