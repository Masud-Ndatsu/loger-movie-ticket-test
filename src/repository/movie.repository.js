const moviesModel = require("../models/movie.model");

class MovieRepository {
  Createmovie = async (payload) => {
    const movie = await moviesModel.create(payload);
    return movie;
  };

  GetMovies = async () => {
    const movies = await moviesModel.aggregate([
      {
        $match: {},
      },
    ]);
    return movies;
  };

  GetMoviesById = async (movieIds) => {
    const movies = await moviesModel.aggregate([
      {
        $match: {
          $expr: {
            $in: [{ $toString: "$_id" }, movieIds],
          },
        },
      },
    ]);
    return movies;
  };
}

const movieRepo = new MovieRepository();

module.exports = movieRepo;
