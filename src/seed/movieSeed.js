const mongoose = require("mongoose");
const Movie = require("../models/movie.model");
const movies = require("../data/movieList");

require("dotenv").config();

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/yourdb";

const seedMovies = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);

    // Clear existing movies
    await Movie.deleteMany({});

    // Insert new movies
    await Movie.insertMany(movies);

    console.log("Movies seeded successfully");
  } catch (err) {
    console.error("Error seeding movies:", err);
  } finally {
    // Disconnect from MongoDB
    mongoose.connection.close();
  }
};

seedMovies();
