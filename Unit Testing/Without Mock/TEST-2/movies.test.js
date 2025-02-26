let { getAllMovies, getMovieById, addMovie } = require("./movies");

describe("Movies Functions", () => {
    it("should get all movies", () => {
      let movies = getAllMovies();
      expect(movies.length).toBe(4);
      expect(movies).toEqual([
        { id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
        { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola' },
        { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan' },
        { id: 4, title: 'Pulp Fiction', director: 'Quentin Tarantino' }
      ]); 
    });

    it("should return a movie by Id", () => {
      let movie = getMovieById(1);
      expect(movie).toEqual({ id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' });
    });

    it("should return undefined for a non-existent movie", () => {
     let movie = getMovieById(99);
     expect(movie).toBeUndefined();
    });

    it("should add a new movie", () => {
      let newMovie = { title: "New Movie", director: "New director" };
      let addedMovie = addMovie(newMovie);
      expect(addedMovie).toEqual({ id: 5, title: "New Movie", director: "New director" });
      const movies = getAllMovies();
      expect(movies.length).toBe(5);
    });
});