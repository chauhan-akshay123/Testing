const express = require("express");
const app = express();
const PORT = 3000;
const { getAllMovies, getMovieById, addMovie } = require("./movies");

app.use(express.json());

app.get("/api/movies", (req, res) => {
  const movies = getAllMovies();
  return res.status(200).json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);  
  const movie = getMovieById(id)
  if(!movie) return res.status(404).json({ error: "Movie not found." });
  res.status(200).json(movie);
});

app.post("/api/movies", (req, res) => {
  const movie = addMovie(req.body);
  res.status(201).json({ message: "Movie added successfully", movie });
});

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});

module.exports = app;