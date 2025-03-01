const request = require("supertest");
const { app } = require("../index.js");
const { 
    getBooks,
    getBookById,
    getReviews,
    getReviewsById
} = require("../book.js");

const http = require("http");

jest.mock("../book.js", () => {
    const actualModule = jest.requireActual("../book.js");
    return {
      ...actualModule,
      getBooks: jest.fn(),
      getBookById: jest.fn(),
      getReviews: jest.fn(),
      getReviewsById: jest.fn()
    };
  });

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
 server.close(done); 
});

describe("API Error Handling Test", () => {
 beforeEach(() => {
   jest.clearAllMocks();
 });

 it("GET API /api/books should return 404 if no books are found", async () => {
 getBooks.mockResolvedValue([]);
 
 const response = await request(server).get("/api/books");
 expect(response.statusCode).toEqual(404);
 expect(response.body.error).toBe("No books found.");
 }); 

 it("GET API /api/books/:id should return 404 for a non-existing book", async () => {
  getBookById.mockResolvedValue(null);

  const response = await request(server).get("/api/books/99");
  expect(response.statusCode).toEqual(404);
  expect(response.body.error).toBe("Book not found");
 });

 it("GET API /api/reviews should return 404 if no reviews are found", async () => {
   getReviews.mockResolvedValue([]);
   
   const response = await request(server).get("/api/reviews");
   expect(response.statusCode).toEqual(404);
   expect(response.body.error).toBe("No reviews found");
 });

 it("GET API /api/reviews/:id should return 404 for a non-existing review", async () => {
  getReviewsById.mockResolvedValue(null);

  const response = await request(server).get("/api/reviews/909");
  expect(response.statusCode).toEqual(404);
  expect(response.body.error).toBe("Review not found.");
 });
});