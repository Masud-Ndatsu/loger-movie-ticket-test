const express = require("express");
const { getAllMovies } = require("../controllers/movie.controller");

const router = express.Router();

router.get("/", getAllMovies);

module.exports = router;
