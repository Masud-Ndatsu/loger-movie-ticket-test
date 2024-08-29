const movieRepo = require("../repository/movie.repository");

const getAllMovies = async (req, res) => {
  try {
    const movies = await movieRepo.GetMovies();
    return res.status(200).json({
      status: true,
      data: movies,
      message: "Request successful",
    });
  } catch (error) {
    console.error("error: ", error);
    return res.status(200).json({
      status: true,
      data: null,
      message: "Error fetching movies " + error.message,
    });
  }
};

module.exports = { getAllMovies };
